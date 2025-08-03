const { pool } = require('../config/db');

class UsuarioModel {
  // Obtener todos los usuarios
  static async obtenerTodos() {
    try {
      const [rows] = await pool.execute('SELECT * FROM usuarios');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  }

  // Obtener usuario por ID
  static async obtenerPorId(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message);
    }
  }

  // Crear nuevo usuario
  static async crear(usuario) {
    try {
      const { nombre, email, telefono } = usuario;
      const [result] = await pool.execute(
        'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)',
        [nombre, email, telefono || '']
      );
      return { id_usuario: result.insertId, ...usuario };
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  }

  // Actualizar usuario
  static async actualizar(id, usuario) {
    try {
      const { nombre, email, telefono } = usuario;
      await pool.execute(
        'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id_usuario = ?',
        [nombre, email, telefono, id]
      );
      return { id_usuario: id, ...usuario };
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  }

  // Eliminar usuario
  static async eliminar(id) {
    try {
      const [result] = await pool.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  }
}

module.exports = UsuarioModel;