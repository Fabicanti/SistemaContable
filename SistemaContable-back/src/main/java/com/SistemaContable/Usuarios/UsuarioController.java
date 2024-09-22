package com.SistemaContable.Usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioServices usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<Map<String, String>> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario user = usuarioService.registrarUsuario(usuarioDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente");
        response.put("userId", String.valueOf(user.getId()));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> autenticarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        boolean isAuthenticated = false;
        Map<String, String> response = new HashMap<>();
        try {
            isAuthenticated = usuarioService.validarUsuario(usuarioDTO.getUsername(), usuarioDTO.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        if (isAuthenticated){
            response.put("message", "Usuario autenticado exitosamente");
            response.put("username", usuarioDTO.getUsername());
            return ResponseEntity.ok(response);
        }else {
            response.put("error", "Credenciales incorrectas");
            return ResponseEntity.status(401).body(response);
        }

    }

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
    
}