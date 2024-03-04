# Entrega 1
Sistema basado en https://www.bezkoder.com/node-js-jwt-authentication-mysql/

Hace uso de [Axios.js](https://axios-http.com/docs/intro) para las peticiones a la API

Incluye un archivo docker-compose.yml para levantar una base de datos MySQL por si fuese necesario.

Consiste en 3 vistas, una para el login, otra para el registro y otra para la página principal.
En la pagina principal dependendio del nivel de acceso se mostraran unos datos u otros.
Para los usuarios no registrados saldrá cada rol disponible y para los usuarios registrados saldrá su perfil, el cual podrá editar.
Los moderadores podrán ver los usuarios registrados y los administradores también podrán editarlos.

## Instalación
Para instalar las dependencias del proyecto ejecutar el comando:
```bash
npm install
```

## Ejecución
Para ejecutar el proyecto ejecutar el comando:
```bash
npm start
```
