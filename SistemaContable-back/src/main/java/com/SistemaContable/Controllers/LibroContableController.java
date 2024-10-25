package com.SistemaContable.Controllers;

import org.springframework.web.bind.annotation.RestController;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import com.SistemaContable.Services.LibroContableService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/libros")
public class LibroContableController {

    @Autowired
    private LibroContableService libroContableService;

    // fechas en formato (yyyy-MM-dd) y cuenta en requestbody en formato JSON
    
    @GetMapping("/mayor")
    public ResponseEntity<Map<String, List<DetalleAsientoDTO>>> obtenerLibroMayor(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        try {
            Map<String, List<DetalleAsientoDTO>> libroMayor = libroContableService.obtenerLibroMayor(fechaInicio, fechaFin);
            return ResponseEntity.ok(libroMayor);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(null); // excepción de fechas inválidas
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // otras excepciones
        }
    }
}


