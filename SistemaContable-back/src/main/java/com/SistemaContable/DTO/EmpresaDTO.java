package com.SistemaContable.DTO;

public class EmpresaDTO {
    private Long id;
    private String razonSocial;
    private String cuit;
    private String domicilio;

    public EmpresaDTO(){}

    public EmpresaDTO(Long id, String razonSocial, String cuit, String domicilio){
        this.id = id;
        this.razonSocial = razonSocial;
        this.cuit = cuit;
        this.domicilio = domicilio;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setRazonSocial(String razonSocial){
        this.razonSocial = razonSocial;
    }

    public String getRazonSocial(){
        return razonSocial;
    }

    public void setCuit(String cuit){
        this.cuit = cuit;
    }

    public String getCuit(){
        return cuit;
    }

    public void setDomicilio(String domicilio){
        this.domicilio = domicilio;
    }

    public String getDomicilio(){
        return domicilio;
    }

}
