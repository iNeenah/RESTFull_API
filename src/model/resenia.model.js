const { pool } = require('../config/db');

class ReseniaModel {
  // Obtener todas las reseñas
  static async obtenerTodas() {
    try {
      const [rows] = await pool.execute('SELECT * FROM resenias');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener reseñas: ' + error.message);
    }
  }

  // Obtener reseña por ID
  static async obtenerPorId(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM resenias WHERE id_resenia = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error al obtener reseña: ' + error.message);
    }
  }

  // Obtener reseñas por libro
  static async obtenerPorLibro(idLibro) {
    try {
      const [rows] = await pool.execute('SELECT * FROM resenias WHERE id_libro = ?', [idLibro]);
      return rows;
    } catch (error) {
      throw new Error('Error al obtener reseñas del libro: ' + error.message);
    }
  }

  // Crear nueva reseña
  static async crear(resenia) {
    try {
      const { id_libro, id_usuario, calificacion, comentario } = resenia;
      const fecha = new Date().toISOString().split('T')[0];
      
      const [result] = await pool.execute(
        'INSERT INTO resenias (id_libro, id_usuario, calificacion, comentario, fecha) VALUES (?, ?, ?, ?, ?)',
        [id_libro, id_usuario, calificacion, comentario || '', fecha]
      );
      
      return { 
        id_resenia: result.insertId, 
        id_libro, 
        id_usuario, 
        calificacion, 
        comentario: comentario || '', 
        fecha 
      };
    } catch (error) {
      throw new Error('Error al crear reseña: ' + error.message);
    }
  }

  // Actualizar reseña
  static async actualizar(id, resenia) {
    try {
      const { calificacion, comentario } = resenia;
      await pool.execute(
        'UPDATE resenias SET calificacion = ?, comentario = ? WHERE id_resenia = ?',
        [calificacion, comentario, id]
      );
      return await this.obtenerPorId(id);
    } catch (error) {
      throw new Error('Error al actualizar reseña: ' + error.message);
    }
  }

  // Eliminar reseña
  static async eliminar(id) {
    try {
      const [result] = await pool.execute('DELETE FROM resenias WHERE id_resenia = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Error al eliminar reseña: ' + error.message);
    }
  }
}

module.exports = ReseniaModel;