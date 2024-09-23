package com.SistemaContable.DTO;
import java.util.Date;
import java.util.List;

public class AsientoDTO {
    private Long id;
    private Date fecha;
    private String descripcion;
    private Long usuarioId;
    private List<DetalleAsientoDTO> detalles;

    public AsientoDTO() {
    }

    public AsientoDTO(Date fecha, String descripcion, Long usuarioId, List<DetalleAsientoDTO> detalles) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.usuarioId = usuarioId;
        this.detalles = detalles;
    }

    public AsientoDTO(Long id, Date fecha, String descripcion, Long usuarioId, List<DetalleAsientoDTO> detalles) {
        this.id = id;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.usuarioId = usuarioId;
        this.detalles = detalles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public List<DetalleAsientoDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleAsientoDTO> detalles) {
        this.detalles = detalles;
    }
}

