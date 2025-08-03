# RESTFull_API

<div align="center">
  <img src="https://siliconmisiones.gob.ar/wp-content/uploads/2025/06/simi-.svg" alt="Silicon Misiones" width="200"/>
</div>

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

3. Configurar base de datos
```bash
# Crear la base de datos MySQL ejecutando el archivo database.sql
# Configurar credenciales en src/config/db.js si es necesario
```

4. Ejecutar el servidor
```bash
node index.js
# o para desarrollo
npm run dev
```

El servidor se ejecutará en http://localhost:8080

## Arquitectura

Este proyecto utiliza el patrón **MVC (Model-View-Controller)** con la siguiente estructura:

```
src/
├── config/     # Configuración de base de datos
├── model/      # Modelos de datos (interacción con BD)
├── controller/ # Controladores (lógica de negocio)
├── routes/     # Definición de rutas
└── middleware/ # Middlewares personalizados
```

### Flujo de datos:
1. **index.js** → Punto de entrada de la aplicación
2. **routes/** → Definición de endpoints y métodos HTTP
3. **controller/** → Lógica de negocio y validaciones
4. **model/** → Consultas a la base de datos
5. **config/** → Configuración del pool de conexiones

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
- MySQL2 (base de datos)
- CORS
- Helmet (seguridad)
- Morgan (logging)

## Base de datos

La aplicación utiliza MySQL como base de datos. El archivo `database.sql` contiene:
- Estructura de tablas (usuarios, libros, prestamos, reseñas)
- Datos de prueba
- Relaciones entre tablas con claves foráneas

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