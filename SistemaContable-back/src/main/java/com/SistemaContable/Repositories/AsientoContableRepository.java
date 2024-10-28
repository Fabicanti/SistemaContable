package com.SistemaContable.Repositories;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.SistemaContable.Entities.AsientoContable;
import com.SistemaContable.Entities.DetalleAsiento;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsientoContableRepository extends JpaRepository<AsientoContable, Long> {

    @Query("SELECT MAX(a.fecha) FROM AsientoContable a")
    LocalDate findUltimaFecha();

    @Query("SELECT d FROM DetalleAsiento d JOIN d.asientoContable a WHERE a.fecha BETWEEN :fechaInicio AND :fechaFin AND d.cuenta.id = :cuentaId")
    List<DetalleAsiento> findByFechaBetweenAndCuentaId(
        @Param("fechaInicio") LocalDate fechaInicio,
        @Param("fechaFin") LocalDate fechaFin,
        @Param("cuentaId") Long cuentaId
    );

    List<AsientoContable> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
    
    @Query("SELECT d FROM DetalleAsiento d JOIN d.asientoContable a WHERE a.fecha < :fecha AND d.cuenta.id = :cuentaId")
    List<DetalleAsiento> findByFechaBeforeAndCuentaId(
        @Param("fecha") LocalDate fecha,
        @Param("cuentaId") Long cuentaId
    );
}
