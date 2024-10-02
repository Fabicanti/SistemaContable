package com.SistemaContable.Services;

import com.SistemaContable.DTO.UsuarioDTO;
import com.SistemaContable.Entities.*;
import com.SistemaContable.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;

    // Método para registrar un nuevo usuario
    public Usuario registrarUsuario(UsuarioDTO usuarioDTO) throws NoSuchAlgorithmException {
        // Mapeo de DTO a entidad
        Usuario usuario = new Usuario();
        usuario.setUsername(usuarioDTO.getUsername());
        usuario.setPasswordHash(encryptPassword(usuarioDTO.getPassword()));
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());
        usuario.setEmail(usuarioDTO.getEmail());

        Rol rol = rolRepository.findById(usuarioDTO.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));
        usuario.setRole(rol); // Asignar el Rol al usuario

        // Guardar en la base de datos
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        mapToDTO(nuevoUsuario);
        // Mapeo de la entidad guardada a DTO
        return nuevoUsuario;
    }

    public boolean eliminarUsuario(UsuarioDTO usuarioDTO) {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(usuarioDTO.getUsername());
        if (usuario.isPresent()) {
            usuarioRepository.deleteById(usuario.get().getId());
            return true;
        } else {
            return false;
        }
    }

    // Método para autenticar un usuario
    public boolean autenticarUsuario(String username, String password) throws NoSuchAlgorithmException {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(username);
        if (usuario.isPresent()) {
            String passwordHash = encryptPassword(password);
            return passwordHash.equals(usuario.get().getPasswordHash());
        }
        return false;
    }

    // Obtener todos los usuarios
    public List<UsuarioDTO> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Mapeo de entidad a DTO
    private UsuarioDTO mapToDTO(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId()); // Ahora tiene el ID generado
        usuarioDTO.setUsername(usuario.getUsername());
        usuarioDTO.setRoleId(usuario.getRole().getId());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setApellido(usuario.getApellido());
        usuarioDTO.setEmail(usuario.getEmail());
        return usuarioDTO;
    }

    // Encriptar la contraseña con SHA-256
    private String encryptPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1)
                hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    /**
     * Busco el usuario por su username, reutilice en método 'mapToDTO'
     * @param usuarioDTO es objeto que me envía el login
     * @return Todos los datos el usuario buscado.
     */
    public UsuarioDTO buscarUsuario(UsuarioDTO usuarioDTO){
        Optional<Usuario> usuario = usuarioRepository.findByUsername(usuarioDTO.getUsername());
        return this.mapToDTO(usuario.get());
    }

    /**
     * Actualiza los datos del usuario
     * @param usuarioDTO es objeto que me envía la página Users.
     * @return True si se actualizó los datos, False si el usuario no fue encontrado
     */
    public boolean actualizarUsuario(UsuarioDTO usuarioDTO) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioDTO.getId());
        if (usuario.isPresent()) {
            if (usuarioDTO.getNombre() != null) {
                usuario.get().setNombre(usuarioDTO.getNombre());
            }
            if (usuarioDTO.getApellido() != null) {
                usuario.get().setApellido(usuarioDTO.getApellido());
            }
            if (usuarioDTO.getEmail() != null) {
                usuario.get().setEmail(usuarioDTO.getEmail());
            }
            if (usuarioDTO.getUsername() != null) {
                usuario.get().setUsername(usuarioDTO.getUsername());
            }
            if (! usuarioDTO.getRoleId().equals(usuario.get().getRole().getId())) {
                Rol rol = rolRepository.findById(usuarioDTO.getRoleId())
                        .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));
                usuario.get().setRole(rol);
            }
            usuarioRepository.save(usuario.get());
            return true;
        }
        return false;
    }

}
