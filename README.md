# RESTFull_API

API RESTful desarrollada con Express.js para gestión de biblioteca - Semana 16

## Descripción

Esta API permite gestionar usuarios, libros, préstamos y reseñas de una biblioteca mediante endpoints RESTful.

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/iNeenah/RESTFull_API.git
cd RESTFull_API
```

2. Instalar dependencias
```bash
npm install
```

3. Ejecutar el servidor
```bash
npm start
# o para desarrollo
npm run dev
```

El servidor se ejecutará en el puerto 8080.

## Endpoints

### Usuarios
- `GET /usuarios` - Obtener todos los usuarios
- `GET /usuarios/:id` - Obtener un usuario por ID
- `POST /usuarios` - Crear un nuevo usuario
- `PUT /usuarios/:id` - Actualizar un usuario
- `DELETE /usuarios/:id` - Eliminar un usuario

### Libros
- `GET /libros` - Obtener todos los libros
- `GET /libros/:id` - Obtener un libro por ID
- `POST /libros` - Crear un nuevo libro
- `PUT /libros/:id` - Actualizar un libro
- `PUT /libros/:id/existencia` - Actualizar existencia de un libro
- `DELETE /libros/:id` - Eliminar un libro

### Préstamos
- `GET /prestamos` - Obtener todos los préstamos
- `GET /prestamos/:id` - Obtener un préstamo por ID
- `POST /prestamos` - Crear un nuevo préstamo
- `PUT /prestamos/:id` - Actualizar un préstamo
- `DELETE /prestamos/:id` - Eliminar un préstamo

### Reseñas
- `GET /resenias` - Obtener todas las reseñas
- `GET /resenias/:id` - Obtener una reseña por ID
- `GET /resenias/libro/:id_libro` - Obtener reseñas de un libro
- `POST /resenias` - Crear una nueva reseña
- `PUT /resenias/:id` - Actualizar una reseña
- `DELETE /resenias/:id` - Eliminar una reseña

### Lógicas específicas
- `GET /libros/disponibles` - Libros con existencia disponible
- `GET /prestamos/usuario/:id_usuario` - Préstamos de un usuario
- `GET /prestamos/libro/:id_libro` - Préstamos de un libro

## Tecnologías

- Node.js
- Express.js
- CORS
- Helmet
- Morgan