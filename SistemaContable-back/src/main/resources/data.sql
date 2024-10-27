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

---------------------------------------------------------------------------------------------------------------------
-- Cuenta raiz: sirve para establecer la estructura de "arbol" en el plan de cuentas y para generar los codigos. El usuario no deberia poder verla ni usarla.

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id) 
VALUES ('Raiz', '00000', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'RAIZ'), NULL);

-- Cuentas padres ACTIVO, PASIVO, PATRIMONIO NETO, RESULTADO POSITIVO, RESULTADO NEGATIVO

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('ACTIVO', '10000', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('PASIVO', '20000', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('PATRIMONIO NETO', '30000', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('RESULTADO POSITIVO', '40000', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('RESULTADO NEGATIVO', '50000', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '00000'));
---------------------------------------------------------------------------------------------------------------------

-- Cuentas hijas de ACTIVO

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Caja y Banco', '10100', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Creditos', '10200', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Bienes de cambio', '10300', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Bienes de uso', '10400', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10000'));

-- Cuentas hijas de PASIVO

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Deudas Comerciales', '20100', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Deudas Fiscales', '20200', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Prestamos Bancarios', '20300', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20000'));

-- Cuentas hijas de PATRIMONIO NETO

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Capital', '30100', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '30000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Resultados', '30200', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PATRIMONIO NETO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '30000'));

-- Cuentas hijas de RESULTADO POSITIVO

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Ventas', '40100', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '40000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Ingresos', '40200', -1, false, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '40000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Intereses Ganados', '40300', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '40000'));

-- Cuentas hijas de RESULTADO NEGATIVO

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Costo Mercaderias Vendidas', '50100', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '50000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Impuestos', '50200', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '50000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Sueldos', '50300', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '50000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Intereses', '50400', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '50000'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Alquileres', '50500', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO NEGATIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '50000'));

---------------------------------------------------------------------------------------------------------------------
-- Cuentas hijas de Caja y Banco

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Caja', '10101', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10100'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Banco plazo fijo', '10102', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10100'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Banco cta cte', '10103', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10100'));

-- Cuentas hijas de Creditos

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Deudores por Ventas', '10201', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10200'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Documentos a Cobrar', '10202', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10200'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Valores a Depositar', '10203', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10200'));

-- Cuentas hijas de Bienes de cambio

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Mercaderias', '10301', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10300'));

-- Cuentas hijas de Bienes de uso

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Inmuebles', '10401', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10400'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Rodados', '10402', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10400'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Instalaciones', '10403', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'ACTIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '10400'));

---------------------------------------------------------------------------------------------------------------------

-- Cuentas hijas de Deudas Comerciales

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Proveedores', '20101', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20100'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Sueldos a Pagar', '20102', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20100'));

-- Cuentas hijas de Deudas Fiscales

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Impuestos a Pagar', '20201', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20200'));

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Moratorias', '20202', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20200'));

-- Cuentas hijas de Prestamos Bancarios

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Prestamo Hipotecario', '20301', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'PASIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '20300'));

---------------------------------------------------------------------------------------------------------------------

-- Cuentas hijas de Capital

-- Cuentas hijas de Resultados

---------------------------------------------------------------------------------------------------------------------

-- Cuentas hijas de Ventas

INSERT INTO cuentas (nombre, codigo_cuenta, saldo, recibe_saldo, tipo_cuenta_id, cuenta_padre_id)
VALUES ('Ventas de Mercaderias', '40101', 0, true, (SELECT id FROM tipos_cuenta WHERE nombre = 'RESULTADO POSITIVO'), 
        (SELECT id FROM cuentas WHERE codigo_cuenta = '40100'));

-- Cuentas hijas de Ingresos

-- Cuentas hijas de Intereses Ganados

---------------------------------------------------------------------------------------------------------------------

-- Cuentas hijas de Costo Mercaderias Vendidas

-- Cuentas hijas de Impuestos

-- Cuentas hijas de Sueldos

-- Cuentas hijas de Intereses

-- Cuentas hijas de Alquileres

---------------------------------------------------------------------------------------------------------------------
