-- Creación de la tabla Rol
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Creación de la tabla TipoCuenta
CREATE TABLE tipos_cuenta (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Creación de la tabla Usuario
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role_id BIGINT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Creación de la tabla Cuenta
CREATE TABLE cuentas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    codigoCuenta VARCHAR(20) NOT NULL,
    descripcion VARCHAR(500),
    tipo_cuenta_id BIGINT,
    cuenta_padre_id BIGINT NULL,
    FOREIGN KEY (tipo_cuenta_id) REFERENCES tipos_cuenta(id),
    FOREIGN KEY (cuenta_padre_id) REFERENCES cuentas(id)
);
-- Relación de subcuentas (una cuenta puede tener varias subcuentas)
ALTER TABLE cuentas
ADD CONSTRAINT fk_cuenta_padre
FOREIGN KEY (cuenta_padre_id)
REFERENCES cuentas(id);

-- Creación de la tabla AsientoContable
CREATE TABLE asientos_contables (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion VARCHAR(500),
    usuario_id BIGINT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Creación de la tabla DetalleAsiento
CREATE TABLE detalles_asiento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cuenta_id BIGINT NOT NULL,
    asiento_id BIGINT NOT NULL,
    debe DECIMAL(15, 2) NOT NULL,
    haber DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (cuenta_id) REFERENCES cuentas(id),
    FOREIGN KEY (asiento_id) REFERENCES asientos_contables(id)
);
/*
-- Carga de datos en la tabla Rol
INSERT INTO roles (nombre) VALUES ('USER');
INSERT INTO roles (nombre) VALUES ('SUPERUSER');

-- Carga de datos en la tabla Usuario
INSERT INTO usuarios (username, password_hash, rol_id) VALUES ('admin', 'hashed_password_admin', 1);
INSERT INTO usuarios (username, password_hash, rol_id) VALUES ('user', 'hashed_password_user', 2);

-- Carga de datos en la tabla Cuenta
INSERT INTO cuentas (nombre, tipo_cuenta_id) VALUES ('Caja', 1);
INSERT INTO cuentas (nombre, tipo_cuenta_id) VALUES ('Banco', 2);

-- Carga de datos en la tabla AsientoContable
INSERT INTO asientos_contables (fecha) VALUES ('2024-01-01');
INSERT INTO asientos_contables (fecha) VALUES ('2024-02-01');

-- Carga de datos en la tabla DetalleAsiento
INSERT INTO detalles_asiento (asiento_contable_id, cuenta_id, debe, haber) VALUES (1, 1, 1000.00, 0.00);
INSERT INTO detalles_asiento (asiento_contable_id, cuenta_id, debe, haber) VALUES (1, 2, 0.00, 1000.00);
*/