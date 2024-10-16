package com.SistemaContable.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.SistemaContable.DTO.AsientoDTO;
import com.SistemaContable.Entities.AsientoContable;
import com.SistemaContable.Services.AsientoContableService;

@RestController
@RequestMapping("/api/asientos")
public class AsientoContableController {

    @Autowired
    private AsientoContableService asientoContableService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarAsiento(@RequestBody AsientoDTO asientoDTO) {
        try {
            AsientoContable nuevoAsiento = asientoContableService.registrarAsiento(asientoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoAsiento);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<AsientoDTO>> listarAsientos() {
        List<AsientoDTO> asientos = asientoContableService.obtenerTodosLosAsientos();
        return ResponseEntity.ok(asientos);
    }
}
