package com.SistemaContable.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.DetalleAsiento;

@Repository
public interface DetalleAsientoRepository extends JpaRepository<DetalleAsiento, Long>{

}
