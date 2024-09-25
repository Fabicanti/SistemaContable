package com.SistemaContable.Services;

import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.DTO.CuentaDTO;
import com.SistemaContable.Repositories.CuentaRepository;
import com.SistemaContable.Repositories.TipoCuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CuentaService {

    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private TipoCuentaRepository tipoCuentaRepository;

    // Método para crear una nueva cuenta
    public CuentaDTO crearCuenta(CuentaDTO cuentaDTO) {
        Cuenta cuenta = mapToEntity(cuentaDTO);
        Cuenta nuevaCuenta = cuentaRepository.save(cuenta);
        return mapToDTO(nuevaCuenta);
    }

    // Método para actualizar una cuenta existente
    public CuentaDTO actualizarCuenta(Long id, CuentaDTO cuentaDTO) {
        Cuenta cuenta = cuentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        cuenta.setNombre(cuentaDTO.getNombre());
        cuenta.setCodigoCuenta(cuentaDTO.getCodigoCuenta());

        // Actualiza el tipo de cuenta si está presente
        if (cuentaDTO.getTipoCuentaId() != null) {
            tipoCuentaRepository.findById(cuentaDTO.getTipoCuentaId())
                    .ifPresent(cuenta::setTipoCuenta);
        }

        // Actualiza la cuenta padre si está presente
        if (cuentaDTO.getCuentaPadreId() != null) {
            cuentaRepository.findById(cuentaDTO.getCuentaPadreId())
                    .ifPresent(cuenta::setCuentaPadre);
        }

        Cuenta cuentaActualizada = cuentaRepository.save(cuenta);
        return mapToDTO(cuentaActualizada);
    }

    // Método para obtener todas las cuentas
    public List<CuentaDTO> obtenerTodasLasCuentas() {
        List<Cuenta> cuentas = cuentaRepository.findAll();
        return cuentas.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Método para obtener una cuenta por ID
    public CuentaDTO obtenerCuentaPorId(Long id) {
        Cuenta cuenta = cuentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
        return mapToDTO(cuenta);
    }

    // Método para eliminar una cuenta por ID
    public void eliminarCuenta(Long id) {
        if (cuentaRepository.existsById(id)) {
            cuentaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Cuenta no encontrada");
        }
    }

    // Método privado para mapear de Cuenta a CuentaDTO
    private CuentaDTO mapToDTO(Cuenta cuenta) {
        return new CuentaDTO(
                cuenta.getId(),
                cuenta.getNombre(),
                cuenta.getCodigoCuenta(),
                cuenta.getTipoCuenta() != null ? cuenta.getTipoCuenta().getId() : null,
                cuenta.getTipoCuenta() != null ? cuenta.getTipoCuenta().getNombre() : null,
                cuenta.getCuentaPadre() != null ? cuenta.getCuentaPadre().getId() : null,
                cuenta.getSubCuentas().stream().map(Cuenta::getId).collect(Collectors.toList())
        );
    }

    // Método privado para mapear de CuentaDTO a Cuenta
    private Cuenta mapToEntity(CuentaDTO cuentaDTO) {
        Cuenta cuenta = new Cuenta();
        cuenta.setNombre(cuentaDTO.getNombre());
        cuenta.setCodigoCuenta(cuentaDTO.getCodigoCuenta());

        // Asigna el tipo de cuenta si está presente
        if (cuentaDTO.getTipoCuentaId() != null) {
            tipoCuentaRepository.findById(cuentaDTO.getTipoCuentaId())
                    .ifPresent(cuenta::setTipoCuenta);
        }

        // Asigna la cuenta padre si está presente (para subcuentas)
        if (cuentaDTO.getCuentaPadreId() != null) {
            cuentaRepository.findById(cuentaDTO.getCuentaPadreId())
                    .ifPresent(cuenta::setCuentaPadre);
        }

        return cuenta;
    }
}
