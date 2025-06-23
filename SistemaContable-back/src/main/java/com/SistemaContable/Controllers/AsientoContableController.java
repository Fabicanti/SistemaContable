package com.SistemaContable.Controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import com.SistemaContable.DTO.AsientoFechaDto;
import com.SistemaContable.DTO.AsientoResponseDto;
import com.SistemaContable.Services.PdfGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/listar")
    public ResponseEntity<List<AsientoResponseDto>> listarAsientos(@RequestBody AsientoFechaDto asientoFechaDto) {
        List<AsientoResponseDto> asientos = asientoContableService.obtenerTodosLosAsientosEntreFechas(asientoFechaDto);
        return ResponseEntity.ok(asientos);
    }

    @PostMapping("/pdf")
    public ResponseEntity<?> obtenerAsientoPdf(@RequestBody AsientoFechaDto asientoFechaDto) throws IOException {
        List<AsientoResponseDto> asientosContables = asientoContableService.obtenerTodosLosAsientosEntreFechas(asientoFechaDto);
        byte[] pdfBytes = pdfGeneratorService.generarPdfAsiento(asientosContables);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "Asientos.pdf");
        headers.setContentLength(pdfBytes.length);
        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
