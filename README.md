# Entrega 1
Backend del sistema basado en https://www.bezkoder.com/node-js-jwt-authentication-mysql/

El frontend se encuentra en la carpeta app/frontend.

# Gestión del estado
El estado del sistema se gestiona mediante el uso de Redux. Redux es una biblioteca de JavaScript para el manejo del estado de la aplicación. Para integrar Redux con React, utilizamos la librería oficial de Redux para React, react-redux.

En nuestro proyecto, el estado se encuentra organizado en slices. Cada slice es un módulo que contiene el estado y las acciones que se pueden realizar sobre él. Estos slices se encuentran en la carpeta app/frontend/src/slices.

Para acceder al estado desde los componentes, utilizamos el hook useSelector de react-redux. Este hook nos permite seleccionar partes específicas del estado y suscribirnos a los cambios. De esta manera, podemos obtener los datos necesarios para nuestros componentes.

Para realizar cambios en el estado, utilizamos el hook useDispatch de react-redux. Este hook nos permite llamar a las acciones definidas en los slices y modificar el estado de la aplicación.

En nuestro proyecto, actualmente contamos con un slice de autenticación. Este slice contiene el estado del usuario autenticado y las acciones para autenticar y desautenticar al usuario. Para implementar este estado, seguimos la documentación oficial de React-Redux.

# Gestión de rutas
La gestión de las rutas en el frontend se realiza mediante el uso de React Router. React Router es una librería que nos permite manejar las rutas en una aplicación de React de manera declarativa.

En nuestro proyecto, las rutas se encuentran definidas en el archivo app/frontend/routes.jsx. Estas rutas se importan en app/frontend/App.jsx, donde se configura el enrutador principal de la aplicación. En el archivo main.jsx es donde se importa e inicializa el enrutador.

En la carpeta app/frontend/views se encuentran las páginas que se renderizan en las rutas. Cada página puede estar formada por varios componentes, los cuales se encuentran en la carpeta app/frontend/components.

Al utilizar React Router, podemos definir rutas específicas para cada página y manejar la navegación entre ellas. Esto nos permite crear una experiencia de usuario fluida y dinámica en nuestra aplicación.

## Instalación
Para instalar las dependencias del proyecto ejecutar el comando:
```bash
npm install
```
Dentro de la carpeta raiz y dentro de la carpeta app/frontend para poder compilar el frontend.
Con usar npm run build se generará la carpeta build que se usará para servir el frontend.

## Ejecución
Para ejecutar el proyecto ejecutar el comando:
```bash
npm start
```
