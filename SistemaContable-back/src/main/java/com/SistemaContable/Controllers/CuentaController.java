package com.SistemaContable.Controllers;

import com.SistemaContable.DTO.CuentaDTO;
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
    public ResponseEntity<?> createCuenta(@RequestBody CuentaDTO cuentaDTO) {
        try {
            CuentaDTO cuentaNueva = cuentaService.crearCuenta(cuentaDTO);
            return ResponseEntity.ok(cuentaNueva);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating account: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> obtenerCuentas(){
        List<CuentaDTO> cuentas = cuentaService.obtenerTodasLasCuentas();
        return ResponseEntity.ok(cuentas);
    }

    @GetMapping("/nombres")
    public ResponseEntity<?> obtenerNombresCuentas(){
        return ResponseEntity.ok(cuentaService.obtenerNombresCuentas());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> eliminarCuenta(@PathVariable Long id){
        cuentaService.eliminarCuenta(id);
        return ResponseEntity.ok("Cuenta eliminada correctamente");
    }
}
