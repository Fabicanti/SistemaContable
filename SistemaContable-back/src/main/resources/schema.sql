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
    codigo_cuenta VARCHAR(20) NOT NULL,
    saldo DECIMAL(15, 2) NOT NULL, -- Agrega saldo y saca descripción
    recibe_saldo BOOLEAN NOT NULL, 
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
