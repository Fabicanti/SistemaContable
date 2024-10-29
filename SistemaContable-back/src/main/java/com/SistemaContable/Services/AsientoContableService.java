package com.SistemaContable.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.SistemaContable.Actualizadores.ActualizadorSaldo;
import com.SistemaContable.Actualizadores.SumaDebeRestaHaber;
import com.SistemaContable.Actualizadores.SumaHaberRestaDebe;
import com.SistemaContable.DTO.AsientoDTO;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import com.SistemaContable.Entities.AsientoContable;
import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Entities.DetalleAsiento;
import com.SistemaContable.Entities.Usuario;
import com.SistemaContable.Exceptions.UsuarioNoEncontradoException;
import com.SistemaContable.Repositories.AsientoContableRepository;
import com.SistemaContable.Repositories.CuentaRepository;
import com.SistemaContable.Repositories.UsuarioRepository;
import org.springframework.web.server.ResponseStatusException;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.List;
import java.time.LocalDate;
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
        asientoDTO.setUsuarioId(asientoContable.getUsuario().getId());
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"El asiento debe tener al menos un detalle.");
        }

        AsientoContable asientoContable = new AsientoContable();

        // Se verifica la fecha antes de guardar. 
        asientoContable.setFecha(controlFecha(asientoDTO.getFecha()));
        asientoContable.setDescripcion(asientoDTO.getDescripcion());

        // Buscar y asignar usuario
        Usuario usuario = usuarioRepository.findById(asientoDTO.getUsuarioId())
                .orElseThrow(() -> new UsuarioNoEncontradoException("Usuario no encontrado"));
        asientoContable.setUsuario(usuario);

        // Procesar los detalles del asiento
        List<DetalleAsiento> detalles = asientoDTO.getDetalles().stream().map(detalleDTO -> {
            DetalleAsiento detalleAsiento = new DetalleAsiento();
            // Verifica que no haya debe o haber en negativo, ni que ambos sean cero. 
            if((detalleDTO.getDebe() > 0 && detalleDTO.getHaber() == 0) || (detalleDTO.getDebe() == 0 && detalleDTO.getHaber() > 0)){
                detalleAsiento.setDebe(detalleDTO.getDebe());
                detalleAsiento.setHaber(detalleDTO.getHaber());
            }
            else{
                throw new ResponseStatusException(
                        HttpStatus.UNPROCESSABLE_ENTITY,"El saldo ingresado es negativo.");
            }

            // Buscar y asignar cuenta
            Cuenta cuenta = cuentaRepository.findById(detalleDTO.getCuentaId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,"La cuenta no fue encontrada."));
            // Verifica que la cuenta seleccionada pueda utilizarse (mientras no tenga hijos)        
            Long subCuentas = cuentaRepository.countByCuentaPadreId(cuenta.getId());
            if(subCuentas == 0 && cuenta.getSaldo() >= 0){
                detalleAsiento.setCuenta(cuenta);
            }
            else{
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "La cuenta seleccionada no puede utilizarse");
            }

            // Esta parte se encarga de actualizar el saldo de la cuenta. 
            char opcion;
            double monto = detalleDTO.getDebe();
            
            if(monto != 0){
                opcion ='d';
            }
            else{
                opcion ='h';
                monto = detalleDTO.getHaber();
            }

            cuenta = controlSaldo(cuenta, opcion, monto);
            cuentaRepository.save(cuenta);

            detalleAsiento.setAsientoContable(asientoContable);
            return detalleAsiento;
        }).collect(Collectors.toList());

        // Validar que los totales de debe y haber sean iguales
        double totalDebe = detalles.stream().mapToDouble(DetalleAsiento::getDebe).sum();
        double totalHaber = detalles.stream().mapToDouble(DetalleAsiento::getHaber).sum();

        if (totalDebe != totalHaber) {
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"Los totales del DEBE y HABER NO son iguales.");
        }

        asientoContable.setDetalles(detalles);


        // Guardar el asiento contable y los detalles
        try{
            return asientoContableRepository.save(asientoContable);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar la cuenta.");
        }
//        return asientoContableRepository.save(asientoContable);
    }

    // Verifica que la fecha del nuevo asiento esté entre la fecha del ultimo asiento (incluida) y hoy (incluida).
    // Modifique el método para que la fecha del nuevo asiento esté después de la fecha del último asiento.
    private LocalDate controlFecha(LocalDate fechaAsiento){
        long cantAsientos = asientoContableRepository.count();
        LocalDate fechaNuevoAsiento = fechaAsiento;
        LocalDate hoy = LocalDate.now();

        if(cantAsientos == 0){
            if(fechaNuevoAsiento.equals(hoy) || fechaNuevoAsiento.isBefore(hoy)){
                return fechaAsiento;
            } else{
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "La fecha debe ser igual o anterior a la fecha de hoy: " + hoy);
            }
        } else {
            LocalDate ultimaFecha = asientoContableRepository.findUltimaFecha();
            LocalDate fechaUltimoAsiento = ultimaFecha;

            if(fechaNuevoAsiento.isEqual(fechaUltimoAsiento) || (fechaNuevoAsiento.isAfter(fechaUltimoAsiento) && fechaNuevoAsiento.isBefore(hoy)) || fechaNuevoAsiento.equals(hoy)){
                return fechaAsiento;
            }
            else{
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "La fecha debe estar entre la fecha del ultimo asiento y la fecha actual: " + fechaUltimoAsiento + " al " + hoy);
            }
        }
    }
    
    // Realiza las verificaciones de saldo y lo actualiza en la cuenta.
    private Cuenta controlSaldo(Cuenta cuenta, char opcion, double monto){
        String tipoCuenta = cuenta.getTipoCuenta().getNombre();
        ActualizadorSaldo actualizadorSaldo;
        if(tipoCuenta.equals("ACTIVO") || tipoCuenta.equals("RESULTADO NEGATIVO")){
            actualizadorSaldo = new SumaDebeRestaHaber();
        }
        else{
            actualizadorSaldo = new SumaHaberRestaDebe();
        }
        return actualizadorSaldo.actualizarSaldo(cuenta, opcion, monto);
    }
}
