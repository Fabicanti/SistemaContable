package com.SistemaContable.Config;

import com.SistemaContable.Authentication.util.JwtAuthenticationFilter;
import com.SistemaContable.Exceptions.JwtAccessDeniedHandler;
import com.SistemaContable.Exceptions.JwtAuthenticationEntryPoint;
import com.SistemaContable.Services.Auth.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
     * Configura la cadena de filtros de seguridad de la aplicación especificando reglas de autorización,
     * filtros de seguridad y mecanismos de gestión de excepciones.
     *
     * @param http la instancia de HttpSecurity para configurar ajustes de seguridad como CORS, CSRF,
     * autorización de solicitudes, cadenas de filtros, encabezados y gestión de excepciones.
     * @return una instancia de SecurityFilterChain que representa la cadena de filtros configurada.
     * @throws Exception si se produce un error durante el proceso de configuración de seguridad.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll()
                        // Usuarios.
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/**").hasAnyRole(USER, ADMIN)
                        .requestMatchers("/api/usuarios/registrar").permitAll()
                        .requestMatchers("/api/usuarios/eliminar").hasRole(ADMIN)
                        .requestMatchers("/api/usuarios/modificar").hasRole(ADMIN)
                        // Cuentas.
                        .requestMatchers(HttpMethod.GET, "/api/cuentas").hasAnyRole(USER, ADMIN)
                        .requestMatchers("/api/cuentas/**").hasRole(ADMIN)

                        .requestMatchers("/api/asientos/**").hasAnyRole(USER, ADMIN)
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

    /**
     * Configura una política CORS (Intercambio de Recursos entre Orígenes) para la aplicación.
     * Define los orígenes permitidos, los métodos HTTP, los encabezados y las credenciales requeridas
     * para solicitudes entre orígenes a puntos finales específicos.
     *
     * @return un bean CorsConfigurationSource inicializado con la política CORS configurada.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
