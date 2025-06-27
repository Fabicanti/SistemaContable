package com.SistemaContable.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SistemaContable.DTO.EmpleadoDTO;
import com.SistemaContable.Entities.Empleado;
import com.SistemaContable.Entities.Familiar;
import com.SistemaContable.Services.EmpleadoService;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping("/registrar")
    public ResponseEntity<Empleado> registrarEmpleado(@RequestBody EmpleadoDTO empleadoDTO) {
        Empleado empleadoNuevo = empleadoService.registrarEmpleado(empleadoDTO);
        return ResponseEntity.ok(empleadoNuevo);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Empleado>> obtenerEmpleados() {
        List<Empleado> empleados = empleadoService.obtenerTodosLosEmpleados();
        return ResponseEntity.ok(empleados);
    }

    @PatchMapping("/actualizar")
    public ResponseEntity<?> actualizarEmpleado(@RequestBody EmpleadoDTO empleadoDTO){
        if (empleadoService.actualizarEmpleado(empleadoDTO)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empleado no encontrado");
    }
    
    @GetMapping("/listarFamiliares/{empleadoId}")
    public ResponseEntity<List<Familiar>> listarFamiliares(@PathVariable Long empleadoId){
        List<Familiar> familiares = empleadoService.obtenerFamiliares(empleadoId);
        return ResponseEntity.ok(familiares);
    }

}
