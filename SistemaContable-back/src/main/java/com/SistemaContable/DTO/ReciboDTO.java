package com.SistemaContable.DTO;

import java.time.LocalDate;
import java.util.List;

public class ReciboDTO {
    private Long id;
    private LocalDate fechaDeposito;
    private String mesPago; // Mes/Año
    private String periodoPago; // Nombre del mes
    private String banco;
    private double totalGravadas;
    private double totalExentas;
    private double totalDescuentos;
    private double totalNeto;
    private Long empresaId;
    private Long empleadoId;
    private String empleadorNombre;
    private List<ConceptoReciboDTO> conceptosRecibos;
    //Se necesita una lista con los id's de los conceptos opcionales que se quieran calcular.
    private List<Integer> conceptosId;

    public ReciboDTO(){}

    public ReciboDTO(Long empleadoId, Long empresaId, LocalDate fechaDeposito, String banco){
        this.empleadoId = empleadoId;
        this.empresaId = empresaId;
        this.fechaDeposito = fechaDeposito;
        this.banco = banco;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setEmpleadoId(Long empleadoId){
        this.empleadoId = empleadoId;
    }

    public Long getEmpleadoId(){
        return empleadoId;
    }

    public void setEmpleadorNombre(String empleadorNombre){
        this.empleadorNombre = empleadorNombre;
    }

    public String getEmpleadorNombre(){
        return empleadorNombre;
    }

    public void setEmpresaId(Long empresaId){
        this.empresaId = empresaId;
    }

    public Long getEmpresaId(){
        return empresaId;
    }

    public void setFechaDeposito(LocalDate fechaDeposito){
        this.fechaDeposito = fechaDeposito;
    }

    public LocalDate getFechaDeposito(){
        return fechaDeposito;
    }

    public void setMesPago(String mesPago){
        this.mesPago = mesPago;
    }

    public String getMesPago(){
        return mesPago;
    }

    public void setPeriodoPago(String periodoPago){
        this.periodoPago = periodoPago;
    }

    public String getPeriodoPago(){
        return periodoPago;
    }

    public void setBanco(String banco){
        this.banco = banco;
    }

    public String getBanco(){
        return banco;
    }

    public void setTotalGravadas(double totalGravadas){
        this.totalGravadas = totalGravadas;
    }

    public double getTotalGravadas(){
        return totalGravadas;
    }

    public void setTotalExentas(double totalExentas){
        this.totalExentas = totalExentas;
    }

    public double getTotalExentas(){
        return totalExentas;
    }

    public void setTotalDescuentos(double totalDescuentos){
        this.totalDescuentos = totalDescuentos;
    }

    public double getTotalDescuentos(){
        return totalDescuentos;
    }

    public void setTotalNeto(double totalNeto){
        this.totalNeto = totalNeto;
    }

    public double getTotalNeto(){
        return totalNeto;
    }

    public void setConceptosRecibos(List<ConceptoReciboDTO> conceptosRecibos){
        this.conceptosRecibos = conceptosRecibos;
    }

    public void setConceptoRecibo(ConceptoReciboDTO conceptoRecibo){
        conceptosRecibos.add(conceptoRecibo);
    }

    public List<ConceptoReciboDTO> getConceptosRecibos(){
        return conceptosRecibos;
    }

    public List<Integer> getConceptosId(){
        return conceptosId;
    }
}

    
