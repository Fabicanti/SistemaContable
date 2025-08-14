package com.SistemaContable.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.SistemaContable.DTO.FamiliarDTO;
import com.SistemaContable.Entities.Empleado;
import com.SistemaContable.Entities.Familiar;
import com.SistemaContable.Repositories.EmpleadoRepository;
import com.SistemaContable.Repositories.FamiliarRepository;

@Service
public class FamiliarService {

    @Autowired
    private FamiliarRepository familiarRepository;
     
    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private EmpleadoService empleadoService;


    public Familiar agregarFamiliar(FamiliarDTO familiarDTO){

        Familiar familiar = new Familiar();

        familiar.setNombre(familiarDTO.getNombre());
        familiar.setApellido(familiarDTO.getApellido());
        familiar.setFechaNacimiento(familiarDTO.getFechaNacimiento());
        familiar.setEstadoCivil(familiarDTO.getEstadoCivil().toLowerCase());
        familiar.setPaisResidencia(familiarDTO.getPaisResidencia());
        familiar.setDiscapacidad(familiarDTO.getDiscapacidad());

        // Control para que los ingresos sean valores positivos
        if(familiarDTO.getIngresos() < 0){
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"El valor de ingresos no es válido");
        }
        familiar.setIngresos(familiarDTO.getIngresos());

        familiar.setRelacion(familiarDTO.getRelacion().toLowerCase());

        if(!empleadoRepository.existsById(familiarDTO.getEmpleadoId())){
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"El empleado no existe");
        }
        Empleado empleado = empleadoRepository.findById(familiarDTO.getEmpleadoId()).get();
        familiar.setEmpleado(empleado);
        // Agrega al familiar en un listado que guarda el empleado
        empleadoService.agregarFamiliar(familiar);

        return familiarRepository.save(familiar);
    }

        /**
     * Condiciones para tener la asignacion familiar: 
     * Del hijo: Ser menor de 18 años, soltero y residir en el país.
     * Del hijo con discapacidad: Sin límite de edad. Ser soltero, viudo, divorciado, separado legalmente y residir en el país.
     * Tope máximo de Ingreso del Grupo Familiar $4.489.372.
     * Tope máximo de cada integrante del Grupo Familiar $2.244.686.
     */

    
}
