package com.SistemaContable.Entities;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "cuentas")
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "codigo_cuenta", nullable = false)
    private String codigoCuenta;

    @Column(name = "saldo", nullable = false)
    private double saldo;

    @Column(name = "recibe_saldo", nullable = false)
    private boolean recibeSaldo;

    @ManyToOne
    @JoinColumn(name = "tipo_cuenta_id", nullable = false)
    @JsonIgnoreProperties("cuentas")
    private TipoCuenta tipoCuenta;

    @ManyToOne
    @JoinColumn(name = "cuenta_padre_id")
    @JsonIgnoreProperties("subCuentas")
    private Cuenta cuentaPadre;  // Relación en árbol

    @OneToMany(mappedBy = "cuentaPadre", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("cuentaPadre")
    private List<Cuenta> subCuentas= new ArrayList<>();

    @OneToMany(mappedBy = "cuenta")
    @JsonBackReference
    private List<DetalleAsiento> detallesAsientos;

    public Cuenta() {
    }

    public Cuenta(String nombre, String codigoCuenta, TipoCuenta tipoCuenta) {
        this.nombre = nombre;
        this.codigoCuenta = codigoCuenta;
        this.tipoCuenta = tipoCuenta;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigoCuenta() {
        return codigoCuenta;
    }

    public double getSaldo(){
        return saldo;
    }

    public void setSaldo(double saldo){
        this.saldo = saldo;
    }

    public boolean getRecibeSaldo(){
        return recibeSaldo;
    }

    public void setRecibeSaldo(boolean recibeSaldo){
        this.recibeSaldo = recibeSaldo;
    }

    public void setCodigoCuenta(String codigoCuenta) {
        this.codigoCuenta = codigoCuenta;
    }

    public TipoCuenta getTipoCuenta() {
        return tipoCuenta;
    }

    public void setTipoCuenta(TipoCuenta tipoCuenta) {
        this.tipoCuenta = tipoCuenta;
    }

    public Cuenta getCuentaPadre() {
        return cuentaPadre;
    }

    public void setCuentaPadre(Cuenta cuentaPadre) {
        this.cuentaPadre = cuentaPadre;
    }

    public List<Cuenta> getSubCuentas() {
        return subCuentas;
    }

    public void setSubCuentas(List<Cuenta> subCuentas) {
        this.subCuentas = subCuentas;
    }

    public List<DetalleAsiento> getDetallesAsientos() {
        return detallesAsientos;
    }

    public void setDetallesAsientos(List<DetalleAsiento> detallesAsientos) {
        this.detallesAsientos = detallesAsientos;
    }
    
}