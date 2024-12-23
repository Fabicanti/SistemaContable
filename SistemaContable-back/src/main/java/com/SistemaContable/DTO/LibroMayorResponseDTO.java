package com.SistemaContable.DTO;

import java.time.LocalDate;

public class LibroMayorResponseDTO {

    private LocalDate fecha;
    private String descripcion;
    private Double debe;
    private Double haber;
    private Double saldo;

    public LibroMayorResponseDTO() {
    }

    public LibroMayorResponseDTO(LocalDate fecha, String descripcion, Double debe, Double haber, Double saldo) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.debe = debe;
        this.haber = haber;
        this.saldo = saldo;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getDebe() {
        return debe;
    }

    public void setDebe(Double debe) {
        this.debe = debe;
    }

    public Double getHaber() {
        return haber;
    }

    public void setHaber(Double haber) {
        this.haber = haber;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

}
