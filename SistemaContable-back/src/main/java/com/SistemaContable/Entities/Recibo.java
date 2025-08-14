package com.SistemaContable.Entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "recibos")
public class Recibo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaDeposito;
    
    @Column(nullable = false)
    private String mesPago;
    
    @Column(nullable = false)
    private String periodoPago;
    
    @Column(nullable = false)
    private String banco;

    @Column(nullable = false)
    private double sueldoBase;
    
    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    @JsonIgnoreProperties("id")
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    @JsonIgnoreProperties({"familiares", "recibos", "empleador","id","fechaNacimiento"})
    private Empleado empleado;
    
    @ManyToOne
    @JoinColumn(name = "empleador_id", nullable = false)
    @JsonIgnoreProperties({"familiares", "recibos","empleador","fechaNacimiento","id","fechaIngreso"})
    private Empleado empleador;
    
    @OneToMany(mappedBy = "recibo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JsonIgnoreProperties("id")
    private List<ConceptoRecibo> conceptosRecibos = new ArrayList<>();

    @Column(nullable = false)
    private double totalGravadas;

    @Column(nullable = false)
    private double totalExentas;

    @Column(nullable = false)
    private double totalDescuentos;

    @Column(nullable = false)
    private double totalNeto;

    public Recibo(){}

    public Long getId(){
        return id;
    }

    public void setEmpleado(Empleado empleado){
        this.empleado = empleado;
    }

    public Empleado getEmpleado(){
        return empleado;
    }

    public void setEmpleador(Empleado empleador){
        this.empleador = empleador;
    }

    public Empleado getEmpleador(){
        return empleador;
    }

    public void setEmpresa(Empresa empresa){
        this.empresa = empresa;
    }

    public Empresa getEmpresa(){
        return empresa;
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

    public void setSueldoBase(double sueldoBase){
        this.sueldoBase = sueldoBase;
    }

    public double getSueldoBase(){
        return sueldoBase;
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

    public void setConceptosRecibos(List<ConceptoRecibo> conceptosRecibos){
        this.conceptosRecibos = conceptosRecibos;
    }

    public void setConceptoRecibo(ConceptoRecibo conceptoRecibo){
        conceptosRecibos.add(conceptoRecibo);
    }

    public List<ConceptoRecibo> getConceptosRecibos(){
        return conceptosRecibos;
    }
}
