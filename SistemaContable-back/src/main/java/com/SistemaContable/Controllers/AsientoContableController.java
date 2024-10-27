package com.SistemaContable.Controllers;

import java.io.IOException;
import java.util.List;

import com.SistemaContable.Services.PdfGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarAsiento(@RequestBody AsientoDTO asientoDTO) {
        AsientoContable nuevoAsiento = asientoContableService.registrarAsiento(asientoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoAsiento);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<AsientoDTO>> listarAsientos() {
        List<AsientoDTO> asientos = asientoContableService.obtenerTodosLosAsientos();
        return ResponseEntity.ok(asientos);
    }

    @GetMapping("/pdf")
    public ResponseEntity<?> obtenerAsientoPdf() throws IOException {
        List<AsientoDTO> asientosContables = asientoContableService.obtenerTodosLosAsientos();
        byte[] pdfBytes = pdfGeneratorService.generarPdfLibroDiario(asientosContables);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "LibroDiario.pdf");
        headers.setContentLength(pdfBytes.length);

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
