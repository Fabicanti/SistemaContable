package com.SistemaContable.Entities;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;  // "USER" o "SUPERUSER"

    @OneToMany(mappedBy = "rol")
    private List<Usuario> usuarios;

    public Rol() {
    }

    public Rol(String nombre, List<Usuario> usuarios) {
        this.nombre = nombre;
        this.usuarios = usuarios;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }
    
}
