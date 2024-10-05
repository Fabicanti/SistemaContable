package com.SistemaContable.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.DetalleAsiento;

@Repository
public interface DetalleAsientoRepository extends JpaRepository<DetalleAsiento, Long>{
    /**
     * Me devuelve todos los movimientos que hizo un usuario
     * @param usuarioId es el ID del usuario.
     * @return la cantidad de movimientos que hizo el usuario
     */
    @Query("SELECT COUNT(da) FROM DetalleAsiento da WHERE da.asientoContable.usuario.id = :usuarioId")
    long countByUsuarioId(@Param("usuarioId") Long usuarioId);
}
