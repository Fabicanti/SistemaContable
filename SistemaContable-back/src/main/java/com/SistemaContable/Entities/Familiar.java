package com.SistemaContable.Entities;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "familiares")
public class Familiar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellido;
    
    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaNacimiento;
    
    @Column(nullable = false)
    private String estadoCivil;
    
    @Column(nullable = false)
    private String paisResidencia;
    
    @Column(nullable = false)
    private boolean discapacidad;
    
    @Column(nullable = false)
    private double ingresos;
    
    @Column(nullable = false)
    private String relacion;
    
    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    @JsonIgnoreProperties({"recibos","familiares","empleador","id","salarioBasico"})
    private Empleado empleado;

    public Familiar(){
    }

    public Familiar(String nombre, String apellido, LocalDate fechaNacimiento, String estadoCivil, String paisResidencia, boolean discapacidad, double ingresos, String relacion, Empleado empleado){
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.estadoCivil = estadoCivil;
        this.paisResidencia = paisResidencia;
        this.discapacidad = discapacidad;
        this.ingresos = ingresos;
        this.relacion = relacion;
        this.empleado = empleado;
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

    public void setApellido(String apellido){
        this.apellido = apellido;
    }

    public String getApellido(){
        return apellido;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento){
        this.fechaNacimiento = fechaNacimiento;
    }

    public LocalDate getFechaNacimiento(){
        return fechaNacimiento;
    }

    public void setEstadoCivil(String estadoCivil){
        this.estadoCivil = estadoCivil;
    }

    public String getEstadoCivil(){
        return estadoCivil;
    }

    public void setPaisResidencia(String paisResidencia){
        this.paisResidencia = paisResidencia;
    }

    public String getPaisResidencia(){
        return paisResidencia;
    }

    public void setDiscapacidad(boolean discapacidad ){
        this.discapacidad = discapacidad;
    }

    public boolean getDiscapacidad(){
        return discapacidad;
    }

    public void setIngresos(double ingresos){
        this.ingresos = ingresos;
    }

    public double getIngresos(){
        return ingresos;
    }

    public void setRelacion(String relacion){
        this.relacion = relacion;
    }

    public String getRelacion(){
        return relacion;
    }

    public void setEmpleado(Empleado empleado){
        this.empleado = empleado;
    }

    public Empleado getEmpleado(){
        return empleado;
    }
}
