package com.SistemaContable.Services;

import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.DTO.CuentaDTO;
import com.SistemaContable.Repositories.CuentaRepository;
import com.SistemaContable.Repositories.TipoCuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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
        String nuevoCodigo = generarCodigoCuenta(cuentaDTO);
        cuentaDTO.setCodigoCuenta(nuevoCodigo);
        controlarTipo(cuentaDTO);
        setearSaldo(cuentaDTO);
        Cuenta cuenta = mapToEntity(cuentaDTO);
        Cuenta nuevaCuenta = cuentaRepository.save(cuenta);
        return mapToDTO(nuevaCuenta);
    }

    // Método para actualizar una cuenta existente
    public CuentaDTO actualizarCuenta(Long id, CuentaDTO cuentaDTO) {
        Cuenta cuenta = cuentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        cuenta.setNombre(cuentaDTO.getNombre());

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
        cuentas.remove(cuentaRepository.findByCodigoCuenta("00000")); // Borra del listado la cuenta raíz. 
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

    /**
     * Método para eliminar una cuenta por ID
     * Elimina la cuenta si esta no tiene movimientos (DetalleAsiento) asociados ni es cuenta padre de
     * otras cuentas.
     * @param id es el ID de la cuenta a eliminar
     */
    public void eliminarCuenta(Long id) {
        Long cantidadMovimientos = cuentaRepository.countMovimientosByCuentaId(id);

        Long cantidadSubCuentas = cuentaRepository.countByCuentaPadreId(id);

        if (cantidadSubCuentas > 0)
            throw new ResponseStatusException(HttpStatus
                    .CONFLICT, "No se puede eliminar la cuenta porque tiene cuentas hijas asociadas.");

        if (cantidadMovimientos > 0)
            throw new ResponseStatusException(HttpStatus
                    .CONFLICT, "No se puede eliminar la cuenta porque tiene movimientos asociados.");

        try {
            cuentaRepository.deleteById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar la cuenta.");
        }
    } //Si las cuentas a borrar tienen movimientos asociados deberiamos "esconder" la cuenta del usuario sin eliminarla realmente. 

    // Método privado para mapear de Cuenta a CuentaDTO
    private CuentaDTO mapToDTO(Cuenta cuenta) {
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

    // Método privado para mapear de CuentaDTO a Cuenta
    private Cuenta mapToEntity(CuentaDTO cuentaDTO) {
        Cuenta cuenta = new Cuenta();
        cuenta.setNombre(cuentaDTO.getNombre());
        cuenta.setCodigoCuenta(cuentaDTO.getCodigoCuenta());
        cuenta.setSaldo(cuentaDTO.getSaldo());
        cuenta.setRecibeSaldo(cuentaDTO.getRecibeSaldo());

        // Asigna el tipo de cuenta si está presente
        if (cuentaDTO.getTipoCuentaId() != null) {
            tipoCuentaRepository.findById(cuentaDTO.getTipoCuentaId())
                    .ifPresent(cuenta::setTipoCuenta);
        }

        // Asigna la cuenta padre si está presente (para subcuentas) y mientras no reciba saldo. 
        boolean recibeSaldoPadre = cuentaRepository.findById(cuentaDTO.getCuentaPadreId()).get().getRecibeSaldo();
        if (cuentaDTO.getCuentaPadreId() != null && recibeSaldoPadre == false) {
            cuentaRepository.findById(cuentaDTO.getCuentaPadreId())
                    .ifPresent(cuenta::setCuentaPadre);            
        }
        return cuenta;
    }

    public List<String> obtenerNombresCuentas(){
        return cuentaRepository.findAllNombresCuentas();
    }

    private void setearSaldo(CuentaDTO cuentaDTO){
        if(cuentaDTO.getRecibeSaldo()){
            cuentaDTO.setSaldo(0);
        }
        else{
            cuentaDTO.setSaldo(-1);
        }

    }

    //Controla que el tipo de la cuenta coincida con el padre. Si no coincide, le setea el tipo de cuenta del padre.
    private void controlarTipo(CuentaDTO cuentaDTO){
        Cuenta padre = cuentaRepository.findById(cuentaDTO.getCuentaPadreId()).get();
        Long tipoPadre = padre.getTipoCuenta().getId();
        Long tipoHijo = cuentaDTO.getTipoCuentaId();
        if(tipoPadre != tipoHijo && tipoPadre != 1){
            cuentaDTO.setTipoCuentaId(tipoPadre);
            cuentaDTO.setTipoCuentaNombre(padre.getTipoCuenta().getNombre());
        }
    }

    // Método para asignarle el codigo a una cuenta. 
    // Va "descomponiendo" el codigo del padre o del ultimo hijo del padre para obtener uno nuevo.
    private String generarCodigoCuenta(CuentaDTO cuentaDTO){
        Cuenta cuenta_aux;
        String codigo_aux, nuevoCodigo;
        int aux;
        Long cantidadHijos;
        
        //Acá entran las unicas 5 cuentas que no tienen padre: activo, pasivo, patrimonio, resultado positivo y resultado negativo. 
        if(cuentaDTO.getCuentaPadreId() == null){
            cuentaDTO.setCuentaPadreId(cuentaRepository.findIdByNombreCuenta("Raiz")); 
            cantidadHijos = cuentaRepository.countByCuentaPadreId(cuentaDTO.getCuentaPadreId());

            if(cantidadHijos == 0){
                cuenta_aux = cuentaRepository.findById(cuentaDTO.getCuentaPadreId()).get();
            }
            else{
                cuenta_aux = cuentaRepository.findUltimoHijo(cuentaDTO.getCuentaPadreId());
            }
            codigo_aux = cuenta_aux.getCodigoCuenta();
            aux = Integer.parseInt(codigo_aux.substring(0,1)) +1;
            nuevoCodigo = aux + "";
        }
        else{
            cuenta_aux = cuentaRepository.findById(cuentaDTO.getCuentaPadreId()).get();
            codigo_aux = cuenta_aux.getCodigoCuenta();
            nuevoCodigo = codigo_aux.substring(0, 1);
            cantidadHijos = cuentaRepository.countByCuentaPadreId(cuentaDTO.getCuentaPadreId());
            int x = 1;
            int y = 3;
            if(cantidadHijos == 0){
                while(!codigo_aux.substring(x, y).equals("00")){
                    nuevoCodigo += codigo_aux.substring(x, y);
                    x += 2;
                    y += 2;
                }
            }
            else{
                cuenta_aux = cuentaRepository.findUltimoHijo(cuentaDTO.getCuentaPadreId());
                codigo_aux = cuenta_aux.getCodigoCuenta();
                while(y+2 <= codigo_aux.length() && !codigo_aux.substring(x+2, y+2).equals("00")){
                    nuevoCodigo += codigo_aux.substring(x, y);
                    x += 2;
                    y += 2;
                }
            }
            aux = Integer.parseInt(codigo_aux.substring(x,y))+1;
            if(aux <= 9){
                nuevoCodigo += "0" + aux;
            }
            else{
                nuevoCodigo += aux + "";
            }
        }  
        while(nuevoCodigo.length() < 5){
            nuevoCodigo+= "0";
        }
        return nuevoCodigo;
    }

}