package com.SistemaContable.Actualizadores;

public class PasivoLibroMayor implements SaldoLibroMayor {
    @Override
    public double calcularSaldoLibroMayor(double saldoActual, double debe, double haber) {
        return saldoActual - debe + haber;
    }
}
