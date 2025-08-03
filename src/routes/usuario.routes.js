const express = require('express');
const UsuarioController = require('../controller/usuario.controller');

const router = express.Router();

// Rutas para usuarios
router.get('/', UsuarioController.obtenerTodos);
router.get('/:id', UsuarioController.obtenerPorId);
router.post('/', UsuarioController.crear);
router.put('/:id', UsuarioController.actualizar);
router.delete('/:id', UsuarioController.eliminar);

module.exports = router;