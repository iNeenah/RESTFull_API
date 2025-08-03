const express = require('express');
const PrestamoController = require('../controller/prestamo.controller');

const router = express.Router();

// Rutas para préstamos
router.get('/', PrestamoController.obtenerTodos);
router.get('/usuario/:id_usuario', PrestamoController.obtenerPorUsuario);
router.get('/libro/:id_libro', PrestamoController.obtenerPorLibro);
router.get('/:id', PrestamoController.obtenerPorId);
router.post('/', PrestamoController.crear);
router.put('/:id', PrestamoController.actualizar);
router.delete('/:id', PrestamoController.eliminar);

module.exports = router;