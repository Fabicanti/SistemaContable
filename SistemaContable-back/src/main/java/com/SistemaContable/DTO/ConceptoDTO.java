package com.SistemaContable.DTO;

public class ConceptoDTO {
    private Long id;
    private String nombre;
    private String tipo;
    private double porcentaje;
    private boolean obligatorio;

    public ConceptoDTO(){}

     public ConceptoDTO(Long id, String nombre, String tipo, boolean obligatorio){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.obligatorio = obligatorio;
    }

    public ConceptoDTO(Long id, String nombre, String tipo, double porcentaje, boolean obligatorio){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.porcentaje = porcentaje;
        this.obligatorio = obligatorio;
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
