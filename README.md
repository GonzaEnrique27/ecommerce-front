Proyecto Ecommerce Proyecto demostracion para reclutamiento.

Tecnologías Utilizadas:

Backend Node.js con Express.js Sequelize para la gestión de la base de datos MySQL como sistema de gestión de base de datos Express Validator para validaciones del backend Controladores y modelos para la gestión de datos

Frontend Preact con Vite API gestionadas a través de un archivo llamado mockdata CRUD para usuarios y productos Manejo de estado y autenticación con contexto Validaciones de formularios utilizando expresiones regulares Almacenamiento del usuario en localStorage

Funcionalidades Gestión de Productos: Se pueden crear, editar, eliminar y recuperar productos desde la base de datos. Gestión de Marcas: Incluye la capacidad de listar y manipular las marcas de los productos. CRUD de Usuarios: Permite la creación, lectura, actualización y eliminación de usuarios. Interfaz de Administración: Los administradores pueden acceder a una vista dedicada para gestionar productos y usuarios. Autenticación de Usuario: Se implementa un contexto para proteger las rutas de administración, evitando el acceso no autorizado. Búsqueda y Filtros: Funciones de búsqueda y filtros para facilitar la navegación por productos. Validaciones de Formulario: Las validaciones se realizan con expresiones regulares para asegurar la integridad de los datos ingresados. Almacenamiento de Sesión: Utiliza localStorage para mantener la sesión del usuario. Se elimina automáticamente al cerrar sesión.

Instalación Clona este repositorio: git clone https://github.com/GonzaEnrique27/NewEcommerce.git

Instala las dependencias del backend:

npm install

Configura la base de datos:

Asegúrate de tener MySQL instalado y en funcionamiento. Crea una base de datos y configura las credenciales en tu archivo de configuración.

Inicia el servidor backend: npm start

Instala las dependencias del frontend: cd frontend npm install

Inicia la aplicación frontend:

npm run dev

Uso Abre tu navegador y visita http://localhost:5173 para acceder a la aplicación.
