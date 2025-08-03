const PrestamoModel = require('../model/prestamo.model');
const UsuarioModel = require('../model/usuario.model');
const LibroModel = require('../model/libro.model');

class PrestamoController {
  // Obtener todos los préstamos
  static async obtenerTodos(req, res) {
    try {
      const prestamos = await PrestamoModel.obtenerTodos();
      res.json({
        success: true,
        data: prestamos,
        message: 'Préstamos obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener préstamos por usuario
  static async obtenerPorUsuario(req, res) {
    try {
      const { id_usuario } = req.params;
      const prestamos = await PrestamoModel.obtenerPorUsuario(parseInt(id_usuario));
      
      res.json({
        success: true,
        data: prestamos,
        message: `Préstamos del usuario ${id_usuario} obtenidos correctamente`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener préstamos por libro
  static async obtenerPorLibro(req, res) {
    try {
      const { id_libro } = req.params;
      const prestamos = await PrestamoModel.obtenerPorLibro(parseInt(id_libro));
      
      res.json({
        success: true,
        data: prestamos,
        message: `Préstamos del libro ${id_libro} obtenidos correctamente`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener préstamo por ID
  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const prestamo = await PrestamoModel.obtenerPorId(parseInt(id));
      
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Crear nuevo préstamo
  static async crear(req, res) {
    try {
      const { id_usuario, id_libro, fecha_devolucion } = req.body;

      if (!id_usuario || !id_libro) {
        return res.status(400).json({
          success: false,
          message: 'ID de usuario e ID de libro son requeridos'
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

      // Verificar que el libro existe y tiene existencia
      const libro = await LibroModel.obtenerPorId(id_libro);
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

      // Crear el préstamo
      const nuevoPrestamo = await PrestamoModel.crear({ id_usuario, id_libro, fecha_devolucion });
      
      // Reducir existencia del libro
      await LibroModel.actualizarExistencia(id_libro, libro.existencia - 1);

      res.status(201).json({
        success: true,
        data: nuevoPrestamo,
        message: 'Préstamo creado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Actualizar préstamo
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { fecha_devolucion, estado } = req.body;

      const prestamoExistente = await PrestamoModel.obtenerPorId(parseInt(id));
      if (!prestamoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      // Si se está devolviendo el libro, aumentar existencia
      if (estado === 'devuelto' && prestamoExistente.estado === 'activo') {
        const libro = await LibroModel.obtenerPorId(prestamoExistente.id_libro);
        if (libro) {
          await LibroModel.actualizarExistencia(prestamoExistente.id_libro, libro.existencia + 1);
        }
      }

      const prestamoActualizado = await PrestamoModel.actualizar(parseInt(id), {
        fecha_devolucion: fecha_devolucion || prestamoExistente.fecha_devolucion,
        estado: estado || prestamoExistente.estado
      });

      res.json({
        success: true,
        data: prestamoActualizado,
        message: 'Préstamo actualizado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Eliminar préstamo
  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const prestamoExistente = await PrestamoModel.obtenerPorId(parseInt(id));
      if (!prestamoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      // Si el préstamo estaba activo, devolver la existencia al libro
      if (prestamoExistente.estado === 'activo') {
        const libro = await LibroModel.obtenerPorId(prestamoExistente.id_libro);
        if (libro) {
          await LibroModel.actualizarExistencia(prestamoExistente.id_libro, libro.existencia + 1);
        }
      }

      await PrestamoModel.eliminar(parseInt(id));
      
      res.json({
        success: true,
        message: 'Préstamo eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = PrestamoController;