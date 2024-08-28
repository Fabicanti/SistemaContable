package com.SistemaContable.Usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioServices usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario user = usuarioService.registrarUsuario(usuarioDTO);
        return ResponseEntity.ok("Usuario registrado exitosamente ID: " + user.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<String> autenticarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        boolean isAuthenticated = false;
        try {
            isAuthenticated = usuarioService.validarUsuario(usuarioDTO.getUsername(), usuarioDTO.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        if (isAuthenticated){
            return ResponseEntity.ok("Usuario autenticado exitosamente: " + usuarioDTO.getUsername());
        }else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

    }
}