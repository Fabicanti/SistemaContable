-- Carga de datos en la tabla Rol
INSERT INTO roles (nombre) VALUES ('USER');
INSERT INTO roles (nombre) VALUES ('SUPERUSER');

-- Cargar datos en la tabla TipoCuenta
INSERT INTO tipos_cuenta (nombre) VALUES ('RAIZ');
INSERT INTO tipos_cuenta (nombre) VALUES ('ACTIVO');
INSERT INTO tipos_cuenta (nombre) VALUES ('PASIVO');
INSERT INTO tipos_cuenta (nombre) VALUES ('PATRIMONIO NETO');
INSERT INTO tipos_cuenta (nombre) VALUES ('RESULTADO POSITIVO');
INSERT INTO tipos_cuenta (nombre) VALUES ('RESULTADO NEGATIVO');

-- Cargar datos en la tabla Usuario
-- Las contraseñas user1: user123 ; admin : admin123)
INSERT INTO usuarios (username, password_hash, nombre, apellido, email, role_id)
VALUES ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Admin', 'Example', 'admin@example.com', 2);
INSERT INTO usuarios (username, password_hash, nombre, apellido, email, role_id)
VALUES ('user1', 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446', 'User1', 'Example', 'user1@example.com', 1);

-- Cuenta raiz: sirve para establecer la estructura de "arbol" en el plan de cuentas y para generar los codigos. El usuario no deberia poder verla ni usarla.
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Raiz', '00000', -1, (SELECT id FROM tipos_cuenta WHERE nombre = 'RAIZ'), NULL);

-- Cuentas padres ACTIVO, PASIVO, PATRIMONIO NETO, RESULTADO POSITIVO, RESULTADO NEGATIVO
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('ACTIVO', '10000', -1, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('PASIVO', '20000', -1, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('PATRIMONIO NETO', '30000', -1, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('RESULTADO POSITIVO', '40000', -1, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('RESULTADO NEGATIVO', '50000', -1, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));
