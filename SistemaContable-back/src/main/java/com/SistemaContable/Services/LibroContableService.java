package com.SistemaContable.Services;

import com.SistemaContable.DTO.*;
import com.SistemaContable.Entities.AsientoContable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.SistemaContable.Actualizadores.ActivoLibroMayor;
import com.SistemaContable.Actualizadores.PasivoLibroMayor;
import com.SistemaContable.Actualizadores.SaldoLibroMayor;

import java.util.HashMap;
import java.util.List;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Entities.DetalleAsiento;
import com.SistemaContable.Repositories.AsientoContableRepository;
import com.SistemaContable.Repositories.CuentaRepository;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LibroContableService {

    @Autowired
    private AsientoContableRepository asientoContableRepository;

    @Autowired
    private CuentaRepository cuentaRepository;

    public List<LibroMayorResponseDTO> obtenerMovimientosLibroMayor(LibroMayorRequestDTO request) {
        validarFechas(request.getFechaInicio(), request.getFechaFin());
        List<DetalleAsiento> detalles = asientoContableRepository
            .findByFechaBetweenAndCuentaId(request.getFechaInicio(), request.getFechaFin(), request.getcuentaId());
        
        Cuenta cuenta = cuentaRepository.findById(request.getcuentaId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta no encontrada"));
        String tipoCuentaRaiz = obtenerTipoCuentaRaiz(cuenta);
        SaldoLibroMayor saldoLibroMayor = obtenerEstrategiaSaldoLibroMayor(tipoCuentaRaiz);

        List<LibroMayorResponseDTO> respuesta = new ArrayList<>();
        double saldoActual = 0.0;
        for (DetalleAsiento detalle : detalles) {
            saldoActual = saldoLibroMayor.calcularSaldoLibroMayor(saldoActual, detalle.getDebe(), detalle.getHaber());
            LibroMayorResponseDTO dto = new LibroMayorResponseDTO();
            dto.setFecha(detalle.getAsientoContable().getFecha());
            dto.setDescripcion(detalle.getAsientoContable().getDescripcion());
            dto.setDebe(detalle.getDebe());
            dto.setHaber(detalle.getHaber());
            dto.setSaldo(saldoActual);
            respuesta.add(dto);
        }
        return respuesta;
    }

    private void validarFechas(LocalDate fechaInicio, LocalDate fechaFin) {
        if (fechaInicio == null || fechaFin == null) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Las fechas no pueden ser nulas.");
        }
        if (fechaFin.isBefore(fechaInicio)) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,"La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }

    private String obtenerTipoCuentaRaiz(Cuenta cuenta) {
         // Recorre hacia arriba hasta encontrar la cuenta raíz
         while (cuenta.getCuentaPadre() != null && !cuenta.getCuentaPadre().getTipoCuenta().getNombre().equals("RAIZ")) {
            cuenta = cuenta.getCuentaPadre();
        }
        return cuenta.getTipoCuenta().getNombre();
    }

    private SaldoLibroMayor obtenerEstrategiaSaldoLibroMayor(String tipoCuentaRaiz) {
        switch (tipoCuentaRaiz) {
            case "ACTIVO":
            case "RESULTADO POSITIVO":
                return new ActivoLibroMayor();
            case "PASIVO":
            case "PATRIMONIO NETO":
            case "RESULTADO NEGATIVO":
                return new PasivoLibroMayor();
            default:
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Tipo de cuenta no reconocido para estrategia de saldo: " + tipoCuentaRaiz);
        }
    }

    public double obtenerSaldoInicial(Long cuentaId, LocalDate fechaInicio) {
        List<DetalleAsiento> detalles = asientoContableRepository
            .findByFechaBeforeAndCuentaId(fechaInicio, cuentaId);
        double saldoInicial = 0.0;
        for (DetalleAsiento detalle : detalles) {
            saldoInicial += detalle.getDebe() - detalle.getHaber();
        }
        return saldoInicial;
    }

    public String obtenerNombreCuenta(Long cuentaId) {
        Cuenta cuenta = cuentaRepository.findById(cuentaId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Cuenta no encontrada"));
        return cuenta.getNombre();
    }

    public List<CuentaDTO> nombresCuentasMovimientos(){
        return cuentaRepository
                .findAllIdNombresCuentas()
                .stream()
                .map(this::mapToCuentaDTO)
                .toList();
    }

    private CuentaDTO mapToCuentaDTO(Cuenta cuenta) {
        return new CuentaDTO(
                cuenta.getId(),
                cuenta.getNombre(),
                cuenta.getCodigoCuenta(),
                cuenta.getSaldo(),
                cuenta.getRecibeSaldo(),
                cuenta.getTipoCuenta() != null ? cuenta.getTipoCuenta().getId() : null,
                cuenta.getTipoCuenta() != null ? cuenta.getTipoCuenta().getNombre() : null,
                cuenta.getCuentaPadre() != null ? cuenta.getCuentaPadre().getId() : null,
                cuenta.getSubCuentas() != null ? cuenta.getSubCuentas().stream().map(Cuenta::getId).collect(Collectors.toList()) : new ArrayList<>()
        );
    }
}

