package com.SistemaContable.Controllers;

import org.springframework.web.bind.annotation.RestController;
import com.SistemaContable.DTO.LibroMayorRequestDTO;
import com.SistemaContable.DTO.LibroMayorResponseDTO;
import com.SistemaContable.Services.LibroContableService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@RestController
@RequestMapping("/api/libros")
public class LibroContableController {

    @Autowired
    private LibroContableService libroContableService;
    
    @PostMapping("/mayor")
    public ResponseEntity<List<LibroMayorResponseDTO>> obtenerLibroMayor(@RequestBody LibroMayorRequestDTO request) {
        List<LibroMayorResponseDTO> response = libroContableService.obtenerMovimientosLibroMayor(request);
        return ResponseEntity.ok(response);
    }
}


