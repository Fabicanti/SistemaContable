package com.SistemaContable.DTO;

import java.time.LocalDate;

public class FamiliarDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    private String estadoCivil;
    private String paisResidencia;
    private boolean discapacidad;
    private double ingresos;
    private String relacion;
    private Long empleadoId;

    public FamiliarDTO(){
    }

    public FamiliarDTO(Long id, String nombre, String apellido, LocalDate fechaNacimiento, String estadoCivil, String paisResidencia, boolean discapacidad, double ingresos, String relacion, Long empleadoId){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.estadoCivil = estadoCivil;
        this.paisResidencia = paisResidencia;
        this.discapacidad = discapacidad;
        this.ingresos = ingresos;
        this.relacion = relacion;
        this.empleadoId = empleadoId;
    }

    public void setId(Long id){
        this.id = id;
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

    public void setEmpleadoId(Long empleadoId){
        this.empleadoId = empleadoId;
    }

    public Long getEmpleadoId(){
        return empleadoId;
    }

}
