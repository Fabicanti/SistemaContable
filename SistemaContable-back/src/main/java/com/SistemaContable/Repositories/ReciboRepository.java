package com.SistemaContable.Repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SistemaContable.Entities.Recibo;

@Repository
public interface ReciboRepository extends JpaRepository<Recibo, Long>{

    @Query("SELECT r FROM Recibo r WHERE r.empleado.id = :empleadoId AND MONTH(r.fechaDeposito) = MONTH(:fecha) AND YEAR(r.fechaDeposito) = YEAR(:fecha)")
    Optional<List<Recibo>> existsByFechaDepositoAndEmpleado(@Param("fecha") LocalDate fechaDeposito, @Param("empleadoId") Long empleadoId);
}
