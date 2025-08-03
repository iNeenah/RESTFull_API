const { pool } = require('../config/db');

class LibroModel {
  // Obtener todos los libros
  static async obtenerTodos() {
    try {
      const [rows] = await pool.execute('SELECT * FROM libros');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener libros: ' + error.message);
    }
  }

  // Obtener libro por ID
  static async obtenerPorId(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM libros WHERE id_libro = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error al obtener libro: ' + error.message);
    }
  }

  // Obtener libros disponibles
  static async obtenerDisponibles() {
    try {
      const [rows] = await pool.execute('SELECT * FROM libros WHERE existencia > 0');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener libros disponibles: ' + error.message);
    }
  }

  // Crear nuevo libro
  static async crear(libro) {
    try {
      const { titulo, autor, isbn, existencia } = libro;
      const [result] = await pool.execute(
        'INSERT INTO libros (titulo, autor, isbn, existencia) VALUES (?, ?, ?, ?)',
        [titulo, autor, isbn || '', existencia || 0]
      );
      return { id_libro: result.insertId, ...libro };
    } catch (error) {
      throw new Error('Error al crear libro: ' + error.message);
    }
  }

  // Actualizar libro
  static async actualizar(id, libro) {
    try {
      const { titulo, autor, isbn, existencia } = libro;
      await pool.execute(
        'UPDATE libros SET titulo = ?, autor = ?, isbn = ?, existencia = ? WHERE id_libro = ?',
        [titulo, autor, isbn, existencia, id]
      );
      return { id_libro: id, ...libro };
    } catch (error) {
      throw new Error('Error al actualizar libro: ' + error.message);
    }
  }

  // Actualizar existencia
  static async actualizarExistencia(id, existencia) {
    try {
      await pool.execute('UPDATE libros SET existencia = ? WHERE id_libro = ?', [existencia, id]);
      const libroActualizado = await this.obtenerPorId(id);
      return libroActualizado;
    } catch (error) {
      throw new Error('Error al actualizar existencia: ' + error.message);
    }
  }

  // Eliminar libro
  static async eliminar(id) {
    try {
      const [result] = await pool.execute('DELETE FROM libros WHERE id_libro = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Error al eliminar libro: ' + error.message);
    }
  }
}

module.exports = LibroModel;