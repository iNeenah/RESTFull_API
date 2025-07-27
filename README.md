# RESTFull_API

API RESTful para gestión de biblioteca desarrollada con Express.js

## Descripción

Sistema de gestión de biblioteca que permite administrar usuarios, libros, préstamos y reseñas a través de una API RESTful. Implementa operaciones CRUD completas para cada entidad y lógicas de negocio específicas para el control de inventario.

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
node app.js
```

El servidor se ejecutará en http://localhost:8080

## Estructura de la API

### Usuarios
- `GET /usuarios` - Listar todos los usuarios
- `GET /usuarios/:id` - Obtener usuario específico
- `POST /usuarios` - Crear nuevo usuario
- `PUT /usuarios/:id` - Actualizar usuario existente
- `DELETE /usuarios/:id` - Eliminar usuario

### Libros
- `GET /libros` - Listar todos los libros
- `GET /libros/:id` - Obtener libro específico
- `POST /libros` - Agregar nuevo libro
- `PUT /libros/:id` - Actualizar información del libro
- `PUT /libros/:id/existencia` - Actualizar cantidad disponible
- `DELETE /libros/:id` - Eliminar libro del catálogo

### Préstamos
- `GET /prestamos` - Listar todos los préstamos
- `GET /prestamos/:id` - Obtener préstamo específico
- `POST /prestamos` - Registrar nuevo préstamo
- `PUT /prestamos/:id` - Actualizar estado del préstamo
- `DELETE /prestamos/:id` - Cancelar préstamo

### Reseñas
- `GET /resenias` - Listar todas las reseñas
- `GET /resenias/:id` - Obtener reseña específica
- `GET /resenias/libro/:id_libro` - Reseñas de un libro
- `POST /resenias` - Crear nueva reseña
- `PUT /resenias/:id` - Modificar reseña existente
- `DELETE /resenias/:id` - Eliminar reseña

### Consultas especiales
- `GET /libros/disponibles` - Libros con stock disponible
- `GET /prestamos/usuario/:id_usuario` - Historial de préstamos por usuario
- `GET /prestamos/libro/:id_libro` - Historial de préstamos por libro

## Funcionalidades

- Control automático de inventario (reduce/aumenta existencia en préstamos)
- Validación de datos de entrada
- Manejo de errores HTTP apropiados
- Respuestas JSON estructuradas
- Middleware de seguridad integrado



## Tecnologías utilizadas

- Node.js
- Express.js
- CORS
- Helmet (seguridad)
- Morgan (logging)

## Ejemplo de respuesta

```json
{
  "success": true,
  "data": [
    {
      "id_usuario": 1,
      "nombre": "Juan Pérez",
      "email": "juan@email.com",
      "telefono": "123456789"
    },
    {
      "id_usuario": 2,
      "nombre": "María García",
      "email": "maria@email.com",
      "telefono": "987654321"
    }
  ],
  "message": "Usuarios obtenidos correctamente"
}
```