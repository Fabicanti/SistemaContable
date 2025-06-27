package com.SistemaContable.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "empresas")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String razonSocial;
    
    @Column(nullable = false, unique = true)
    private String cuit;
    
    @Column(nullable = false)
    private String domicilio;

    public Empresa(){}

    public Empresa(String razonSocial, String cuit, String domicilio){
        this.razonSocial = razonSocial;
        this.cuit = cuit;
        this.domicilio = domicilio;
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
