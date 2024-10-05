package com.SistemaContable.DTO;

public class DashboardDTO {
    private Long cantidadTotalUsuarios;
    private Long cantidadMovimientos;

    public DashboardDTO() {
    }

    public DashboardDTO(Long cantidadTotalUsuarios) {
        this.cantidadTotalUsuarios = cantidadTotalUsuarios;
    }

    public Long getCantidadTotalUsuarios() {
        return cantidadTotalUsuarios;
    }

    public void setCantidadTotalUsuarios(Long cantidadTotalUsuarios) {
        this.cantidadTotalUsuarios = cantidadTotalUsuarios;
    }

    public Long getCantidadMovimientos() {
        return cantidadMovimientos;
    }

    public void setCantidadMovimientos(Long cantidadMovimientos) {
        this.cantidadMovimientos = cantidadMovimientos;
    }
}
