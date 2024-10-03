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

-- Carga de datos en la tabla Rol
INSERT INTO roles (nombre) VALUES ('USER');
INSERT INTO roles (nombre) VALUES ('SUPERUSER');

-- Cargar datos en la tabla TipoCuenta
INSERT INTO tipos_cuenta (nombre) VALUES ('ACTIVO');
INSERT INTO tipos_cuenta (nombre) VALUES ('PASIVO');
INSERT INTO tipos_cuenta (nombre) VALUES ('PATRIMONIO NETO');
INSERT INTO tipos_cuenta (nombre) VALUES ('RESULTADO POSITIVO');
INSERT INTO tipos_cuenta (nombre) VALUES ('RESULTADO NEGATIVO');

-- Cargar datos en la tabla Usuario
-- Las contraseñas user1: user123 ; admin : admin123)
INSERT INTO usuarios (username, password_hash, nombre, apellido, email, role_id)
VALUES ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Admin', 'Example', 'admin@example.com', 1);
INSERT INTO usuarios (username, password_hash, nombre, apellido, email, role_id)
VALUES ('user1', 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446', 'User1', 'Example', 'user1@example.com', 2);


-- Activos
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Caja', '1100', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Valores a depositar', '1101', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigoCuenta = CONCAT(SUBSTRING('1101', 1, 2), '00')));

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Bancos', '1200', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Banco C/C', '1201', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigoCuenta = CONCAT(SUBSTRING('1201', 1, 2), '00')));
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Banco Plazo Fijo', '1202', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigoCuenta = CONCAT(SUBSTRING('1202', 1, 2), '00')));

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Clientes', '1300', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Mercaderías', '1400', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Activos Corrientes', '1500', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Inversiones a Largo Plazo', '1600', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Propiedades, Planta y Equipo', '1700', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Maquinaria', '1701', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigoCuenta = CONCAT(SUBSTRING('1701', 1, 2), '00')));
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Mobiliario y Equipo', '1702', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigoCuenta = CONCAT(SUBSTRING('1702', 1, 2), '00')));

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Activos Intangibles', '1800', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Activos No Corrientes', '1900', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

-- Pasivos
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Proveedores', '2100', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Obligaciones Bancarias a Corto Plazo', '2200', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Documentos por Pagar', '2300', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Pasivos Corrientes', '2400', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Obligaciones Bancarias a Largo Plazo', '2500', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Provisiones', '2600', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Pasivos No Corrientes', '2700', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Obligaciones a Pagar', '2800', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);

-- Patrimonio Neto
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Capital Social', '3100', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Reservas', '3200', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Resultados Acumulados', '3300', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Resultado del Ejercicio', '3400', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);

-- Resultado Positivo
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Ventas de Mercaderías', '4100', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Prestación de Servicios', '4200', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Ingresos', '4300', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), NULL);

-- Resultado Negativo
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Costo de Ventas', '5100', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos de Administración', '5200', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos de Ventas', '5300', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos Financieros', '5400', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Gastos', '5500', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigoCuenta, descripcion, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos por publicidad', '5600', '', (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
