package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SistemaContable.Entities.ConceptoRecibo;

@Repository
public interface ConceptoReciboRepository extends JpaRepository<ConceptoRecibo, Long>{

}
