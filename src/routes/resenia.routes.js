const express = require('express');
const ReseniaController = require('../controller/resenia.controller');

const router = express.Router();

// Rutas para reseñas
router.get('/', ReseniaController.obtenerTodas);
router.get('/libro/:id_libro', ReseniaController.obtenerPorLibro);
router.get('/:id', ReseniaController.obtenerPorId);
router.post('/', ReseniaController.crear);
router.put('/:id', ReseniaController.actualizar);
router.delete('/:id', ReseniaController.eliminar);

module.exports = router;