package com.SistemaContable.Authentication.util;


import com.SistemaContable.Authentication.TokenJWTConfig;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtils {
    private static final SecretKey SECRET_KEY = TokenJWTConfig.SECRET_KEY;
    private static final long EXPIRATION_MS = (1000 * 60) * (60 * 24); // 1 día
    private static final String COOKIE_NAME = "access_token";

    /**
     * Genera un token JWT para el ID de usuario especificado.
     *
     * @param userId El ID de usuario para el que se generará el token.
     * @return Un token JWT como una cadena, firmado y listo para uso seguro.
     */
    public static String generateToken(Long userId) {
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Extrae el ID de usuario del token JWT dado.
     *
     * @param token El token JWT que contiene el ID de usuario en su asunto.
     * @return El ID de usuario como un valor Long extraído del asunto del token.
     */
    public static Long getUserIdFromToken(String token) {
        String subject = Jwts.parser().verifyWith(SECRET_KEY).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
        return Long.parseLong(subject);
    }

    /**
     * Agrega un token JWT como cookie segura a la respuesta HTTP.
     *
     * @param response el objeto HttpServletResponse al que se agregará la cookie.
     * @param token el token JWT que se almacenará en la cookie.
     */
    public static void addTokenToCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge((int) (EXPIRATION_MS / 1000));
        response.addCookie(cookie);
    }

    /**
     * Recupera el valor de una cookie específica (identificada por su nombre) de la solicitud HTTP.
     *
     * @param request al cliente el objeto HttpServletRequest que contiene las cookies.
     * @return el valor de la cookie si existe; null si la cookie no está presente o si no hay cookies en la solicitud.
     */
    public static String getTokenFromRequest(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (COOKIE_NAME.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    /**
     * Borra el token JWT eliminando la cookie correspondiente de la respuesta HTTP.
     *
     * @param response el objeto HttpServletResponse al que se aplicarán las instrucciones para borrar las cookies.
     */
    public static void clearToken(HttpServletResponse response) {
        Cookie cookie = new Cookie(COOKIE_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

}
