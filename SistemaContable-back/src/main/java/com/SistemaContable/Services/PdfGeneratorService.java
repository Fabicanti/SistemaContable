package com.SistemaContable.Services;

import com.SistemaContable.DTO.AsientoDTO;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class PdfGeneratorService {

    public byte[] generarPdfLibroDiario(List<AsientoDTO> asientos) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Libro Diario").setBold().setFontSize(18));
        
        // Crear tabla con columnas para el libro diario
        float[] pointColumnWidths = {100F, 250F, 100F, 100F};  // Ajusta según el contenido
        Table table = new Table(pointColumnWidths);

        // Encabezado de la tabla
        table.addHeaderCell("Fecha");
        table.addHeaderCell("Descripción");
        table.addHeaderCell("Debe");
        table.addHeaderCell("Haber");

        // Agregar los asientos contables a la tabla
        for (AsientoDTO asiento : asientos) {
            table.addCell(asiento.getFecha().toString());
            table.addCell(asiento.getDescripcion());
            asiento.getDetalles().forEach(detalle -> {
                table.addCell(String.valueOf(detalle.getDebe()));
                table.addCell(String.valueOf(detalle.getHaber()));
            });
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }

    public byte[] generarPdfLibroMayor(Map<String, List<DetalleAsientoDTO>> libroMayor) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Libro Mayor").setBold().setFontSize(18));

        // Crear tabla para cada cuenta
        for (Map.Entry<String, List<DetalleAsientoDTO>> entry : libroMayor.entrySet()) {
            String cuenta = entry.getKey();
            document.add(new Paragraph("Cuenta: " + cuenta).setBold());

            float[] pointColumnWidths = {100F, 100F};  // Ajusta las columnas para la cuenta
            Table table = new Table(pointColumnWidths);
            
            // Encabezado
            table.addHeaderCell("Debe");
            table.addHeaderCell("Haber");

            // Agregar detalles de la cuenta
            for (DetalleAsientoDTO detalle : entry.getValue()) {
                table.addCell(String.valueOf(detalle.getDebe()));
                table.addCell(String.valueOf(detalle.getHaber()));
            }
            document.add(table);
        }

        document.close();
        return baos.toByteArray();
    }

    public byte[] generarPdfAsiento(AsientoDTO asiento) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Asiento Contable").setBold().setFontSize(18));

        // Detalle del asiento
        document.add(new Paragraph("Fecha: " + asiento.getFecha().toString()));
        document.add(new Paragraph("Descripción: " + asiento.getDescripcion()));

        // Tabla para los detalles del asiento
        float[] pointColumnWidths = {100F, 100F};  // Ajusta según el contenido
        Table table = new Table(pointColumnWidths);

        table.addHeaderCell("Debe");
        table.addHeaderCell("Haber");

        asiento.getDetalles().forEach(detalle -> {
            table.addCell(String.valueOf(detalle.getDebe()));
            table.addCell(String.valueOf(detalle.getHaber()));
        });

        document.add(table);
        document.close();

        return baos.toByteArray();
    }
}
