package com.SistemaContable.Services;

import com.SistemaContable.DTO.TipoCuentaDTO;
import com.SistemaContable.Entities.TipoCuenta;
import com.SistemaContable.Repositories.TipoCuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TipoCuentaService {

    @Autowired
    private TipoCuentaRepository tipoCuentaRepository;

    // Método para crear un nuevo tipo de cuenta
    public TipoCuentaDTO crearTipoCuenta(TipoCuentaDTO tipoCuentaDTO) {
        TipoCuenta tipoCuenta = new TipoCuenta();
        tipoCuenta.setNombre(tipoCuentaDTO.getNombre());

        tipoCuenta = tipoCuentaRepository.save(tipoCuenta);

        return mapToDTO(tipoCuenta);
    }

    // Método para obtener todos los tipos de cuenta
    public List<TipoCuentaDTO> obtenerTodosLosTiposCuenta() {
        List<TipoCuenta> tiposCuenta = tipoCuentaRepository.findAll();
        return tiposCuenta.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Método para obtener un tipo de cuenta por ID
    public TipoCuentaDTO obtenerTipoCuentaPorId(Long id) {
        Optional<TipoCuenta> tipoCuenta = tipoCuentaRepository.findById(id);
        return tipoCuenta.map(this::mapToDTO).orElse(null);
    }

    // Método para actualizar un tipo de cuenta
    public TipoCuentaDTO actualizarTipoCuenta(Long id, TipoCuentaDTO tipoCuentaDTO) {
        Optional<TipoCuenta> tipoCuentaOpt = tipoCuentaRepository.findById(id);

        if (tipoCuentaOpt.isPresent()) {
            TipoCuenta tipoCuenta = tipoCuentaOpt.get();
            tipoCuenta.setNombre(tipoCuentaDTO.getNombre());

            tipoCuenta = tipoCuentaRepository.save(tipoCuenta);

            return mapToDTO(tipoCuenta);
        }

        return null; // Manejar este caso en el controlador o lanzar excepción
    }
    // Método para eliminar un tipo de cuenta por ID
    public boolean eliminarTipoCuenta(Long id) {
        if (tipoCuentaRepository.existsById(id)) {
            tipoCuentaRepository.deleteById(id);
            return true;
        }
        return false; // Manejar este caso en el controlador
    }

    // Método para convertir una entidad TipoCuenta en TipoCuentaDTO
    private TipoCuentaDTO mapToDTO(TipoCuenta tipoCuenta) {
        return new TipoCuentaDTO(tipoCuenta.getId(), tipoCuenta.getNombre());
    }
}
