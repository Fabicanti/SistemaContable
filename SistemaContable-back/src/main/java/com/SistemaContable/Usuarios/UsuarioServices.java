package com.SistemaContable.Usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UsuarioServices {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(UsuarioDTO usuarioDTO) {
        String passwordHash = null;
        try {
            passwordHash = hashPassword(usuarioDTO.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        Usuario usuario = new Usuario();
        usuario.setUsername(usuarioDTO.getUsername());
        usuario.setPasswordHash(passwordHash);
        usuario.setRole(usuarioDTO.getRole());
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public boolean validarUsuario(String username, String password) throws NoSuchAlgorithmException {
        Optional<Usuario> usuarioOpt = buscarPorUsername(username);
        if (usuarioOpt.isPresent()) {
            String hashIngresado = hashPassword(password);
            if (hashIngresado.equals(usuarioOpt.get().getPasswordHash())) {
                return true;
            }
        }
        return false;
    }

    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

}