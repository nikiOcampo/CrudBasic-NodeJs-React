// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'

//const noti = withReactContent(Swal)

function fetchDataFromApi() {
    Axios.get('http://localhost:3001/empleados', { timeout: 500000 }) // Adjust the timeout value as needed
      .then(response => {
        // Handle successful response
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error.message);
        console.error('Response:', error.response);
        console.error('Request:', error.request);
      });
}

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);


  const add = ()=>{
    Axios.post("http://localhost:3001/create", {
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      fetchDataFromApi();
      
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!</strong>",
        html: "<i>El empleado <strong> " + nombre + " </strong> fue registrado con exito!</i>",
        icon: 'success',
        timer:5000
      });
    }).catch(function(error){
      Swal.fire({
        title: "Oops!",
        text: nombre + " no pudo ser registrado. :)",
        icon: "error",
        footer: JSON.parse(JSON.stringify(error)).message
      });
    });;
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update", {
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      fetchDataFromApi();
      //alert("Empleado Actualizado!");
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!!</strong>",
        html: "<i>El empleado <strong> " + nombre + " </strong> fue actualizado con exito!</i>",
        icon: 'success',
        timer:5000
      });
    }).catch(function(error){
      Swal.fire({
        title: "Oops!",
        text: nombre + " no pudo ser actualizado. :)",
        icon: "error",
        footer: JSON.parse(JSON.stringify(error)).message
      });
    });;
  }

  const deleteEmple = (val)=>{

      Swal.fire({
        title: "Are you sure?",
        html: "<i>Desea eliminar al empleado <strong> " + val.nombre + " </strong>?</i>",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor:'#d33',
        confirmButtonColor:'#3085d6',
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
            getEmpleados();
            fetchDataFromApi();
            limpiarCampos();
            Swal.fire({
              title: "Elimado!",
              text: val.nombre + " fue eliminado.",
              icon: "success",
              timer: 5000
            });
          }).catch(function(error){
            Swal.fire({
              title: "Oops!",
              text: val.nombre + " no pudo ser eliminado. :)",
              icon: "error",
              footer: JSON.parse(JSON.stringify(error)).message
            });
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: "Cancelado!",
            text: val.nombre + " no fue eliminado. :)",
            icon: "error"
          });
        }
      });
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }

  const limpiarCampos = ()=>{
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
    setEditar(false);
  }
  

  //const getEmpleados = ()=>{
  //  Axios.get("http://localhost:3001/empleados").then((response)=>{
  //    setEmpleados(response.data);
  //  });
 // }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }

  getEmpleados();
  Axios.get('http://localhost:3001/empleados', { timeout: 1500000 }) // 
      .then(response => {
        // Handle successful response
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error.message);
        console.error('Response:', error.response);
        console.error('Request:', error.request);
      });

  

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" 
            onChange={(event)=>{
              setNombre(event.target.value);
            }}
            className="form-control" value={nombre} placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input type="number" 
            onChange={(event)=>{
              setEdad(event.target.value);
            }}
            className="form-control" value={edad} placeholder="Ingrese Edad" aria-label="edad" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais: </span>
            <input type="text" 
            onChange={(event)=>{
              setPais(event.target.value);
            }}
            className="form-control" value={pais} placeholder="Ingrese Pais de Residencia" aria-label="pais" aria-describedby="basic-addon1"/>
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text" 
            onChange={(event)=>{
              setCargo(event.target.value);
            }}
            className="form-control" value={cargo} placeholder="Ingrese el cargo" aria-label="cargo" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de Antiguedad: </span>
            <input type="number" 
            onChange={(event)=>{
              setAnios(event.target.value);
            }}
            className="form-control" value={anios} placeholder="Ingrese Antiguedad" aria-label="anios" aria-describedby="basic-addon1"/>
          </div>
      </div>
        <div className="card-footer text-muted">
          {
            editar? 
            <div> 
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button> 
            </div>
            : <button className='btn btn-success' onClick={add}>Registrar</button>
          }
        
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val,key)=>{
              return <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button"
                    onClick={()=>{
                        editarEmpleado(val);
                    }}
                    className="btn btn-warning">Editar</button>

                    <button type="button" 
                    onClick={()=>{
                      deleteEmple(val);
                    }}
                    className="btn btn-danger">Eliminar</button>
                </div>
                </td>
              </tr>
            })
          }
          
          
        </tbody>
      </table>     

    </div>
  );
}

export default App;
