package com.SistemaContable.Services;

import com.SistemaContable.DTO.*;
import com.SistemaContable.Entities.*;
import com.SistemaContable.Repositories.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    public Empleado registrarEmpleado(EmpleadoDTO empleadoDTO){

        Empleado empleado = new Empleado();
        empleado.setNombre(empleadoDTO.getNombre());
        empleado.setApellido(empleadoDTO.getApellido());
        empleado.setFechaNacimiento(empleadoDTO.getFechaNacimiento()); 

        if(empleadoRepository.existsByCuil(empleadoDTO.getCuil())){
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"El CUIL ingresado ya existe");
        }
        empleado.setCuil(empleadoDTO.getCuil());

        // El legajo lo asigna el sistema para que no haya repitidos
        empleado.setLegajo(empleadoRepository.count() + 100); 
        empleado.setPuesto(empleadoDTO.getPuesto().toLowerCase());
        empleado.setDepartamento(empleadoDTO.getDepartamento().toLowerCase());
        empleado.setFechaIngreso(empleadoDTO.getFechaIngreso());

        if(empleadoDTO.getSalarioBasico() < 0){
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"El salario ingresado no es válido");
        }
        empleado.setSalarioBasico(empleadoDTO.getSalarioBasico());

        if(empleadoDTO.getEmpleadorId() != null){
            Empleado empleador = empleadoRepository.findById(empleadoDTO.getEmpleadorId())
                .orElseThrow(() -> new IllegalArgumentException("Empleador no encontrado"));
            empleado.setEmpleador(empleador);
        }

        return empleadoRepository.save(empleado);
    }

    public EmpleadoDTO mapToDTO(Empleado empleado){
        EmpleadoDTO empleadoDTO = new EmpleadoDTO();

        empleadoDTO.setId(empleado.getId());
        empleadoDTO.setNombre(empleado.getNombre());
        empleadoDTO.setApellido(empleado.getApellido());
        empleadoDTO.setFechaNacimiento(empleado.getFechaNacimiento());
        empleadoDTO.setCuil(empleado.getCuil());
        empleadoDTO.setLegajo(empleado.getLegajo());
        empleadoDTO.setPuesto(empleado.getPuesto());
        empleadoDTO.setDepartamento(empleado.getDepartamento());
        empleadoDTO.setFechaIngreso(empleado.getFechaIngreso());
        empleadoDTO.setSalarioBasico(empleado.getSalarioBasico());

        return empleadoDTO;
    }

    public List<Empleado> obtenerTodosLosEmpleados() {
        return empleadoRepository.findAll().stream()
                .collect(Collectors.toList());
    }

    public boolean actualizarEmpleado(EmpleadoDTO empleadoDTO) {
        Optional<Empleado> empleado = empleadoRepository.findById(empleadoDTO.getId());
        if (empleado.isPresent()) {
            if (empleadoDTO.getPuesto() != null) {
                empleado.get().setPuesto(empleadoDTO.getPuesto());
            }
            if (empleadoDTO.getDepartamento() != null) {
                empleado.get().setDepartamento(empleadoDTO.getDepartamento());
            }
            if (empleadoDTO.getSalarioBasico() > 0) { //Lo tuve que poner asi porque tiraba error con null
                empleado.get().setSalarioBasico(empleadoDTO.getSalarioBasico());
            }
            if (empleadoDTO.getEmpleadorId() != null) {
                Empleado empleador = empleadoRepository.findById(empleadoDTO.getEmpleadorId())
                    .orElseThrow(() -> new IllegalArgumentException("Empleador no encontrado"));
                empleado.get().setEmpleador(empleador);
            }
            empleadoRepository.save(empleado.get());
            return true;
        }
        return false;
    }

    public void agregarFamiliar(Familiar familiar){
        Empleado empleado = familiar.getEmpleado();
        empleado.setFamiliar(familiar);
    }

    public List<Familiar> obtenerFamiliares(Long empleadoId) {
        Optional<Empleado> empleado = empleadoRepository.findById(empleadoId);
        if (empleado.isPresent()){
            if(empleado.get().getFamiliares().isEmpty()){
                throw new ResponseStatusException(HttpStatus
                        .CONFLICT, "El empleado no tiene familiares registrados");
            }
            return empleado.get().getFamiliares();
        }
        else{
             throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"El empleado no existe");
        }
    }
}
