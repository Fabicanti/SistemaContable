package com.SistemaContable.Actualizadores;

import com.SistemaContable.Entities.Cuenta;

public class SumaHaberRestaDebe extends ActualizadorSaldo {

    public SumaHaberRestaDebe(){}

    @Override
    public Cuenta actualizarSaldo(Cuenta cuenta, char opcion, double monto) {
        if(opcion == 'd'){
            cuenta = super.restarSaldo(cuenta, monto);
        }
        else{
            cuenta = super.sumarSaldo(cuenta, monto);
        }
        return cuenta; 
    }

}
