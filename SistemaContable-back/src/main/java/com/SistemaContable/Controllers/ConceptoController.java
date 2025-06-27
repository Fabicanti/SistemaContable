package com.SistemaContable.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SistemaContable.DTO.ConceptoDTO;
import com.SistemaContable.Entities.Concepto;
import com.SistemaContable.Services.ConceptoService;

@RestController
@RequestMapping("/api/conceptos")
public class ConceptoController {

    @Autowired
    private ConceptoService conceptoService;

    @PostMapping("/agregar")
    public ResponseEntity<Concepto> agregarConcepto(@RequestBody ConceptoDTO conceptoDTO) {
        Concepto conceptoNuevo = conceptoService.agregarConcepto(conceptoDTO);
        return ResponseEntity.ok(conceptoNuevo);
    }

}
