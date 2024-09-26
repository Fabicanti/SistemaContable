package com.SistemaContable.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
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
     * Se modifico el tipo de retorno de la función de Map<String, String> a ?
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
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
}