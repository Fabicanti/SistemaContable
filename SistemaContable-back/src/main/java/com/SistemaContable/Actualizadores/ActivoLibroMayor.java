package com.SistemaContable.Actualizadores;

public class ActivoLibroMayor implements SaldoLibroMayor {
    @Override
    public double calcularSaldoLibroMayor(double saldoActual, double debe, double haber) {
        return saldoActual + debe - haber;
    }
}