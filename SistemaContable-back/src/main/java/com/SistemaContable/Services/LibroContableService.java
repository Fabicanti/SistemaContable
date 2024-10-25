package com.SistemaContable.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import org.modelmapper.ModelMapper;
import java.util.List;
import java.time.LocalDate;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import com.SistemaContable.Entities.AsientoContable;
import com.SistemaContable.Entities.DetalleAsiento;
import com.SistemaContable.Repositories.AsientoContableRepository;

@Service
public class LibroContableService {

    @Autowired
    private AsientoContableRepository asientoContableRepository;

    @Autowired
    private ModelMapper modelMapper;  // Se utiliza para mapear entidades a DTO


    public Map<String, List<DetalleAsientoDTO>> obtenerLibroMayor(LocalDate fechaInicio, LocalDate fechaFin) {
        validarFechas(fechaInicio, fechaFin);  // Validación de fechas
        List<AsientoContable> asientos = asientoContableRepository.findByFechaBetween(fechaInicio, fechaFin);
        Map<String, List<DetalleAsientoDTO>> libroMayor = new HashMap<>();
        for (AsientoContable asiento : asientos) {
            for (DetalleAsiento detalle : asiento.getDetalles()) {
                String cuenta = detalle.getCuenta().getNombre();
                libroMayor.computeIfAbsent(cuenta, k -> new ArrayList<>())
                          .add(convertirDetalleADTO(detalle));
            }
        }
        return libroMayor;
    }


    private DetalleAsientoDTO convertirDetalleADTO(DetalleAsiento detalle) {
        return modelMapper.map(detalle, DetalleAsientoDTO.class);
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

