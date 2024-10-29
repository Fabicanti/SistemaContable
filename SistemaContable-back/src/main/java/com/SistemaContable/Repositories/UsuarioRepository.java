package com.SistemaContable.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.Usuario;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT COUNT(*) " +
            "FROM Usuario u " +
            "INNER JOIN AsientoContable ac ON u.id = ac.usuario.id " +
            "WHERE ac.usuario.id = :usuarioId")
    Long countAsientosUsuarios(@Param("usuarioId") Long usuarioId);

    Optional<Usuario> findByUsername(String username);
}
