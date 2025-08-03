const LibroModel = require('../model/libro.model');

class LibroController {
  // Obtener todos los libros
  static async obtenerTodos(req, res) {
    try {
      const libros = await LibroModel.obtenerTodos();
      res.json({
        success: true,
        data: libros,
        message: 'Libros obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener libros disponibles
  static async obtenerDisponibles(req, res) {
    try {
      const librosDisponibles = await LibroModel.obtenerDisponibles();
      res.json({
        success: true,
        data: librosDisponibles,
        message: 'Libros disponibles obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener libro por ID
  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const libro = await LibroModel.obtenerPorId(parseInt(id));
      
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Crear nuevo libro
  static async crear(req, res) {
    try {
      const { titulo, autor, isbn, existencia } = req.body;

      if (!titulo || !autor) {
        return res.status(400).json({
          success: false,
          message: 'Título y autor son requeridos'
        });
      }

      const nuevoLibro = await LibroModel.crear({ titulo, autor, isbn, existencia });
      
      res.status(201).json({
        success: true,
        data: nuevoLibro,
        message: 'Libro creado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Actualizar libro
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, autor, isbn, existencia } = req.body;

      const libroExistente = await LibroModel.obtenerPorId(parseInt(id));
      if (!libroExistente) {
        return res.status(404).json({
          success: false,
          message: 'Libro no encontrado'
        });
      }

      const libroActualizado = await LibroModel.actualizar(parseInt(id), {
        titulo: titulo || libroExistente.titulo,
        autor: autor || libroExistente.autor,
        isbn: isbn || libroExistente.isbn,
        existencia: existencia !== undefined ? existencia : libroExistente.existencia
      });

      res.json({
        success: true,
        data: libroActualizado,
        message: 'Libro actualizado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Actualizar existencia
  static async actualizarExistencia(req, res) {
    try {
      const { id } = req.params;
      const { existencia } = req.body;

      if (existencia === undefined || existencia < 0) {
        return res.status(400).json({
          success: false,
          message: 'La existencia debe ser un número mayor o igual a 0'
        });
      }

      const libroExistente = await LibroModel.obtenerPorId(parseInt(id));
      if (!libroExistente) {
        return res.status(404).json({
          success: false,
          message: 'Libro no encontrado'
        });
      }

      const libroActualizado = await LibroModel.actualizarExistencia(parseInt(id), existencia);

      res.json({
        success: true,
        data: libroActualizado,
        message: 'Existencia actualizada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Eliminar libro
  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const libroExistente = await LibroModel.obtenerPorId(parseInt(id));
      if (!libroExistente) {
        return res.status(404).json({
          success: false,
          message: 'Libro no encontrado'
        });
      }

      await LibroModel.eliminar(parseInt(id));
      
      res.json({
        success: true,
        message: 'Libro eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = LibroController;