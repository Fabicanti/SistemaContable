package com.SistemaContable.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SistemaContable.DTO.FamiliarDTO;
import com.SistemaContable.Entities.Familiar;
import com.SistemaContable.Services.FamiliarService;

@RestController
@RequestMapping("/api/familiares")
public class FamiliarController {

    @Autowired
    private FamiliarService familiarService;

    @PostMapping("/agregar")
    public ResponseEntity<Familiar> registrarFamiliar(@RequestBody FamiliarDTO familiarDTO) {
        Familiar familiarNuevo = familiarService.agregarFamiliar(familiarDTO);
        return ResponseEntity.ok(familiarNuevo);
    }


}
