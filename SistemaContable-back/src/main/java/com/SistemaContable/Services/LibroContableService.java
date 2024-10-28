package com.SistemaContable.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.SistemaContable.DTO.LibroMayorRequestDTO;
import com.SistemaContable.DTO.LibroMayorResponseDTO;
import java.util.List;
import java.time.LocalDate;
import java.util.ArrayList;
import com.SistemaContable.Entities.DetalleAsiento;
import com.SistemaContable.Repositories.AsientoContableRepository;

@Service
public class LibroContableService {

    @Autowired
    private AsientoContableRepository asientoContableRepository;

    public List<LibroMayorResponseDTO> obtenerMovimientosLibroMayor(LibroMayorRequestDTO request) {
        validarFechas(request.getFechaInicio(), request.getFechaFin());
        List<DetalleAsiento> detalles = asientoContableRepository
            .findByFechaBetweenAndCuentaId(request.getFechaInicio(), request.getFechaFin(), request.getcuentaId());
        
        List<LibroMayorResponseDTO> respuesta = new ArrayList<>();
        for (DetalleAsiento detalle : detalles) {
            LibroMayorResponseDTO dto = new LibroMayorResponseDTO();
            dto.setFecha(detalle.getAsientoContable().getFecha());
            dto.setDescripcion(detalle.getAsientoContable().getDescripcion());
            dto.setDebe(detalle.getDebe());
            dto.setHaber(detalle.getHaber());
            respuesta.add(dto);
        }
        return respuesta;
    }

    private void validarFechas(LocalDate fechaInicio, LocalDate fechaFin) {
        if (fechaInicio == null || fechaFin == null) {
            throw new IllegalArgumentException("Las fechas no pueden ser nulas.");
        }
        if (fechaFin.isBefore(fechaInicio)) {
            throw new IllegalArgumentException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }
}

