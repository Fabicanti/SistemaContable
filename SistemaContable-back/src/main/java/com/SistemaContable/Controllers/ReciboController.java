package com.SistemaContable.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SistemaContable.DTO.ReciboDTO;
import com.SistemaContable.Entities.Recibo;
import com.SistemaContable.Services.ReciboService;

@RestController
@RequestMapping("/api/recibos")
public class ReciboController {

    @Autowired
    private ReciboService reciboService;

    // Necesito si o si esa secuencia para hacer bien el recibo.
    // Se necesitaría que se agregen en "conceptosId" los id de los conceptos opcionales que se vayan a calcular. De momento hay 2, pero pueden aparecer más.
    @PostMapping("/generar")
    public ResponseEntity<Recibo> generarRecibo(@RequestBody ReciboDTO reciboDTO) {
        Recibo recibo = reciboService.agregarDatos(reciboDTO);
        reciboService.calcularRemGravadas(recibo, reciboDTO.getConceptosId());
        reciboService.calcularRemDescuentos(recibo, reciboDTO.getConceptosId());
        reciboService.calcularTotalNeto(recibo);
        return ResponseEntity.ok(recibo);
    }

}
