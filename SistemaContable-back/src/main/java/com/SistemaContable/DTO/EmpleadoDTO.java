package com.SistemaContable.DTO;

import java.time.LocalDate;
import java.util.List;

public class EmpleadoDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    private String cuil;
    private Long legajo;
    private String puesto;
    private String departamento;
    private LocalDate fechaIngreso;
    private double salarioBasico;
    private Long empleadorId;
    private List<FamiliarDTO> familiares;
    private List<ReciboDTO> recibos;

    public EmpleadoDTO(){
    }

    public EmpleadoDTO(Long id, String nombre, String apellido, LocalDate fechaNacimiento, String cuil, Long legajo, String puesto, String departamento, LocalDate fechaIngreso, double salarioBasico){
        this.id = id;
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

    public EmpleadoDTO(Long id, String nombre, String apellido, LocalDate fechaNacimiento, String cuil, Long legajo, String puesto, String departamento, LocalDate fechaIngreso, double salarioBasico, Long empleadorId){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.cuil = cuil;
        this.legajo = legajo;
        this.puesto = puesto;
        this.departamento = departamento;
        this.fechaIngreso = fechaIngreso;
        this.salarioBasico = salarioBasico;
        this.empleadorId = empleadorId;
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

    public void setEmpleadorId(Long empleadorId){
        this.empleadorId = empleadorId;
    }

    public Long getEmpleadorId(){
        return empleadorId;
    }

    public void setFamiliar(FamiliarDTO familiarDTO){
        familiares.add(familiarDTO);
    }

    public void setFamiliares(List<FamiliarDTO> familiares){
        this.familiares = familiares;
    }

    public List<FamiliarDTO> getFamiliares(){
        return familiares;
    }

    public void setRecibo(ReciboDTO reciboDTO){
        recibos.add(reciboDTO);
    }

    public void setRecibos(List<ReciboDTO> recibos){
        this.recibos = recibos;
    }

    public List<ReciboDTO> getRecibos(){
        return recibos;
    }

}
