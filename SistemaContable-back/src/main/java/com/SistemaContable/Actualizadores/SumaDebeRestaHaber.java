package com.SistemaContable.Actualizadores;

import com.SistemaContable.Entities.Cuenta;

public class SumaDebeRestaHaber extends ActualizadorSaldo {

    public SumaDebeRestaHaber(){}

    @Override
    public Cuenta actualizarSaldo(Cuenta cuenta, char opcion, double monto) {
        if(opcion == 'd'){
            cuenta = super.sumarSaldo(cuenta, monto);
        }
        else{
            cuenta = super.restarSaldo(cuenta, monto);
        }    
        return cuenta;
    }
}
