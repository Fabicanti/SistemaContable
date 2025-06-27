package com.SistemaContable.Entities;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "empleados")
public class Empleado {

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

    @Column(nullable = false, unique = true)
    private String cuil;
    
    @Column(nullable = false, unique = true)
    private Long legajo;
    
    @Column(nullable = false)
    private String puesto;
    
    @Column(nullable = false)
    private String departamento;
    
    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaIngreso;
    
    @Column(nullable = false)
    private double salarioBasico;
    
    @ManyToOne
    @JoinColumn(name = "empleador_id")
    @JsonIgnoreProperties({"familiares", "recibos","empleador","salarioBasico","fechaNacimiento","id"})
    private Empleado empleador;
    
    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnoreProperties({"empleado","id"})
    private List<Familiar> familiares;
    
    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnoreProperties({"empresa","empleado","empleador"})
    private List<Recibo> recibos;

    public Empleado(){
    }

    public Empleado(String nombre, String apellido, LocalDate fechaNacimiento, String cuil, Long legajo, String puesto, String departamento, LocalDate fechaIngreso, double salarioBasico){
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.cuil = cuil;
        this.legajo = legajo;
        this.puesto = puesto;
        this.departamento = departamento;
        this.fechaIngreso = fechaIngreso;
        this.salarioBasico = salarioBasico;
    }

    public Empleado(String nombre, String apellido, LocalDate fechaNacimiento, String cuil, Long legajo, String puesto, String departamento, LocalDate fechaIngreso, double salarioBasico, Empleado empleador){
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.cuil = cuil;
        this.legajo = legajo;
        this.puesto = puesto;
        this.departamento = departamento;
        this.fechaIngreso = fechaIngreso;
        this.salarioBasico = salarioBasico;
        this.empleador = empleador;
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

    public void setCuil(String cuil){
        this.cuil = cuil;
    }

    public String getCuil(){
        return cuil;
    }

    public void setLegajo(Long legajo){
        this.legajo = legajo;
    }

    public Long getLegajo(){
        return legajo;
    }

    public void setPuesto(String puesto){
        this.puesto = puesto;
        
    }

    public String getPuesto(){
        return puesto;
    }

    public void setDepartamento(String departamento){
        this.departamento = departamento;
    }

    public String getDepartamento(){
        return departamento;
    }

    public void setFechaIngreso(LocalDate fechaIngreso){
        this.fechaIngreso = fechaIngreso;
    }

    public LocalDate getFechaIngreso(){
        return fechaIngreso;
    }

    public void setSalarioBasico(double salarioBasico){
        this.salarioBasico = salarioBasico;
    }

    public double getSalarioBasico(){
        return salarioBasico;
    }

    public void setEmpleador(Empleado empleador){
        this.empleador = empleador;
    }

    public Empleado getEmpleador(){
        return empleador;
    }

    public void setFamiliar(Familiar familiar){
        familiares.add(familiar);
    }

    public void setFamiliares(List<Familiar> familiares){
        this.familiares = familiares;
    }

    public List<Familiar> getFamiliares(){
        return familiares;
    }

    public void setRecibo(Recibo recibo){
        recibos.add(recibo);
    }

    public void setRecibos(List<Recibo> recibos){
        this.recibos = recibos;
    }

    public List<Recibo> getRecibos(){
        return recibos;
    }

}
