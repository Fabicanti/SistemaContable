package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.TipoCuenta;

@Repository
public interface TipoCuentaRepository extends JpaRepository<TipoCuenta, Long>{

}
