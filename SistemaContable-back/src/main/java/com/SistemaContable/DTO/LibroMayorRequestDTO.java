package com.SistemaContable.DTO;

import java.time.LocalDate;

public class LibroMayorRequestDTO {

    private Long cuentaId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    public LibroMayorRequestDTO() {
    }

    public LibroMayorRequestDTO(Long cuentaId, LocalDate fechaInicio, LocalDate fechaFin) {
        this.cuentaId = cuentaId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public Long getcuentaId() {
        return this.cuentaId;
    }
    public void setcuentaId(Long cuentaId) {
        this.cuentaId = cuentaId;
    }

    public LocalDate getFechaInicio() {
        return this.fechaInicio;
    }

    public void setFechaInicio(LocalDate fecha_inicio) {
        this.fechaInicio = fecha_inicio;
    }

    public LocalDate getFechaFin() {
        return this.fechaFin;
    }

    public void setFechaFin(LocalDate fecha_fin) {
        this.fechaFin = fecha_fin;
    }

}

