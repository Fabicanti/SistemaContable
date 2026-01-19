package com.SistemaContable.Controllers;

import com.SistemaContable.Authentication.util.JwtUtils;
import com.SistemaContable.DTO.LoginDTO;
import com.SistemaContable.DTO.UsuarioDTO;
import com.SistemaContable.Services.Auth.UserDetailsImpl;
import com.SistemaContable.Services.UsuarioService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authManager;
    private final UsuarioService usuarioService;

    public AuthController(AuthenticationManager authManager, UsuarioService usuarioService) {
        this.authManager = authManager;
        this.usuarioService = usuarioService;
    }

    /**
     * Auténtica a un usuario basándose en las credenciales proporcionadas, genera un token JWT
     * tras una autenticación exitosa, y adjunta el token como una cookie segura en la respuesta HTTP.
     *
     * @param request las credenciales de inicio de sesión proporcionadas por el usuario,
     *               incluyendo nombre de usuario y contraseña.
     * @param response la respuesta HTTP a la que se añadirá el token JWT generado como una cookie segura.
     * @return una ResponseEntity que contiene el token JWT generado como texto sin formato.
     * El token también se añade a la respuesta como una cookie segura.
     */
    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@RequestBody LoginDTO request, HttpServletResponse response) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        Long userId = userDetails.getId();

        String token = JwtUtils.generateToken(userId);
        JwtUtils.addTokenToCookie(response, token);

        UsuarioDTO usuario = usuarioService.buscarUsuarioById(userId);
        return ResponseEntity.ok(usuario);
    }

    /**
     * Punto de conexión para recuperar los detalles del usuario autenticado. Si el usuario no está autenticado,
     * devuelve un estado 401 No autorizado.
     *
     * @param userDetails los detalles del usuario autenticado, proporcionados por el contexto de Spring Security.
     * @return una ResponseEntity que contiene los detalles del usuario si está autenticado, o un estado 401 No autorizado en caso contrario.
     */
    @GetMapping("/me")
    public ResponseEntity<UsuarioDTO> me(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        Long userId = userDetails.getId();
        UsuarioDTO usuario = usuarioService.buscarUsuarioById(userId);
        return ResponseEntity.ok(usuario);
    }

    /**
     * Cierra la sesión del usuario borrando el token JWT de la respuesta HTTP.
     * Esto se logra eliminando la cookie segura que contiene el token.
     *
     * @param response: la respuesta HttpServletResponse utilizada para borrar el token eliminando la cookie asociada.
     */
    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        JwtUtils.clearToken(response);
    }
}
