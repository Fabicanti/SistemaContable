package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.Cuenta;

@Repository
public interface CuentaRepository  extends JpaRepository<Cuenta, Long>{

    Long countByCuentaPadreId(Long cuentaPadreId);

    /**
     * @param cuentaId es el ID de la cuenta.
     * @return la cantidad de DetalleAsientos (Movimientos) que tiene las cuentas.
     */
    @Query("SELECT COUNT(m) FROM DetalleAsiento m WHERE m.asientoContable.id = :cuentaId")
    Long countMovimientosByCuentaId(@Param("cuentaId") Long cuentaId);
}
