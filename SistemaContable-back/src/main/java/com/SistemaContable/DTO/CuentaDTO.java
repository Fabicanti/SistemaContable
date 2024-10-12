package com.SistemaContable.DTO;
import java.util.List;

public class CuentaDTO {
    private Long id;
    private String nombre;
    private String codigoCuenta;
    private double saldo;
    private Long tipoCuentaId;
    private String tipoCuentaNombre;
    private Long cuentaPadreId;
    private List<Long> subCuentasIds;

    public CuentaDTO() {
    }

    public CuentaDTO(Long id, String nombre, String codigoCuenta, double saldo, Long tipoCuentaId, String tipoCuentaNombre, Long cuentaPadreId, List<Long> subCuentasIds) {
        this.id = id;
        this.nombre = nombre;
        this.codigoCuenta = codigoCuenta;
        this.saldo = saldo;
        this.tipoCuentaId = tipoCuentaId;
        this.tipoCuentaNombre = tipoCuentaNombre;
        this.cuentaPadreId = cuentaPadreId;
        this.subCuentasIds = subCuentasIds;
    }
 
    public CuentaDTO(String nombre, String codigoCuenta, double saldo, Long tipoCuentaId, String tipoCuentaNombre, Long cuentaPadreId, List<Long> subCuentasIds) {
        this.nombre = nombre;
        this.codigoCuenta = codigoCuenta;
        this.saldo = saldo;
        this.tipoCuentaId = tipoCuentaId;
        this.tipoCuentaNombre = tipoCuentaNombre;
        this.cuentaPadreId = cuentaPadreId;
        this.subCuentasIds = subCuentasIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigoCuenta() {
        return codigoCuenta;
    }

    public void setCodigoCuenta(String codigoCuenta) {
        this.codigoCuenta = codigoCuenta;
    }

    public double getSaldo(){
        return saldo;
    }

    public void setSaldo(double saldo){
        this.saldo = saldo;
    }

    public Long getTipoCuentaId() {
        return tipoCuentaId;
    }

    public void setTipoCuentaId(Long tipoCuentaId) {
        this.tipoCuentaId = tipoCuentaId;
    }

    public String getTipoCuentaNombre() {
        return tipoCuentaNombre;
    }

    public void setTipoCuentaNombre(String tipoCuentaNombre) {
        this.tipoCuentaNombre = tipoCuentaNombre;
    }

    public Long getCuentaPadreId() {
        return cuentaPadreId;
    }

    public void setCuentaPadreId(Long cuentaPadreId) {
        this.cuentaPadreId = cuentaPadreId;
    }

    public List<Long> getSubCuentasIds() {
        return subCuentasIds;
    }

    public void setSubCuentasIds(List<Long> subCuentasIds) {
        this.subCuentasIds = subCuentasIds;
    }
}

