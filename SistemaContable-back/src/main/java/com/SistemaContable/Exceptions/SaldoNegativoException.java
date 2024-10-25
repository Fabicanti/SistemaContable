package com.SistemaContable.Exceptions;

public class SaldoNegativoException extends RuntimeException {
    public SaldoNegativoException(String msg) {
        super(msg);
    }
}
