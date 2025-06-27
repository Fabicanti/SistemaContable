package com.SistemaContable.Entities;
import jakarta.persistence.*;

@Entity
@Table(name = "conceptos")
public class Concepto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String tipo;
    
    @Column(nullable = false)
    private double porcentaje;

    @Column(nullable = false)
    private boolean obligatorio;

    public Concepto(){}

    public Concepto(String nombre, String tipo, boolean obligatorio){
        this.nombre = nombre;
        this.tipo = tipo;
        this.obligatorio = obligatorio;
    }

    public Concepto(String nombre, String tipo, double porcentaje, boolean obligatorio){
        this.nombre = nombre;
        this.tipo = tipo;
        this.porcentaje = porcentaje;
        this.obligatorio = obligatorio;
    }

    public Long getId(){
        return id;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getNombre(){
        return nombre;
    }

    public void setTipo(String tipo){
        this.tipo = tipo;
    }

    public String getTipo(){
        return tipo;
    }

    public void setPorcentaje(double porcentaje){
        this.porcentaje = porcentaje;
    }

    public double getPorcentaje(){
        return porcentaje;
    }

    public void setObligatorio(boolean condicion){
        this.obligatorio = condicion;
    }

    public boolean getObligatorio(){
        return obligatorio;
    }

}
