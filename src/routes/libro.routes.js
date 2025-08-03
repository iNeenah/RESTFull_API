const express = require('express');
const LibroController = require('../controller/libro.controller');

const router = express.Router();

// Rutas para libros
router.get('/', LibroController.obtenerTodos);
router.get('/disponibles', LibroController.obtenerDisponibles);
router.get('/:id', LibroController.obtenerPorId);
router.post('/', LibroController.crear);
router.put('/:id', LibroController.actualizar);
router.put('/:id/existencia', LibroController.actualizarExistencia);
router.delete('/:id', LibroController.eliminar);

module.exports = router;