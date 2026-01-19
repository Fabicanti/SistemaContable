package com.SistemaContable.Authentication.oauth;

import com.SistemaContable.Entities.Usuario;
import com.SistemaContable.Repositories.UsuarioRepository;
import com.SistemaContable.Repositories.RolRepository;
import com.SistemaContable.Services.Auth.UserDetailsImpl;
import com.SistemaContable.Authentication.util.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.util.Arrays;

public record CustomOAuth2SuccessHandler(UsuarioRepository usuarioRepository, RolRepository rolRepository,
                                         PasswordEncoder passwordEncoder) implements AuthenticationSuccessHandler {

    /**
     * Gestiona la autenticación OAuth2 exitosa de un usuario. Según el proveedor OAuth2 (p. ej., GitHub o Google),
     * el método recupera la información del usuario, la procesa y autentica a un usuario existente o registra uno nuevo.
     * Genera un token JWT para el usuario autenticado y lo agrega a las cookies de respuesta. Finalmente, redirige al usuario
     * a la aplicación cliente.
     *
     * @param request la solicitud HTTP del servlet que contiene los detalles de la solicitud de autenticación.
     * @param response la respuesta HTTP del servlet utilizada para enviar la respuesta al cliente.
     * @param authentication el objeto de autenticación que contiene información sobre el usuario autenticado correctamente.
     * @throws IOException si se produce un error de entrada/salida al procesar la solicitud o la respuesta.
     * @throws ServletException si se produce un error al invocar el despachador de solicitudes.
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        String registrationId = oauthToken.getAuthorizedClientRegistrationId(); // "github" o "google"

        Usuario usuario;

        if ("github".equals(registrationId)) {
            usuario = handleGithub(oauthUser);
        } else if ("google".equals(registrationId)) {
            usuario = handleGoogle(oauthUser);
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Proveedor OAuth2 no soportado");
            return;
        }

        UserDetailsImpl userDetails = new UserDetailsImpl(usuario);
        Long userId = userDetails.getId();

        String token = JwtUtils.generateToken(userId);
        JwtUtils.addTokenToCookie(response, token);

        response.sendRedirect("http://localhost:3000/");
    }


    /**
     * Gestiona la autenticación de un usuario mediante GitHub. Si el usuario no existe en el sistema,
     * registra uno nuevo utilizando los datos proporcionados por el usuario OAuth2 de GitHub.
     *
     * @param oauthUser el objeto de usuario OAuth2 que contiene la información del usuario obtenida de GitHub
     * @return una instancia de {@code Usuario} que representa al usuario autenticado o recién registrado
     * @throws RuntimeException si los datos del usuario de GitHub no contienen un atributo "login"
     */
    private Usuario handleGithub(OAuth2User oauthUser) {
        String githubLogin = oauthUser.getAttribute("login");

        if (githubLogin == null) {
            throw new RuntimeException("GitHub no devolvió login");
        }

        return usuarioRepository.findByUsernameWithRole(githubLogin)
                .orElseGet(() -> registrarUsuarioGithub(oauthUser));
    }

    private Usuario registrarUsuarioGithub(OAuth2User oauthUser) {
        String githubLogin = oauthUser.getAttribute("login");
        String fullName = oauthUser.getAttribute("name");
        String email = oauthUser.getAttribute("email");

        String nombre = githubLogin;
        String apellido = "";

        if (fullName != null && !fullName.isBlank()) {
            String[] parts = fullName.trim().split("\\s+");

            if (parts.length == 1) {
                nombre = parts[0];
            } else {
                apellido = parts[parts.length - 1];
                nombre = String.join(" ", Arrays.copyOf(parts, parts.length - 1));
            }
        }

        Usuario u = new Usuario();
        u.setUsername(githubLogin);
        u.setNombre(nombre);
        u.setApellido(apellido);
        u.setEmail(email != null ? email : githubLogin + "@github.local");
        u.setPasswordHash(passwordEncoder.encode("1234"));
        u.setRole(rolRepository.findById(3L).orElseThrow());
        return usuarioRepository.save(u);
    }

    /**
     * Gestiona la autenticación de un usuario mediante Google OAuth2. Si el usuario no existe
     * en el sistema, se registrará un nuevo usuario utilizando la información proporcionada por el usuario de Google OAuth2.
     *
     * @param oauthUser el objeto OAuth2User que contiene la información del usuario obtenida de Google
     * @return una instancia de {@code Usuario} que representa al usuario autenticado o recién registrado
     * @throws RuntimeException si el usuario de Google OAuth2 no contiene un atributo "email"
     */
    private Usuario handleGoogle(OAuth2User oauthUser) {
        String email = oauthUser.getAttribute("email");

        if (email == null || email.isBlank()) {
            throw new RuntimeException("Google no devolvió email");
        }

        return usuarioRepository.findByUsernameWithRole(email)
                .orElseGet(() -> registrarUsuarioGoogle(oauthUser));
    }

    private Usuario registrarUsuarioGoogle(OAuth2User oauthUser) {
        String email = oauthUser.getAttribute("email");
        String fullName = oauthUser.getAttribute("name");        // "Nombre Apellido"
        String givenName = oauthUser.getAttribute("given_name"); // "Nombre"
        String familyName = oauthUser.getAttribute("family_name");// "Apellido"

        String nombre;
        String apellido;

        if (givenName != null || familyName != null) {
            nombre = givenName != null ? givenName : "";
            apellido = familyName != null ? familyName : "";
        } else if (fullName != null && !fullName.isBlank()) {
            String[] parts = fullName.trim().split("\\s+");
            if (parts.length == 1) {
                nombre = parts[0];
                apellido = "";
            } else {
                apellido = parts[parts.length - 1];
                nombre = String.join(" ", Arrays.copyOf(parts, parts.length - 1));
            }
        } else {
            nombre = email != null ? email : "Usuario";
            apellido = "";
        }

        // usamos el email como username en tu sistema
        String username = email != null ? email : "google-user";

        Usuario u = new Usuario();
        u.setUsername(username);
        u.setNombre(nombre);
        u.setApellido(apellido);
        u.setEmail(email);
        u.setPasswordHash(passwordEncoder.encode("1234"));
        u.setRole(rolRepository.findById(3L).orElseThrow());
        return usuarioRepository.save(u);
    }
}