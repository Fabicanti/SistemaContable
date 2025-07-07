package com.SistemaContable.Controllers;
import com.SistemaContable.DTO.PasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.SistemaContable.DTO.UsuarioDTO;
import com.SistemaContable.Entities.Usuario;
import com.SistemaContable.Services.UsuarioService;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Obtiene un usuario específico según su identificador único.
     * @param id identificador único del usuario que se desea obtener.
     * @return una respuesta HTTP con el objeto UsuarioDTO si el usuario es encontrado.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obtenerUsuario(@PathVariable Long id) {
        UsuarioDTO usuarioDTO =  usuarioService.buscarUsuarioById(id);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PostMapping("/registrar")
    public ResponseEntity<Map<String, String>> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws NoSuchAlgorithmException {
        Usuario user = usuarioService.registrarUsuario(usuarioDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente");
        response.put("userId", String.valueOf(user.getId()));
        return ResponseEntity.ok(response);
    }

    /**
     * Elimina un usuario.
     * @param usuarioDTO es el objeto del usuario que quiero eliminar.
     * @return el estado 204 si el usuario se eliminó, caso contrario será el estado 404: NOT FOUND.
     */
    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        usuarioService.eliminarUsuario(usuarioDTO);
        return ResponseEntity.noContent().build();
    }

    /**
     * Modifica los campos de un usuario registrado.
     * @param usuarioDTO es el objeto con los datos del usuario a modificar (si son distintos a los almacenados)
     * @return el estado 204 si el usuario se modificó, caso contrario será el estado 404: NOT FOUND
     */
    @PatchMapping("/modificar")
    public ResponseEntity<?> modificarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        if (usuarioService.actualizarUsuario(usuarioDTO)) {
            return ResponseEntity.noContent().build();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
    }

    /**
     * Modifica la contraseña de un usuario existente.
     * Válida que la contraseña anterior proporcionada coincida con la registrada
     * y, si es correcto, actualiza la contraseña por la nueva.
     *
     * @param passwordDTO contiene los datos necesarios para la validación y cambio de contraseña
     *                    (ID del usuario, contraseña actual, y nueva contraseña).
     */
    @PatchMapping("/modificarPassword")
    public ResponseEntity<Void> modificarPassword(@RequestBody PasswordDTO passwordDTO) {
        this.usuarioService.cambiarPassword(passwordDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
}