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

// Datos simulados en memoria
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

console.log('🔧 Configurando rutas...');

// RUTA RAIZ
app.get('/', (req, res) => {
  console.log('📍 Acceso a ruta raíz');
  res.json({
    success: true,
    message: '🚀 API RESTful de Biblioteca - Semana 16',
    endpoints: {
      usuarios: '/usuarios',
      libros: '/libros',
      prestamos: '/prestamos',
      resenias: '/resenias'
    },
    ejemplos: [
      'GET /usuarios - Ver todos los usuarios',
      'GET /usuarios/1 - Ver usuario específico',
      'POST /usuarios - Crear usuario',
      'GET /libros - Ver todos los libros',
      'GET /libros/disponibles - Ver libros disponibles'
    ]
  });
});

// ENDPOINTS USUARIOS
app.get('/usuarios', (req, res) => {
  console.log('👥 GET /usuarios');
  res.json({
    success: true,
    data: usuarios,
    message: 'Usuarios obtenidos correctamente'
  });
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`👤 GET /usuarios/${id}`);
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

app.post('/usuarios', (req, res) => {
  console.log('➕ POST /usuarios', req.body);
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

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`✏️ PUT /usuarios/${id}`, req.body);
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

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`🗑️ DELETE /usuarios/${id}`);
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

// ENDPOINTS LIBROS
app.get('/libros', (req, res) => {
  console.log('📚 GET /libros');
  res.json({
    success: true,
    data: libros,
    message: 'Libros obtenidos correctamente'
  });
});

app.get('/libros/disponibles', (req, res) => {
  console.log('📖 GET /libros/disponibles');
  const librosDisponibles = libros.filter(libro => libro.existencia > 0);
  
  res.json({
    success: true,
    data: librosDisponibles,
    message: 'Libros disponibles obtenidos correctamente'
  });
});

app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`📕 GET /libros/${id}`);
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

app.post('/libros', (req, res) => {
  console.log('➕ POST /libros', req.body);
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

// ENDPOINTS PRESTAMOS
app.get('/prestamos', (req, res) => {
  console.log('📋 GET /prestamos');
  res.json({
    success: true,
    data: prestamos,
    message: 'Préstamos obtenidos correctamente'
  });
});

app.get('/prestamos/usuario/:id_usuario', (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);
  console.log(`👤📋 GET /prestamos/usuario/${id_usuario}`);
  const prestamosUsuario = prestamos.filter(p => p.id_usuario === id_usuario);
  
  res.json({
    success: true,
    data: prestamosUsuario,
    message: `Préstamos del usuario ${id_usuario} obtenidos correctamente`
  });
});

app.get('/prestamos/libro/:id_libro', (req, res) => {
  const id_libro = parseInt(req.params.id_libro);
  console.log(`📚📋 GET /prestamos/libro/${id_libro}`);
  const prestamosLibro = prestamos.filter(p => p.id_libro === id_libro);
  
  res.json({
    success: true,
    data: prestamosLibro,
    message: `Préstamos del libro ${id_libro} obtenidos correctamente`
  });
});

app.get('/prestamos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`📋 GET /prestamos/${id}`);
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

// ENDPOINTS RESENIAS
app.get('/resenias', (req, res) => {
  console.log('⭐ GET /resenias');
  res.json({
    success: true,
    data: resenias,
    message: 'Reseñas obtenidas correctamente'
  });
});

app.get('/resenias/libro/:id_libro', (req, res) => {
  const id_libro = parseInt(req.params.id_libro);
  console.log(`📚⭐ GET /resenias/libro/${id_libro}`);
  const reseniasLibro = resenias.filter(r => r.id_libro === id_libro);
  
  res.json({
    success: true,
    data: reseniasLibro,
    message: `Reseñas del libro ${id_libro} obtenidas correctamente`
  });
});

app.get('/resenias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`⭐ GET /resenias/${id}`);
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

// MIDDLEWARE DE ERROR
app.use('*', (req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Ruta ${req.method} ${req.originalUrl} no encontrada`,
    availableRoutes: [
      'GET /',
      'GET /usuarios',
      'GET /usuarios/:id',
      'POST /usuarios',
      'GET /libros',
      'GET /libros/disponibles',
      'GET /prestamos',
      'GET /resenias'
    ]
  });
});

app.use((err, req, res, next) => {
  console.error('💥 Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('📚 API RESTful de Biblioteca - Semana 16');
  console.log('🔗 Rutas disponibles:');
  console.log('   📍 GET  http://localhost:8080/');
  console.log('   👥 GET  http://localhost:8080/usuarios');
  console.log('   👤 GET  http://localhost:8080/usuarios/1');
  console.log('   ➕ POST http://localhost:8080/usuarios');
  console.log('   📚 GET  http://localhost:8080/libros');
  console.log('   📖 GET  http://localhost:8080/libros/disponibles');
  console.log('   📋 GET  http://localhost:8080/prestamos');
  console.log('   ⭐ GET  http://localhost:8080/resenias');
});

module.exports = app;