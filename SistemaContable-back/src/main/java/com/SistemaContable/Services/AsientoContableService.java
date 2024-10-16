package com.SistemaContable.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SistemaContable.DTO.AsientoDTO;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import com.SistemaContable.Entities.AsientoContable;
import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Entities.DetalleAsiento;
import com.SistemaContable.Entities.Usuario;
import com.SistemaContable.Exceptions.CuentaNoEncontradaException;
import com.SistemaContable.Exceptions.UsuarioNoEncontradoException;
import com.SistemaContable.Repositories.AsientoContableRepository;
import com.SistemaContable.Repositories.CuentaRepository;
import com.SistemaContable.Repositories.UsuarioRepository;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

@Service
public class AsientoContableService {

    @Autowired
    private AsientoContableRepository asientoContableRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CuentaRepository cuentaRepository;

    private AsientoDTO mapToDTO(AsientoContable asientoContable) {
        AsientoDTO asientoDTO = new AsientoDTO();
        asientoDTO.setId(asientoContable.getId());
        asientoDTO.setFecha(asientoContable.getFecha());
        asientoDTO.setDescripcion(asientoContable.getDescripcion());
        List<DetalleAsientoDTO> detalleDTOs = new ArrayList<>();
        for (DetalleAsiento detalle : asientoContable.getDetalles()) {
            DetalleAsientoDTO detalleDTO = new DetalleAsientoDTO();
            detalleDTO.setId(detalle.getId());
            detalleDTO.setCuentaId(detalle.getCuenta().getId());
            detalleDTO.setDebe(detalle.getDebe());
            detalleDTO.setHaber(detalle.getHaber());
            detalleDTOs.add(detalleDTO);
        }
        asientoDTO.setDetalles(detalleDTOs);

        return asientoDTO;
    }

    public List<AsientoDTO> obtenerTodosLosAsientos() {
        return asientoContableRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AsientoDTO buscarAsiento(AsientoDTO asientoDTO) {
        Optional<AsientoContable> asiento = asientoContableRepository.findById(asientoDTO.getId());
        return this.mapToDTO(asiento.get());
    }

    @Transactional
    public AsientoContable registrarAsiento(AsientoDTO asientoDTO) {
        if (asientoDTO.getDetalles() == null || asientoDTO.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("El asiento debe tener al menos un detalle.");
        }

        AsientoContable asientoContable = new AsientoContable();
        asientoContable.setFecha(asientoDTO.getFecha());
        asientoContable.setDescripcion(asientoDTO.getDescripcion());

        // Buscar y asignar usuario
        Usuario usuario = usuarioRepository.findById(asientoDTO.getUsuarioId())
                .orElseThrow(() -> new UsuarioNoEncontradoException("Usuario no encontrado"));
        asientoContable.setUsuario(usuario);

        // Procesar los detalles del asiento
        List<DetalleAsiento> detalles = asientoDTO.getDetalles().stream().map(detalleDTO -> {
            DetalleAsiento detalleAsiento = new DetalleAsiento();
            detalleAsiento.setDebe(detalleDTO.getDebe());
            detalleAsiento.setHaber(detalleDTO.getHaber());

            // Buscar y asignar cuenta
            Cuenta cuenta = cuentaRepository.findById(detalleDTO.getCuentaId())
                    .orElseThrow(() -> new CuentaNoEncontradaException("Cuenta no encontrada"));
            detalleAsiento.setCuenta(cuenta);
            detalleAsiento.setAsientoContable(asientoContable);
            return detalleAsiento;
        }).collect(Collectors.toList());

        // Validar que los totales de debe y haber sean iguales
        double totalDebe = detalles.stream().mapToDouble(DetalleAsiento::getDebe).sum();
        double totalHaber = detalles.stream().mapToDouble(DetalleAsiento::getHaber).sum();

        if (totalDebe != totalHaber) {
            throw new IllegalArgumentException("Los totales de debe y haber deben ser iguales.");
        }

        asientoContable.setDetalles(detalles);

        // Guardar el asiento contable y los detalles
        return asientoContableRepository.save(asientoContable);
    }

}
