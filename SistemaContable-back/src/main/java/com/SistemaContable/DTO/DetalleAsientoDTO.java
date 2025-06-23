package com.SistemaContable.DTO;


public class DetalleAsientoDTO {
    private Long id;
    private Long cuentaId;
    private String nombreCuenta;
    private double debe;
    private double haber;

    public DetalleAsientoDTO() {
    }

    public DetalleAsientoDTO(Long id, Long cuentaId, String nombreCuenta, double debe, double haber) {
        this.id = id;
        this.cuentaId = cuentaId;
        this.nombreCuenta = nombreCuenta;
        this.debe = debe;
        this.haber = haber;
    }

    public String getNombreCuenta() {
        return nombreCuenta;
    }

    public void setNombreCuenta(String nombreCuenta) {
        this.nombreCuenta = nombreCuenta;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCuentaId() {
        return cuentaId;
    }

    public void setCuentaId(Long cuentaId) {
        this.cuentaId = cuentaId;
    }

    public double getDebe() {
        return debe;
    }

    public void setDebe(double debe) {
        this.debe = debe;
    }

    public double getHaber() {
        return haber;
    }

    public void setHaber(double haber) {
        this.haber = haber;
    }
}
