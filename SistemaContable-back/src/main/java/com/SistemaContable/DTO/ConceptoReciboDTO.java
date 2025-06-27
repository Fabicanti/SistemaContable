package com.SistemaContable.DTO;

public class ConceptoReciboDTO {
    private Long id;
    private Long reciboId;
    private Long conceptoId;
    private double valorConcepto;

    public ConceptoReciboDTO(){}

    public ConceptoReciboDTO(Long id, Long reciboId, Long conceptoId){
        this.id = id;
        this.reciboId = reciboId;
        this.conceptoId = conceptoId;
    }

    public ConceptoReciboDTO(Long id, Long reciboId, Long conceptoId, double valorConcepto){
        this.id = id;
        this.reciboId = reciboId;
        this.conceptoId = conceptoId;
        this.valorConcepto = valorConcepto;
    }

    public ConceptoReciboDTO(Long reciboId, Long conceptoId, double valorConcepto){
        this.reciboId = reciboId;
        this.conceptoId = conceptoId;
        this.valorConcepto = valorConcepto;
    }

     public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setReciboId(Long reciboId){
        this.reciboId = reciboId;
    }

    public Long getReciboId(){
        return reciboId;
    }

    public void setConceptoId(Long conceptoId){
        this.conceptoId = conceptoId;    
    }

    public Long getConceptoId(){
        return conceptoId;
    }

    public void setValorConcepto(double valorConcepto){
        this.valorConcepto = valorConcepto;
    }

    public double getValorConcepto(){
        return valorConcepto;
    }

}
