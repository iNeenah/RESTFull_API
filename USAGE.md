# Guía de Uso - API RESTful de Biblioteca

## Cómo ejecutar el proyecto

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar el servidor:**
```bash
npm start
# o para desarrollo con nodemon
npm run dev
```

3. **El servidor estará disponible en:** `http://localhost:8080`

## Ejemplos de uso con curl

### Usuarios

**Obtener todos los usuarios:**
```bash
curl -X GET http://localhost:8080/usuarios
```

**Crear un nuevo usuario:**
```bash
curl -X POST http://localhost:8080/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Ana López", "email": "ana@email.com", "telefono": "555-0123"}'
```

**Actualizar un usuario:**
```bash
curl -X PUT http://localhost:8080/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan Pérez Actualizado", "telefono": "999-8888"}'
```

### Libros

**Obtener libros disponibles:**
```bash
curl -X GET http://localhost:8080/libros/disponibles
```

**Crear un nuevo libro:**
```bash
curl -X POST http://localhost:8080/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo": "1984", "autor": "George Orwell", "isbn": "978-84-376-0496-1", "existencia": 4}'
```

**Actualizar existencia de un libro:**
```bash
curl -X PUT http://localhost:8080/libros/1/existencia \
  -H "Content-Type: application/json" \
  -d '{"existencia": 8}'
```

### Préstamos

**Crear un nuevo préstamo:**
```bash
curl -X POST http://localhost:8080/prestamos \
  -H "Content-Type: application/json" \
  -d '{"id_usuario": 1, "id_libro": 2, "fecha_devolucion": "2024-02-15"}'
```

**Obtener préstamos de un usuario:**
```bash
curl -X GET http://localhost:8080/prestamos/usuario/1
```

**Devolver un libro (actualizar préstamo):**
```bash
curl -X PUT http://localhost:8080/prestamos/1 \
  -H "Content-Type: application/json" \
  -d '{"estado": "devuelto", "fecha_devolucion": "2024-01-28"}'
```

### Reseñas

**Crear una nueva reseña:**
```bash
curl -X POST http://localhost:8080/resenias \
  -H "Content-Type: application/json" \
  -d '{"id_libro": 1, "id_usuario": 2, "calificacion": 5, "comentario": "Una obra maestra"}'
```

**Obtener reseñas de un libro:**
```bash
curl -X GET http://localhost:8080/resenias/libro/1
```

## Estructura de respuestas

Todas las respuestas siguen el siguiente formato:

```json
{
  "success": true/false,
  "data": {...}, // Solo en respuestas exitosas
  "message": "Descripción del resultado"
}
```

## Códigos de estado HTTP

- `200` - OK (operación exitosa)
- `201` - Created (recurso creado exitosamente)
- `400` - Bad Request (datos inválidos)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error (error del servidor)

## Validaciones implementadas

- **Usuarios:** Nombre y email son requeridos
- **Libros:** Título y autor son requeridos
- **Préstamos:** Verifica existencia de usuario, libro y disponibilidad
- **Reseñas:** Calificación debe estar entre 1 y 5

## Funcionalidades especiales

1. **Control de existencia:** Al crear un préstamo se reduce la existencia del libro
2. **Devolución automática:** Al marcar un préstamo como "devuelto" se aumenta la existencia
3. **Validaciones cruzadas:** Se verifica la existencia de usuarios y libros antes de crear préstamos/reseñas
4. **Endpoints específicos:** Libros disponibles, préstamos por usuario/libro, reseñas por libro