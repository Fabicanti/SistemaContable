package com.SistemaContable.Actualizadores;
import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Exceptions.SaldoInsuficienteException;

public abstract class ActualizadorSaldo
{
    public abstract Cuenta actualizarSaldo(Cuenta cuenta, char opcion, double monto);

    public Cuenta sumarSaldo(Cuenta cuenta, double monto){
        double saldoActual = cuenta.getSaldo();
        cuenta.setSaldo(saldoActual + monto);
        return cuenta;
    }

    public Cuenta restarSaldo(Cuenta cuenta, double monto){
        double saldoActual = cuenta.getSaldo();
        if(saldoActual >= monto){
            cuenta.setSaldo(saldoActual - monto);
        }
        else{
            throw new SaldoInsuficienteException("La cuenta no tiene saldo suficiente");
        }
        return cuenta;
    }

}


