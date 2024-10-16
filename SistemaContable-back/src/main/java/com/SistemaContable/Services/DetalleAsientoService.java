package com.SistemaContable.Services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import com.SistemaContable.Entities.AsientoContable;
import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Entities.DetalleAsiento;
import com.SistemaContable.Repositories.AsientoContableRepository;
import com.SistemaContable.Repositories.CuentaRepository;
import com.SistemaContable.Repositories.DetalleAsientoRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class DetalleAsientoService {

    @Autowired
    private DetalleAsientoRepository detalleAsientoRepository;

    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private AsientoContableRepository asientoContableRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Registra los detalles de un asiento contable.
     * @param detalleAsientoDTO Lista de detalles del asiento a registrar.
     * @param asientoId ID del asiento contable al que pertenece el detalle.
     * @return Lista de detalles del asiento registrados.
     */
    public List<DetalleAsientoDTO> registrarDetallesAsiento(List<DetalleAsientoDTO> detalleAsientoDTOs, Long asientoId) {
        AsientoContable asiento = asientoContableRepository.findById(asientoId)
                .orElseThrow(() -> new EntityNotFoundException("Asiento contable no encontrado"));

        List<DetalleAsiento> detallesAsiento = detalleAsientoDTOs.stream().map(detalleDTO -> {
            Cuenta cuenta = cuentaRepository.findById(detalleDTO.getCuentaId())
                    .orElseThrow(() -> new EntityNotFoundException("Cuenta no encontrada"));

            DetalleAsiento detalleAsiento = new DetalleAsiento();
            detalleAsiento.setCuenta(cuenta);
            detalleAsiento.setAsientoContable(asiento);
            detalleAsiento.setDebe(detalleDTO.getDebe());
            detalleAsiento.setHaber(detalleDTO.getHaber());

            return detalleAsiento;
        }).collect(Collectors.toList());

        List<DetalleAsiento> detallesGuardados = detalleAsientoRepository.saveAll(detallesAsiento);

        return detallesGuardados.stream()
                .<DetalleAsientoDTO>map(detalle -> modelMapper.map(detalle, DetalleAsientoDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene todos los detalles de un asiento contable por su ID.
     * @param asientoId ID del asiento contable.
     * @return Lista de detalles del asiento.
     */
    public List<DetalleAsientoDTO> obtenerDetallesPorAsientoId(Long asientoId) {
        List<DetalleAsiento> detallesAsiento = detalleAsientoRepository.findAll().stream()
                .filter(detalle -> detalle.getAsientoContable().getId().equals(asientoId))
                .collect(Collectors.toList());

        if (detallesAsiento.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron detalles para el asiento con ID: " + asientoId);
        }

        return detallesAsiento.stream()
                .map(detalle -> modelMapper.map(detalle, DetalleAsientoDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene la cantidad de movimientos que ha hecho un usuario.
     * @param usuarioId ID del usuario.
     * @return Cantidad de movimientos del usuario.
     */
    public long contarMovimientosPorUsuario(Long usuarioId) {
        return detalleAsientoRepository.countByUsuarioId(usuarioId);
    }

    /**
     * Validación para impedir la modificación o eliminación de un asiento una vez que ha sido registrado.
     * Los detalles tampoco se pueden modificar o eliminar si el asiento ha sido guardado.
     */
    public void validarAsientoNoModificable(Long asientoId) {
        throw new UnsupportedOperationException("Los asientos contables y sus detalles no pueden ser modificados o eliminados una vez registrados.");
    }
}
