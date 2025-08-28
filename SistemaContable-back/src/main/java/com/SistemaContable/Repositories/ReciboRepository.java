package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SistemaContable.Entities.Recibo;

@Repository
public interface ReciboRepository extends JpaRepository<Recibo, Long>{

}
