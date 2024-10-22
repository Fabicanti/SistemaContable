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
VALUES ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Admin', 'Example', 'admin@example.com', 1);
INSERT INTO usuarios (username, password_hash, nombre, apellido, email, role_id)
VALUES ('user1', 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446', 'User1', 'Example', 'user1@example.com', 2);

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

/*
-- Activos
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Caja', '1100', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Valores a depositar', '1101', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = CONCAT(SUBSTRING('1101', 1, 2), '00')));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Bancos', '1200', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Banco C/C', '1201', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = CONCAT(SUBSTRING('1201', 1, 2), '00')));
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Banco Plazo Fijo', '1202', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = CONCAT(SUBSTRING('1202', 1, 2), '00')));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Clientes', '1300', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Mercaderías', '1400', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Activos Corrientes', '1500', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Inversiones a Largo Plazo', '1600', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Propiedades, Planta y Equipo', '1700', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Maquinaria', '1701', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = CONCAT(SUBSTRING('1701', 1, 2), '00')));
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Mobiliario y Equipo', '1702', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = CONCAT(SUBSTRING('1702', 1, 2), '00')));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Activos Intangibles', '1800', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Activos No Corrientes', '1900', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), NULL);

-- Pasivos
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Proveedores', '2100', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Obligaciones Bancarias a Corto Plazo', '2200', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Documentos por Pagar', '2300', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Pasivos Corrientes', '2400', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Obligaciones Bancarias a Largo Plazo', '2500', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Provisiones', '2600', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Pasivos No Corrientes', '2700', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Obligaciones a Pagar', '2800', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), NULL);

-- Patrimonio Neto
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Capital Social', '3100', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Reservas', '3200', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Resultados Acumulados', '3300', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Resultado del Ejercicio', '3400', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), NULL);

-- Resultado Positivo
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Ventas de Mercaderías', '4100', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Prestación de Servicios', '4200', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Ingresos', '4300', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), NULL);

-- Resultado Negativo
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Costo de Ventas', '5100', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos de Administración', '5200', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos de Ventas', '5300', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos Financieros', '5400', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Otros Gastos', '5500', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);
INSERT INTO cuentas (nombre, codigo_cuenta, saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Gastos por publicidad', '5600', 0.00, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), NULL);

-- Lo tuve que cambiar por un error en esa columna. Columna "C1_0.CODIGO_CUENTA" no encontrada. (CuentaService) -> obtenerTodasLasCuentas()
-- JPA convierte nombres en camelCase a snake_case.
-- ALTER TABLE cuentas RENAME COLUMN codigo_cuenta TO codigo_cuenta;
*/