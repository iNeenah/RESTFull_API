const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = 8080;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos simulados en memoria (en producción usarías una base de datos)
let usuarios = [
  { id_usuario: 1, nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '123456789' },
  { id_usuario: 2, nombre: 'María García', email: 'maria@email.com', telefono: '987654321' }
];

let libros = [
  { id_libro: 1, titulo: 'El Quijote', autor: 'Miguel de Cervantes', isbn: '978-84-376-0494-7', existencia: 5 },
  { id_libro: 2, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', isbn: '978-84-376-0495-4', existencia: 3 }
];

let prestamos = [
  { id_prestamo: 1, id_usuario: 1, id_libro: 1, fecha_prestamo: '2024-01-15', fecha_devolucion: '2024-01-30', estado: 'activo' },
  { id_prestamo: 2, id_usuario: 2, id_libro: 2, fecha_prestamo: '2024-01-20', fecha_devolucion: '2024-02-05', estado: 'devuelto' }
];

let resenias = [
  { id_resenia: 1, id_libro: 1, id_usuario: 1, calificacion: 5, comentario: 'Excelente libro clásico', fecha: '2024-01-25' },
  { id_resenia: 2, id_libro: 2, id_usuario: 2, calificacion: 4, comentario: 'Muy buena narrativa', fecha: '2024-01-28' }
];

// Función helper para generar IDs únicos
const generateId = (array, idField) => {
  return array.length > 0 ? Math.max(...array.map(item => item[idField])) + 1 : 1;
};

// ==================== ENDPOINTS USUARIOS ====================

// GET /usuarios - Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json({
    success: true,
    data: usuarios,
    message: 'Usuarios obtenidos correctamente'
  });
});

// GET /usuarios/:id - Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id_usuario === id);
  
  if (!usuario) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: usuario,
    message: 'Usuario obtenido correctamente'
  });
});

// POST /usuarios - Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, email, telefono } = req.body;
  
  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y email son requeridos'
    });
  }
  
  const nuevoUsuario = {
    id_usuario: generateId(usuarios, 'id_usuario'),
    nombre,
    email,
    telefono: telefono || ''
  };
  
  usuarios.push(nuevoUsuario);
  
  res.status(201).json({
    success: true,
    data: nuevoUsuario,
    message: 'Usuario creado correctamente'
  });
});

// PUT /usuarios/:id - Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id_usuario === id);
  
  if (usuarioIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  const { nombre, email, telefono } = req.body;
  
  usuarios[usuarioIndex] = {
    ...usuarios[usuarioIndex],
    nombre: nombre || usuarios[usuarioIndex].nombre,
    email: email || usuarios[usuarioIndex].email,
    telefono: telefono || usuarios[usuarioIndex].telefono
  };
  
  res.json({
    success: true,
    data: usuarios[usuarioIndex],
    message: 'Usuario actualizado correctamente'
  });
});

// DELETE /usuarios/:id - Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id_usuario === id);
  
  if (usuarioIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  usuarios.splice(usuarioIndex, 1);
  
  res.json({
    success: true,
    message: 'Usuario eliminado correctamente'
  });
});

// ==================== ENDPOINTS LIBROS ====================

// GET /libros - Obtener todos los libros
app.get('/libros', (req, res) => {
  res.json({
    success: true,
    data: libros,
    message: 'Libros obtenidos correctamente'
  });
});

// GET /libros/:id - Obtener un libro por ID
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id_libro === id);
  
  if (!libro) {
    return res.status(404).json({
      success: false,
      message: 'Libro no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: libro,
    message: 'Libro obtenido correctamente'
  });
});

// POST /libros - Crear un nuevo libro
app.post('/libros', (req, res) => {
  const { titulo, autor, isbn, existencia } = req.body;
  
  if (!titulo || !autor) {
    return res.status(400).json({
      success: false,
      message: 'Título y autor son requeridos'
    });
  }
  
  const nuevoLibro = {
    id_libro: generateId(libros, 'id_libro'),
    titulo,
    autor,
    isbn: isbn || '',
    existencia: existencia || 0
  };
  
  libros.push(nuevoLibro);
  
  res.status(201).json({
    success: true,
    data: nuevoLibro,
    message: 'Libro creado correctamente'
  });
});

// PUT /libros/:id - Actualizar un libro
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libroIndex = libros.findIndex(l => l.id_libro === id);
  
  if (libroIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Libro no encontrado'
    });
  }
  
  const { titulo, autor, isbn, existencia } = req.body;
  
  libros[libroIndex] = {
    ...libros[libroIndex],
    titulo: titulo || libros[libroIndex].titulo,
    autor: autor || libros[libroIndex].autor,
    isbn: isbn || libros[libroIndex].isbn,
    existencia: existencia !== undefined ? existencia : libros[libroIndex].existencia
  };
  
  res.json({
    success: true,
    data: libros[libroIndex],
    message: 'Libro actualizado correctamente'
  });
});

