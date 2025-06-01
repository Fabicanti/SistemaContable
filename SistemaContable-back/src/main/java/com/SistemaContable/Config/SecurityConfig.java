package com.SistemaContable.Config;

import com.SistemaContable.Authentication.util.JwtAuthenticationFilter;
import com.SistemaContable.Exceptions.JwtAccessDeniedHandler;
import com.SistemaContable.Exceptions.JwtAuthenticationEntryPoint;
import com.SistemaContable.Services.Auth.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    // Roles
    private static final String ADMIN = "SUPERUSER";
    private static final String USER = "USER";

    private final CustomUserDetailsService userDetailsService;
    private final JwtAccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    public SecurityConfig(CustomUserDetailsService userDetailsService,
                          JwtAccessDeniedHandler accessDeniedHandler,
                          JwtAuthenticationEntryPoint authenticationEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.accessDeniedHandler = accessDeniedHandler;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    /**
     * Configura la cadena de filtros de seguridad para la aplicación Spring Security.
     * Define reglas de autorización para diferentes endpoints, deshabilita CSRF,
     * incluye un filtro de autenticación basado en JWT y configura el manejo de
     * excepciones relacionadas con el acceso y la autenticación.
     *
     * @param http el objeto HttpSecurity utilizado para personalizar la configuración de seguridad de la aplicación.
     * @return un bean de SecurityFilterChain que representa la configuración de seguridad personalizada de la aplicación.
     * @throws Exception si ocurre algún error al construir la configuración de seguridad.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/roles/admin").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/roles/user").hasRole(USER)


                        .requestMatchers(HttpMethod.GET, "/api/usuarios/**").hasAnyRole(USER, ADMIN)
                        .requestMatchers("/api/usuarios/registrar").permitAll()
                        .requestMatchers("/api/usuarios/eliminar").hasRole(ADMIN)
                        .requestMatchers("/api/usuarios/modificar").hasRole(ADMIN)

                        .requestMatchers("/api/auth/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthenticationFilter(userDetailsService), UsernamePasswordAuthenticationFilter.class)
                .headers(headers ->
                        headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                )
                .exceptionHandling(exception -> exception
                        .accessDeniedHandler(accessDeniedHandler)
                        .authenticationEntryPoint(authenticationEntryPoint)
                );
        return http.build();
    }

    /**
     * Define un bean para PasswordEncoder, que se utiliza para codificar y verificar contraseñas.
     *
     * @return es una implementación de PasswordEncoder basada en BCrypt,
     * que proporciona un hash robusto para almacenar contraseñas de forma segura.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
