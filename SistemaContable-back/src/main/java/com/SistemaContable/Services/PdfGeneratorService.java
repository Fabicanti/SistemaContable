package com.SistemaContable.Services;

import com.SistemaContable.DTO.AsientoDTO;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import com.SistemaContable.DTO.LibroMayorResponseDTO;
import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Repositories.CuentaRepository;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfGeneratorService {

    @Autowired
    private CuentaRepository cuentaRepository;

    public byte[] generarPdfAsiento(List<AsientoDTO> asientos) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Asiento Contable").setBold().setFontSize(18));

        // Define columnas: Fecha, Descripción, Debe, Haber
        float[] columnWidths = { 100F, 200F, 100F, 100F };
        Table table = new Table(columnWidths);
        table.addHeaderCell("Fecha");
        table.addHeaderCell("Descripción");
        table.addHeaderCell("Debe");
        table.addHeaderCell("Haber");

        // Recorrer cada asiento contable y sus detalles
        for (AsientoDTO asiento : asientos) {
            boolean firstRow = true; // Para poner la fecha y descripción solo en la primera fila
            for (DetalleAsientoDTO detalle : asiento.getDetalles()) {
                // Obtener el nombre de la cuenta a partir del cuentaId
                String nombreCuenta = cuentaRepository.findById(detalle.getCuentaId())
                        .map(Cuenta::getNombre)
                        .orElse("Cuenta no encontrada");

                if (firstRow) {
                    table.addCell(new Cell().add(new Paragraph(asiento.getFecha().toString())));
                    table.addCell(new Cell().add(new Paragraph(nombreCuenta))); // Nombre de la cuenta
                    firstRow = false;
                } else {
                    table.addCell(new Cell()); // Celda vacía para la fecha
                    table.addCell(new Cell().add(new Paragraph(nombreCuenta))); // Nombre de la cuenta
                }
                // Agregar debe y haber
                table.addCell(new Cell().add(new Paragraph(String.valueOf(detalle.getDebe()))));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(detalle.getHaber()))));
            }
            // Añadir fila vacía entre asientos para separación visual
            table.addCell(new Cell(1, 4).add(new Paragraph(" ")));
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }

    public byte[] generarPdfLibroMayor(List<LibroMayorResponseDTO> movimientos, double saldoInicial)
            throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Mayor de Cuenta").setBold().setFontSize(18));

        // Crear la tabla con columnas: Fecha, Operación, Debe, Haber, Saldo
        float[] columnWidths = { 100F, 200F, 100F, 100F, 100F };
        Table table = new Table(columnWidths);

        // Encabezados de la tabla
        table.addHeaderCell("Fecha");
        table.addHeaderCell("Operación");
        table.addHeaderCell("Debe");
        table.addHeaderCell("Haber");
        table.addHeaderCell("Saldo");

        // Agregar la fila de saldo inicial
        table.addCell("");
        table.addCell("Inicial");
        table.addCell("");
        table.addCell("");
        table.addCell(String.valueOf(saldoInicial));

        // Variable para mantener el saldo acumulado
        double saldo = saldoInicial;

        // Agregar cada movimiento a la tabla
        for (LibroMayorResponseDTO movimiento : movimientos) {
            String fecha = movimiento.getFecha().getYear() + "-" + movimiento.getFecha().getMonthValue() + "-"
                    + movimiento.getFecha().getDayOfMonth();
            String descripcion = movimiento.getDescripcion();

            table.addCell(new Cell().add(new Paragraph(fecha)));
            table.addCell(new Cell().add(new Paragraph(descripcion)));

            // Añadir valores de debe y haber
            table.addCell(new Cell()
                    .add(new Paragraph(movimiento.getDebe() == 0 ? "" : String.valueOf(movimiento.getDebe()))));
            table.addCell(new Cell()
                    .add(new Paragraph(movimiento.getHaber() == 0 ? "" : String.valueOf(movimiento.getHaber()))));

            // Calcular saldo acumulado
            saldo += movimiento.getDebe() - movimiento.getHaber();
            table.addCell(new Cell().add(new Paragraph(String.valueOf(saldo))));
        }

        // Fila final con el saldo final
        table.addCell("");
        table.addCell("Saldo final");
        table.addCell("");
        table.addCell("");
        table.addCell(String.valueOf(saldo));

        document.add(table);
        document.close();

        return baos.toByteArray();
    }
}
