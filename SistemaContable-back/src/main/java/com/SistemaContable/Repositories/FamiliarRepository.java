package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SistemaContable.Entities.Familiar;

@Repository
public interface FamiliarRepository extends JpaRepository<Familiar, Long>{

}