// PUT /libros/:id/existencia - Actualizar existencia de un libro
app.put('/libros/:id/existencia', (req, res) => {
  const id = parseInt(req.params.id);
  const libroIndex = libros.findIndex(l => l.id_libro === id);
  
  if (libroIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Libro no encontrado'
    });
  }
  
  const { existencia } = req.body;
  
  if (existencia === undefined || existencia < 0) {
    return res.status(400).json({
      success: false,
      message: 'La existencia debe ser un número mayor o igual a 0'
    });
  }
  
  libros[libroIndex].existencia = existencia;
  
  res.json({
    success: true,
    data: libros[libroIndex],
    message: 'Existencia actualizada correctamente'
  });
});

// DELETE /libros/:id - Eliminar un libro
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libroIndex = libros.findIndex(l => l.id_libro === id);
  
  if (libroIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Libro no encontrado'
    });
  }
  
  libros.splice(libroIndex, 1);
  
  res.json({
    success: true,
    message: 'Libro eliminado correctamente'
  });
});
// ===
================= ENDPOINTS PRÉSTAMOS ====================

// GET /prestamos - Obtener todos los préstamos
app.get('/prestamos', (req, res) => {
  res.json({
    success: true,
    data: prestamos,
    message: 'Préstamos obtenidos correctamente'
  });
});

// GET /prestamos/:id - Obtener un préstamo por ID
app.get('/prestamos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prestamo = prestamos.find(p => p.id_prestamo === id);
  
  if (!prestamo) {
    return res.status(404).json({
      success: false,
      message: 'Préstamo no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: prestamo,
    message: 'Préstamo obtenido correctamente'
  });
});

// POST /prestamos - Crear un nuevo préstamo
app.post('/prestamos', (req, res) => {
  const { id_usuario, id_libro, fecha_devolucion } = req.body;
  
  if (!id_usuario || !id_libro) {
    return res.status(400).json({
      success: false,
      message: 'ID de usuario e ID de libro son requeridos'
    });
  }
  
  // Verificar que el usuario existe
  const usuario = usuarios.find(u => u.id_usuario === id_usuario);
  if (!usuario) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  // Verificar que el libro existe y tiene existencia
  const libro = libros.find(l => l.id_libro === id_libro);
  if (!libro) {
    return res.status(404).json({
      success: false,
      message: 'Libro no encontrado'
    });
  }
  
  if (libro.existencia <= 0) {
    return res.status(400).json({
      success: false,
      message: 'No hay existencia disponible para este libro'
    });
  }
  
  const nuevoPrestamo = {
    id_prestamo: generateId(prestamos, 'id_prestamo'),
    id_usuario,
    id_libro,
    fecha_prestamo: new Date().toISOString().split('T')[0],
    fecha_devolucion: fecha_devolucion || '',
    estado: 'activo'
  };
  
  prestamos.push(nuevoPrestamo);
  
  // Reducir existencia del libro
  const libroIndex = libros.findIndex(l => l.id_libro === id_libro);
  libros[libroIndex].existencia -= 1;
  
  res.status(201).json({
    success: true,
    data: nuevoPrestamo,
    message: 'Préstamo creado correctamente'
  });
});

// PUT /prestamos/:id - Actualizar un préstamo
app.put('/prestamos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prestamoIndex = prestamos.findIndex(p => p.id_prestamo === id);
  
  if (prestamoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Préstamo no encontrado'
    });
  }
  
  const { fecha_devolucion, estado } = req.body;
  
  // Si se está devolviendo el libro, aumentar existencia
  if (estado === 'devuelto' && prestamos[prestamoIndex].estado === 'activo') {
    const libroIndex = libros.findIndex(l => l.id_libro === prestamos[prestamoIndex].id_libro);
    if (libroIndex !== -1) {
      libros[libroIndex].existencia += 1;
    }
  }
  
  prestamos[prestamoIndex] = {
    ...prestamos[prestamoIndex],
    fecha_devolucion: fecha_devolucion || prestamos[prestamoIndex].fecha_devolucion,
    estado: estado || prestamos[prestamoIndex].estado
  };
  
  res.json({
    success: true,
    data: prestamos[prestamoIndex],
    message: 'Préstamo actualizado correctamente'
  });
});

// DELETE /prestamos/:id - Eliminar un préstamo
app.delete('/prestamos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prestamoIndex = prestamos.findIndex(p => p.id_prestamo === id);
  
  if (prestamoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Préstamo no encontrado'
    });
  }
  
  // Si el préstamo estaba activo, devolver la existencia al libro
  if (prestamos[prestamoIndex].estado === 'activo') {
    const libroIndex = libros.findIndex(l => l.id_libro === prestamos[prestamoIndex].id_libro);
    if (libroIndex !== -1) {
      libros[libroIndex].existencia += 1;
    }
  }
  
  prestamos.splice(prestamoIndex, 1);
  
  res.json({
    success: true,
    message: 'Préstamo eliminado correctamente'
  });
});

// ==================== ENDPOINTS RESEÑAS ====================

// GET /resenias - Obtener todas las reseñas
app.get('/resenias', (req, res) => {
  res.json({
    success: true,
    data: resenias,
    message: 'Reseñas obtenidas correctamente'
  });
});

