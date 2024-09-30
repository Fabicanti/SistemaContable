package com.SistemaContable.Controllers;
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


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<Map<String, String>> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws NoSuchAlgorithmException {
        Usuario user = usuarioService.registrarUsuario(usuarioDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente");
        response.put("userId", String.valueOf(user.getId()));
        return ResponseEntity.ok(response);
    }

    /**
     * Se modifícó el tipo de retorno de la función de Map<String, String> a <?>
     * @param usuarioDTO
     * @return Retorna los datos de usuario logeado si la autenticación es exitosa, caso contrario será un estado HTTP 403: Unauthorized.
     */
    @PostMapping("/login")
    public ResponseEntity<?> autenticarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        boolean isAuthenticated = false;
        Map<String, String> response = new HashMap<>();
        try {
            isAuthenticated = usuarioService.autenticarUsuario(usuarioDTO.getUsername(), usuarioDTO.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        if (isAuthenticated){
            UsuarioDTO usuario = usuarioService.buscarUsuario(usuarioDTO);
            response.put("message", "Usuario autenticado exitosamente");
            return ResponseEntity.ok(usuario);
        }else {
            response.put("error", "Credenciales incorrectas");
            return ResponseEntity.status(401).body(response);
        }
    }
    
    /**
     * Elimina un usuario.
     * @param usuarioDTO es el objeto del usuario que quiero eliminar.
     * @return el estado 204 si el usuario se eliminó, caso contrario será el estado 404: NOT FOUND.
     */
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        if (usuarioService.eliminarUsuario(usuarioDTO)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
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
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
}