package com.SistemaContable.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SistemaContable.Entities.Empleado;
import com.SistemaContable.Entities.Familiar;
import java.util.List;


@Repository
public interface FamiliarRepository extends JpaRepository<Familiar, Long>{

    List<Familiar> findByEmpleado(Empleado empleado);

}