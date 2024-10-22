package com.SistemaContable.Repositories;
import org.springframework.data.jpa.repository.Query;
import com.SistemaContable.Entities.AsientoContable;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsientoContableRepository extends JpaRepository<AsientoContable, Long> {

    @Query("SELECT MAX(a.fecha) FROM AsientoContable a")
    Timestamp findUltimaFecha();

    // Method to find AsientoContable between two dates
    List<AsientoContable> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
}
