package com.SistemaContable.DTO;

public class DashboardDTO {
    private Long cantidadTotalUsuarios;
    private Long cantidadMovimientos;
    private Long cantidadAsientos;

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

    public Long getCantidadAsientos() {
        return cantidadAsientos;
    }

    public void setCantidadAsientos(Long cantidadAsientos) {
        this.cantidadAsientos = cantidadAsientos;
    }

    public Long getCantidadMovimientos() {
        return cantidadMovimientos;
    }

    public void setCantidadMovimientos(Long cantidadMovimientos) {
        this.cantidadMovimientos = cantidadMovimientos;
    }
}
