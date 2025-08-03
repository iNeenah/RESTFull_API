const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Importar configuración de base de datos
const { testConnection } = require('./src/config/db');

// Importar rutas
const usuarioRoutes = require('./src/routes/usuario.routes');
const libroRoutes = require('./src/routes/libro.routes');
const prestamoRoutes = require('./src/routes/prestamo.routes');
const reseniaRoutes = require('./src/routes/resenia.routes');

const app = express();
const PORT = 8080;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Probar conexión a la base de datos al iniciar
testConnection();

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API RESTful de Biblioteca - Semana 17 (Arquitectura MVC)',
    endpoints: {
      usuarios: '/usuarios',
      libros: '/libros',
      prestamos: '/prestamos',
      resenias: '/resenias'
    },
    version: '2.0.0',
    architecture: 'MVC (Model-View-Controller)'
  });
});

// Configurar rutas
app.use('/usuarios', usuarioRoutes);
app.use('/libros', libroRoutes);
app.use('/prestamos', prestamoRoutes);
app.use('/resenias', reseniaRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado'
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('API RESTful de Biblioteca - Arquitectura MVC');
  console.log('Estructura de carpetas:');
  console.log('├── src/');
  console.log('│   ├── config/     (Configuración de BD)');
  console.log('│   ├── model/      (Modelos de datos)');
  console.log('│   ├── controller/ (Lógica de negocio)');
  console.log('│   ├── routes/     (Definición de rutas)');
  console.log('│   └── middleware/ (Middlewares personalizados)');
});

module.exports = app;