package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.Cuenta;

import java.util.List;


@Repository
public interface CuentaRepository  extends JpaRepository<Cuenta, Long>{

    Long countByCuentaPadreId(Long cuentaPadreId);

    @Query("SELECT c.nombre FROM Cuenta c WHERE c.nombre != 'Raiz' ")
    List<String> findAllNombresCuentas();

    /**
     * @param cuentaId es el ID de la cuenta.
     * @return la cantidad de DetalleAsientos (Movimientos) que tiene las cuentas.
     */
    @Query("SELECT COUNT(m) FROM DetalleAsiento m WHERE m.asientoContable.id = :cuentaId")
    Long countMovimientosByCuentaId(@Param("cuentaId") Long cuentaId);

    @Query("SELECT c FROM Cuenta c WHERE c.id = (SELECT MAX(c2.id) FROM Cuenta c2 WHERE c2.cuentaPadre.id = :cuentaPadreId)")
    Cuenta findUltimoHijo(@Param("cuentaPadreId") Long cuentaPadreId);

    Cuenta findByCodigoCuenta(String codigoCuenta);

    @Query("SELECT c.id FROM Cuenta c WHERE c.nombre = :nombreCuenta")
    Long findIdByNombreCuenta(@Param("nombreCuenta") String nombreCuenta);


}
