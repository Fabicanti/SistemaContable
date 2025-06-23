package com.SistemaContable.DTO;

import java.time.LocalDate;
import java.util.List;

public class AsientoResponseDto {
    private Long id;
    private LocalDate fecha;
    private String descripcion;
    private String usuarioName;
    private List<DetalleAsientoDTO> detalles;

    public AsientoResponseDto() {
    }

    public AsientoResponseDto(Long id, LocalDate fecha, String descripcion, String usuarioName, List<DetalleAsientoDTO> detalles) {
        this.id = id;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.usuarioName = usuarioName;
        this.detalles = detalles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUsuarioName() {
        return usuarioName;
    }

    public void setUsuarioName(String usuarioName) {
        this.usuarioName = usuarioName;
    }

    public List<DetalleAsientoDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleAsientoDTO> detalles) {
        this.detalles = detalles;
    }
}
