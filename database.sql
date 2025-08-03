-- Crear base de datos
CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla libros
CREATE TABLE IF NOT EXISTS libros (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    isbn VARCHAR(20),
    existencia INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla prestamos
CREATE TABLE IF NOT EXISTS prestamos (
    id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_libro INT NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    estado ENUM('activo', 'devuelto', 'vencido') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON DELETE CASCADE
);

-- Tabla resenias
CREATE TABLE IF NOT EXISTS resenias (
    id_resenia INT AUTO_INCREMENT PRIMARY KEY,
    id_libro INT NOT NULL,
    id_usuario INT NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Insertar datos de prueba
INSERT INTO usuarios (nombre, email, telefono) VALUES
('Juan Pérez', 'juan@email.com', '123456789'),
('María García', 'maria@email.com', '987654321'),
('Carlos López', 'carlos@email.com', '555123456');

INSERT INTO libros (titulo, autor, isbn, existencia) VALUES
('El Quijote', 'Miguel de Cervantes', '978-84-376-0494-7', 5),
('Cien años de soledad', 'Gabriel García Márquez', '978-84-376-0495-4', 3),
('1984', 'George Orwell', '978-84-376-0496-1', 4),
('El Principito', 'Antoine de Saint-Exupéry', '978-84-376-0497-8', 2);

INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado) VALUES
(1, 1, '2024-01-15', '2024-01-30', 'activo'),
(2, 2, '2024-01-20', '2024-02-05', 'devuelto'),
(3, 3, '2024-01-25', '2024-02-10', 'activo');

INSERT INTO resenias (id_libro, id_usuario, calificacion, comentario, fecha) VALUES
(1, 1, 5, 'Excelente libro clásico', '2024-01-25'),
(2, 2, 4, 'Muy buena narrativa', '2024-01-28'),
(3, 3, 5, 'Una obra maestra distópica', '2024-01-30');