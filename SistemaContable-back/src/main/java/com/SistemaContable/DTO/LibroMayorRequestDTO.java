package com.SistemaContable.DTO;

import java.time.LocalDate;

public class LibroMayorRequestDTO {

    private Long cuentaId;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;

    public LibroMayorRequestDTO() {
    }

    public LibroMayorRequestDTO(Long cuentaId, LocalDate fecha_inicio, LocalDate fecha_fin) {
        this.cuentaId = cuentaId;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    public Long getcuentaId() {
        return this.cuentaId;
    }
    public void setcuentaId(Long cuentaId) {
        this.cuentaId = cuentaId;
    }

    public LocalDate getFechaInicio() {
        return this.fecha_inicio;
    }

    public void setFechaInicio(LocalDate fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public LocalDate getFechaFin() {
        return this.fecha_fin;
    }

    public void setFechaFin(LocalDate fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

}

