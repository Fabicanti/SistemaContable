package com.SistemaContable.Controllers;

import com.SistemaContable.DTO.CuentaDTO;
import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Services.CuentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cuentas")
public class CuentaController {

    @Autowired
    private CuentaService cuentaService;

    @PostMapping("/crear")
    public ResponseEntity<CuentaDTO> createCuenta(@RequestBody CuentaDTO cuentaDTO) {
        Cuenta cuentaNueva = cuentaService.crearCuenta(cuentaDTO);
        CuentaDTO cuentaNuevaDTO = cuentaService.mapToDTO(cuentaNueva);
        return ResponseEntity.ok(cuentaNuevaDTO);
    }

    @GetMapping
    public ResponseEntity<?> obtenerCuentas(){
        List<CuentaDTO> cuentas = cuentaService.obtenerTodasLasCuentas();
        return ResponseEntity.ok(cuentas);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> eliminarCuenta(@PathVariable Long id){
        cuentaService.eliminarCuenta(id);
        return ResponseEntity.ok("Cuenta eliminada correctamente");
    }
}
