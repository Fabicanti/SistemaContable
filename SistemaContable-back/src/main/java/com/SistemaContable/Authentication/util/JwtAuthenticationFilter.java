package com.SistemaContable.Authentication.util;

import com.SistemaContable.Services.Auth.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService userDetailsService;


    public JwtAuthenticationFilter(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Procesa filtros para solicitudes HTTP, realiza autenticación basada en JWT y
     * reenvía la solicitud a la cadena de filtros para su posterior procesamiento.
     *
     * @param request: la solicitud del servlet HTTP que contiene la información del cliente.
     * @param response: la respuesta del servlet HTTP para enviar la respuesta del cliente.
     * @param filterChain: la cadena de filtros a la que se pasan la solicitud y la respuesta.
     * @throws ServletException si se produce un error durante el proceso de filtrado.
     * @throws IOException si una operación de entrada o salida falla o se interpreta.
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String token = JwtUtils.getTokenFromRequest(request);
        if (token != null) {
            try {
                Long userId = JwtUtils.getUserIdFromToken(token);

                UserDetails userDetails = userDetailsService.loadUserById(userId);
                var auth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);
    }
}
