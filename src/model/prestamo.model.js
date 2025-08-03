const { pool } = require('../config/db');

class PrestamoModel {
  // Obtener todos los préstamos
  static async obtenerTodos() {
    try {
      const [rows] = await pool.execute('SELECT * FROM prestamos');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener préstamos: ' + error.message);
    }
  }

  // Obtener préstamo por ID
  static async obtenerPorId(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM prestamos WHERE id_prestamo = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error al obtener préstamo: ' + error.message);
    }
  }

  // Obtener préstamos por usuario
  static async obtenerPorUsuario(idUsuario) {
    try {
      const [rows] = await pool.execute('SELECT * FROM prestamos WHERE id_usuario = ?', [idUsuario]);
      return rows;
    } catch (error) {
      throw new Error('Error al obtener préstamos del usuario: ' + error.message);
    }
  }

  // Obtener préstamos por libro
  static async obtenerPorLibro(idLibro) {
    try {
      const [rows] = await pool.execute('SELECT * FROM prestamos WHERE id_libro = ?', [idLibro]);
      return rows;
    } catch (error) {
      throw new Error('Error al obtener préstamos del libro: ' + error.message);
    }
  }

  // Crear nuevo préstamo
  static async crear(prestamo) {
    try {
      const { id_usuario, id_libro, fecha_devolucion } = prestamo;
      const fecha_prestamo = new Date().toISOString().split('T')[0];
      
      const [result] = await pool.execute(
        'INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)',
        [id_usuario, id_libro, fecha_prestamo, fecha_devolucion || '', 'activo']
      );
      
      return { 
        id_prestamo: result.insertId, 
        id_usuario, 
        id_libro, 
        fecha_prestamo, 
        fecha_devolucion: fecha_devolucion || '', 
        estado: 'activo' 
      };
    } catch (error) {
      throw new Error('Error al crear préstamo: ' + error.message);
    }
  }

  // Actualizar préstamo
  static async actualizar(id, prestamo) {
    try {
      const { fecha_devolucion, estado } = prestamo;
      await pool.execute(
        'UPDATE prestamos SET fecha_devolucion = ?, estado = ? WHERE id_prestamo = ?',
        [fecha_devolucion, estado, id]
      );
      return await this.obtenerPorId(id);
    } catch (error) {
      throw new Error('Error al actualizar préstamo: ' + error.message);
    }
  }

  // Eliminar préstamo
  static async eliminar(id) {
    try {
      const [result] = await pool.execute('DELETE FROM prestamos WHERE id_prestamo = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Error al eliminar préstamo: ' + error.message);
    }
  }
}

module.exports = PrestamoModel;