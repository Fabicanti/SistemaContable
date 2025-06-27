package com.SistemaContable.Controllers;

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

    @PostMapping("/generar")
    public ResponseEntity<Recibo> generarRecibo(@RequestBody ReciboDTO reciboDTO) {
        Recibo recibo = reciboService.agregarDatos(reciboDTO);
        return ResponseEntity.ok(recibo);
    }


}
