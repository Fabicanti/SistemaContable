package com.SistemaContable.Exceptions;

public class CuentaNoValidaException extends RuntimeException{

    public CuentaNoValidaException(String mensaje) {
        super(mensaje);
    }

}
