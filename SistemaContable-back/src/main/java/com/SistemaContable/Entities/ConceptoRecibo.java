package com.SistemaContable.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "conceptos_recibos")
public class ConceptoRecibo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recibo_id", nullable = false)
    @JsonIgnore
    private Recibo recibo;

    @ManyToOne
    @JoinColumn(name = "concepto_id", nullable = false)
    @JsonIgnoreProperties({"id","obligatorio"})
    private Concepto concepto;

    @Column(nullable = false)
    private double valorConcepto;

    public ConceptoRecibo(){}

    public ConceptoRecibo(Recibo recibo, Concepto concepto){
        this.recibo = recibo;
        this.concepto = concepto;
    }

    public ConceptoRecibo(Recibo recibo, Concepto concepto, double valorConcepto){
        this.recibo = recibo;
        this.concepto = concepto;
        this.valorConcepto = valorConcepto;
    }

    public Long getId(){
        return id;
    }

    public void setRecibo(Recibo recibo){
        this.recibo = recibo;
    }

    public Recibo getRecibo(){
        return recibo;
    }

    public void setConcepto(Concepto concepto){
        this.concepto = concepto;    
    }

    public Concepto getConcepto(){
        return concepto;
    }

    public void setValorConcepto(double valorConcepto){
        this.valorConcepto = valorConcepto;
    }

    public double getValorConcepto(){
        return valorConcepto;
    }

}
