package com.SistemaContable.Authentication;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;

public class TokenJWTConfig {
    private static final String SECRET = "tLm1uA6g3TveDXeuUSEDlnVuMvTUKDUMK6rb+fZc11AYWRXsOhCC469L+0sD+lebtzYdJIpYXnAcZdymnkTNGA";
    public static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
}
