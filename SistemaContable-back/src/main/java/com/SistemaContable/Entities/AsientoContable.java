package com.SistemaContable.Entities;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "asientos_contables")
public class AsientoContable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date fecha;

    @Column(nullable = false)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"passwordHash", "role", "asientos"})
    private Usuario usuario;
    
    @OneToMany(mappedBy = "asientoContable", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DetalleAsiento> detalles;

    public AsientoContable() {
    }
    public AsientoContable(Date fecha, String descripcion, Usuario usuario) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
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
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    public List<DetalleAsiento> getDetalles() {
        return detalles;
    }
    public void setDetalles(List<DetalleAsiento> detalles) {
        this.detalles = detalles;
    }
}
