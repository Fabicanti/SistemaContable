package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.Concepto;
import java.util.List;


@Repository
public interface ConceptoRepository extends JpaRepository<Concepto, Long>{
 
    List<Concepto> findByObligatorio(boolean obligatorio);
}
