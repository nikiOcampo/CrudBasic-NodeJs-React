# CrudBasic-NodeJs-React

Este proyecto es un ejemplo de una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) desarrollada utilizando Node.js para el backend, MySQL como base de datos y React para el frontend.
La aplicación permite realizar operaciones básicas de gestión de datos sobre una entidad específica, en este caso una gestion de empleados.

## Contenido
1. [Requisitos](#Requisitos)
2. [Instalación](#Instalación)
3. [Estructura del Proyecto](#Estructura-del-Proyecto)
4. [Configuración](#Configuración)
5. [Ejecución](#Ejecución)
6. [Uso](#Uso)


## Requisitos
Para ejecutar este proyecto localmente, necesitarás tener instalado lo siguiente:

Node.js
npm (administrador de paquetes de Node.js)
MySQL Server

Adicionalmente se hace uso de AXIOS y cors

## Instalación
1. Clona este repositorio en tu maquina local
```
git clone https://github.com/tu-usuario/nombre-del-repo.git 
```
2. Instala las dependencias del servidor y del cliente

## Estructura del Proyecto
El proyecto está estructurado de la siguiente manera:
```
CrudBasic-NodeJss-React/
│
├── server/                       # Backend desarrollado con Node.js
│   ├── node_modules/ 
│   ├── package.json
│   ├── package-lock.json
│   └── index.js                  # Punto de entrada del servidor
│
└── client/                       # Frontend desarrollado con React
    ├── public/
    ├── src/
    │   ├── App.css               # Componente de diseño
    │   ├── index.js/   
    │   ├── reportWebVitals.js/  
    │   └── App.js                # Componente principal de la aplicación
    └── package.json
```

## Configuración
1. Crea una base de datos MySQL.
2. En el archivo index.js en el directorio server configura las variables de entorno según tu entorno local:
```  
   const db = mysql.createConnection({
    host: nombre_del_host,
    user: nombre_de_usuario,
    password: contraseña,
    database: nombre_de_la_base_de_datos
});
```

## Ejecución
1. Inicia el servidor Node.js:
```
cd server
node index.js
``` 
3. Inicia el cliente React en una nueva terminal:
```
cd client
npm start
```

## Uso
Una vez que el servidor y el cliente estén en ejecución, puedes acceder a la aplicación en tu navegador web ingresando http://localhost:3000. Desde allí, podrás realizar operaciones CRUD sobre la entidad específica que esté implementada en este proyecto.






