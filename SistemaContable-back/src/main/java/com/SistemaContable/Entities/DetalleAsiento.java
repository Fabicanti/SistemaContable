package com.SistemaContable.Entities;
import jakarta.persistence.*;

@Entity
@Table(name = "detalles_asiento")
public class DetalleAsiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cuenta_id", nullable = false)
    private Cuenta cuenta;

    @ManyToOne
    @JoinColumn(name = "asiento_id", nullable = false)
    private AsientoContable asientoContable;

    @Column(nullable = false)
    private double debe;

    @Column(nullable = false)
    private double haber;

    public DetalleAsiento() {
    }

    public DetalleAsiento(double debe, double haber) {
        this.debe = debe;
        this.haber = haber;
    }

    public Long getId() {
        return id;
    }

    public Cuenta getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuenta cuenta) {
        this.cuenta = cuenta;
    }

    public AsientoContable getAsientoContable() {
        return asientoContable;
    }

    public void setAsientoContable(AsientoContable asientoContable) {
        this.asientoContable = asientoContable;
    }

    public double getDebe() {
        return debe;
    }

    public void setDebe(double debe) {
        this.debe = debe;
    }

    public double getHaber() {
        return haber;
    }

    public void setHaber(double haber) {
        this.haber = haber;
    }

    
}
