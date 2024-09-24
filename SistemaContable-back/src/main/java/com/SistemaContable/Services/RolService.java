package com.SistemaContable.Services;

import com.SistemaContable.DTO.RolDTO;
import com.SistemaContable.Entities.Rol;
import com.SistemaContable.Repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public Rol registrarRol(RolDTO rolDTO) {
        Rol rol = new Rol();
        rol.setNombre(rolDTO.getNombre());
        return rolRepository.save(rol);
    }

    // Método para obtener todos los roles
    public List<Rol> obtenerTodosLosRoles() {
        return rolRepository.findAll();
    }

    // Método para obtener un rol por ID
    public Rol obtenerRolPorId(Long id) {
        return rolRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));
    }

    // Método para actualizar un rol
    public Rol actualizarRol(Long id, RolDTO rolDTO) {
        Rol rol = obtenerRolPorId(id);
        rol.setNombre(rolDTO.getNombre());
        return rolRepository.save(rol);
    }

    // Método para eliminar un rol
    public void eliminarRol(Long id) {
        Rol rol = obtenerRolPorId(id);
        rolRepository.delete(rol);
    }
}
