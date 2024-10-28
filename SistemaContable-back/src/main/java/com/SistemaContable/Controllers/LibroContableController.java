package com.SistemaContable.Controllers;

import org.springframework.web.bind.annotation.RestController;
import com.SistemaContable.DTO.LibroMayorRequestDTO;
import com.SistemaContable.DTO.LibroMayorResponseDTO;
import com.SistemaContable.Services.LibroContableService;
import com.SistemaContable.Services.PdfGeneratorService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/libros")
public class LibroContableController {

    @Autowired
    private LibroContableService libroContableService;

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    @PostMapping("/mayor")
    public ResponseEntity<List<LibroMayorResponseDTO>> obtenerLibroMayor(@RequestBody LibroMayorRequestDTO request) {
        List<LibroMayorResponseDTO> response = libroContableService.obtenerMovimientosLibroMayor(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> obtenerLibroMayorPdf(@RequestBody LibroMayorRequestDTO request) throws IOException {
        // Obtener los movimientos del libro mayor
        List<LibroMayorResponseDTO> movimientos = libroContableService.obtenerMovimientosLibroMayor(request);

        // Obtener el saldo inicial para el PDF
        double saldoInicial = libroContableService.obtenerSaldoInicial(request.getcuentaId(), request.getFechaInicio());

        // Generar el PDF con el GeneradorPDFService
        byte[] pdfBytes = pdfGeneratorService.generarPdfLibroMayor(movimientos, saldoInicial);

        // Configurar la respuesta del PDF
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "LibroMayor.pdf");
        headers.setContentLength(pdfBytes.length);

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }

}
