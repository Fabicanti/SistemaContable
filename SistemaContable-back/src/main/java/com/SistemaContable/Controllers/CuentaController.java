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
