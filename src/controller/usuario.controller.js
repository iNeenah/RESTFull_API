const UsuarioModel = require('../model/usuario.model');

class UsuarioController {
  // Obtener todos los usuarios
  static async obtenerTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.obtenerTodos();
      res.json({
        success: true,
        data: usuarios,
        message: 'Usuarios obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener usuario por ID
  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.obtenerPorId(parseInt(id));
      
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Crear nuevo usuario
  static async crear(req, res) {
    try {
      const { nombre, email, telefono } = req.body;

      if (!nombre || !email) {
        return res.status(400).json({
          success: false,
          message: 'Nombre y email son requeridos'
        });
      }

      const nuevoUsuario = await UsuarioModel.crear({ nombre, email, telefono });
      
      res.status(201).json({
        success: true,
        data: nuevoUsuario,
        message: 'Usuario creado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Actualizar usuario
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, email, telefono } = req.body;

      const usuarioExistente = await UsuarioModel.obtenerPorId(parseInt(id));
      if (!usuarioExistente) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const usuarioActualizado = await UsuarioModel.actualizar(parseInt(id), {
        nombre: nombre || usuarioExistente.nombre,
        email: email || usuarioExistente.email,
        telefono: telefono || usuarioExistente.telefono
      });

      res.json({
        success: true,
        data: usuarioActualizado,
        message: 'Usuario actualizado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Eliminar usuario
  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const usuarioExistente = await UsuarioModel.obtenerPorId(parseInt(id));
      if (!usuarioExistente) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      await UsuarioModel.eliminar(parseInt(id));
      
      res.json({
        success: true,
        message: 'Usuario eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = UsuarioController;