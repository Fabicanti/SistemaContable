package com.SistemaContable.Authentication;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;


/**
 * Clase de configuración que gestiona la clave secreta para la autenticación JWT.
 * Proporciona una clave HMAC-SHA para firmar y verificar tokens JWT en el sistema.
 */
public class TokenJWTConfig {
    private static final String SECRET = "tLm1uA6g3TveDXeuUSEDlnVuMvTUKDUMK6rb+fZc11AYWRXsOhCC469L+0sD+lebtzYdJIpYXnAcZdymnkTNGA";
    public static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
}
