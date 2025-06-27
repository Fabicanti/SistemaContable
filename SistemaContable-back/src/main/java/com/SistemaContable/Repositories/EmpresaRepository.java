package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SistemaContable.Entities.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{

}
