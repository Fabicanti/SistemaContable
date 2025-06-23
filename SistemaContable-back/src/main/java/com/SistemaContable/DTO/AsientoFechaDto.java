package com.SistemaContable.DTO;

import java.time.LocalDate;

public class AsientoFechaDto {
    private LocalDate desde;
    private LocalDate hasta;

    public AsientoFechaDto() {
    }

    public AsientoFechaDto(LocalDate desde, LocalDate hasta) {
        this.desde = desde;
        this.hasta = hasta;
    }

    public LocalDate getDesde() {
        return desde;
    }

    public void setDesde(LocalDate desde) {
        this.desde = desde;
    }

    public LocalDate getHasta() {
        return hasta;
    }

    public void setHasta(LocalDate hasta) {
        this.hasta = hasta;
    }
}
