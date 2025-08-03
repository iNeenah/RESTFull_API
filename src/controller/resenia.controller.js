const ReseniaModel = require('../model/resenia.model');
const UsuarioModel = require('../model/usuario.model');
const LibroModel = require('../model/libro.model');

class ReseniaController {
  // Obtener todas las reseñas
  static async obtenerTodas(req, res) {
    try {
      const resenias = await ReseniaModel.obtenerTodas();
      res.json({
        success: true,
        data: resenias,
        message: 'Reseñas obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener reseñas por libro
  static async obtenerPorLibro(req, res) {
    try {
      const { id_libro } = req.params;
      const resenias = await ReseniaModel.obtenerPorLibro(parseInt(id_libro));
      
      res.json({
        success: true,
        data: resenias,
        message: `Reseñas del libro ${id_libro} obtenidas correctamente`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener reseña por ID
  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const resenia = await ReseniaModel.obtenerPorId(parseInt(id));
      
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Crear nueva reseña
  static async crear(req, res) {
    try {
      const { id_libro, id_usuario, calificacion, comentario } = req.body;

      if (!id_libro || !id_usuario || !calificacion) {
        return res.status(400).json({
          success: false,
          message: 'ID de libro, ID de usuario y calificación son requeridos'
        });
      }

      // Verificar que el libro existe
      const libro = await LibroModel.obtenerPorId(id_libro);
      if (!libro) {
        return res.status(404).json({
          success: false,
          message: 'Libro no encontrado'
        });
      }

      // Verificar que el usuario existe
      const usuario = await UsuarioModel.obtenerPorId(id_usuario);
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

      const nuevaResenia = await ReseniaModel.crear({ id_libro, id_usuario, calificacion, comentario });
      
      res.status(201).json({
        success: true,
        data: nuevaResenia,
        message: 'Reseña creada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Actualizar reseña
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { calificacion, comentario } = req.body;

      const reseniaExistente = await ReseniaModel.obtenerPorId(parseInt(id));
      if (!reseniaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Reseña no encontrada'
        });
      }

      if (calificacion && (calificacion < 1 || calificacion > 5)) {
        return res.status(400).json({
          success: false,
          message: 'La calificación debe estar entre 1 y 5'
        });
      }

      const reseniaActualizada = await ReseniaModel.actualizar(parseInt(id), {
        calificacion: calificacion || reseniaExistente.calificacion,
        comentario: comentario !== undefined ? comentario : reseniaExistente.comentario
      });

      res.json({
        success: true,
        data: reseniaActualizada,
        message: 'Reseña actualizada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Eliminar reseña
  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const reseniaExistente = await ReseniaModel.obtenerPorId(parseInt(id));
      if (!reseniaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Reseña no encontrada'
        });
      }

      await ReseniaModel.eliminar(parseInt(id));
      
      res.json({
        success: true,
        message: 'Reseña eliminada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = ReseniaController;