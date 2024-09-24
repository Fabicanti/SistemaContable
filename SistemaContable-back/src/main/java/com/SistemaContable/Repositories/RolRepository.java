package com.SistemaContable.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.SistemaContable.Entities.Rol;


@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
}