// GET /resenias/:id - Obtener una reseña por ID
app.get('/resenias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resenia = resenias.find(r => r.id_resenia === id);
  
  if (!resenia) {
    return res.status(404).json({
      success: false,
      message: 'Reseña no encontrada'
    });
  }
  
  res.json({
    success: true,
    data: resenia,
    message: 'Reseña obtenida correctamente'
  });
});

// GET /resenias/libro/:id_libro - Obtener reseñas de un libro específico
app.get('/resenias/libro/:id_libro', (req, res) => {
  const id_libro = parseInt(req.params.id_libro);
  const reseniasLibro = resenias.filter(r => r.id_libro === id_libro);
  
  res.json({
    success: true,
    data: reseniasLibro,
    message: `Reseñas del libro ${id_libro} obtenidas correctamente`
  });
});

// POST /resenias - Crear una nueva reseña
app.post('/resenias', (req, res) => {
  const { id_libro, id_usuario, calificacion, comentario } = req.body;
  
  if (!id_libro || !id_usuario || !calificacion) {
    return res.status(400).json({
      success: false,
      message: 'ID de libro, ID de usuario y calificación son requeridos'
    });
  }
  
  // Verificar que el libro existe
  const libro = libros.find(l => l.id_libro === id_libro);
  if (!libro) {
    return res.status(404).json({
      success: false,
      message: 'Libro no encontrado'
    });
  }
  
  // Verificar que el usuario existe
  const usuario = usuarios.find(u => u.id_usuario === id_usuario);
  if (!usuario) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado'
    });
  }
  
  if (calificacion < 1 || calificacion > 5) {
    return res.status(400).json({
      success: false,
      message: 'La calificación debe estar entre 1 y 5'
    });
  }
  
  const nuevaResenia = {
    id_resenia: generateId(resenias, 'id_resenia'),
    id_libro,
    id_usuario,
    calificacion,
    comentario: comentario || '',
    fecha: new Date().toISOString().split('T')[0]
  };
  
  resenias.push(nuevaResenia);
  
  res.status(201).json({
    success: true,
    data: nuevaResenia,
    message: 'Reseña creada correctamente'
  });
});

// PUT /resenias/:id - Actualizar una reseña
app.put('/resenias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const reseniaIndex = resenias.findIndex(r => r.id_resenia === id);
  
  if (reseniaIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Reseña no encontrada'
    });
  }
  
  const { calificacion, comentario } = req.body;
  
  if (calificacion && (calificacion < 1 || calificacion > 5)) {
    return res.status(400).json({
      success: false,
      message: 'La calificación debe estar entre 1 y 5'
    });
  }
  
  resenias[reseniaIndex] = {
    ...resenias[reseniaIndex],
    calificacion: calificacion || resenias[reseniaIndex].calificacion,
    comentario: comentario !== undefined ? comentario : resenias[reseniaIndex].comentario
  };
  
  res.json({
    success: true,
    data: resenias[reseniaIndex],
    message: 'Reseña actualizada correctamente'
  });
});

// DELETE /resenias/:id - Eliminar una reseña
app.delete('/resenias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const reseniaIndex = resenias.findIndex(r => r.id_resenia === id);
  
  if (reseniaIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Reseña no encontrada'
    });
  }
  
  resenias.splice(reseniaIndex, 1);
  
  res.json({
    success: true,
    message: 'Reseña eliminada correctamente'
  });
});

// ==================== LÓGICAS ESPECÍFICAS ====================

// GET /libros/disponibles - Obtener libros con existencia disponible
app.get('/libros/disponibles', (req, res) => {
  const librosDisponibles = libros.filter(libro => libro.existencia > 0);
  
  res.json({
    success: true,
    data: librosDisponibles,
    message: 'Libros disponibles obtenidos correctamente'
  });
});

// GET /prestamos/usuario/:id_usuario - Obtener préstamos de un usuario específico
app.get('/prestamos/usuario/:id_usuario', (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);
  const prestamosUsuario = prestamos.filter(p => p.id_usuario === id_usuario);
  
  res.json({
    success: true,
    data: prestamosUsuario,
    message: `Préstamos del usuario ${id_usuario} obtenidos correctamente`
  });
});

// GET /prestamos/libro/:id_libro - Obtener préstamos de un libro específico
app.get('/prestamos/libro/:id_libro', (req, res) => {
  const id_libro = parseInt(req.params.id_libro);
  const prestamosLibro = prestamos.filter(p => p.id_libro === id_libro);
  
  res.json({
    success: true,
    data: prestamosLibro,
    message: `Préstamos del libro ${id_libro} obtenidos correctamente`
  });
});

// ==================== RUTA RAÍZ ====================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API RESTful de Biblioteca - Semana 16',
    endpoints: {
      usuarios: '/usuarios',
      libros: '/libros',
      prestamos: '/prestamos',
      resenias: '/resenias'
    }
  });
});

// ==================== MIDDLEWARE DE ERROR ====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('📚 API RESTful de Biblioteca - Semana 16');
});

module.exports = app;