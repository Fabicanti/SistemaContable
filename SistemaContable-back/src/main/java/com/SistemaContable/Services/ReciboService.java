package com.SistemaContable.Services;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.SistemaContable.DTO.ReciboDTO;
import com.SistemaContable.Entities.Concepto;
import com.SistemaContable.Entities.ConceptoRecibo;
import com.SistemaContable.Entities.Empleado;
import com.SistemaContable.Entities.Empresa;
import com.SistemaContable.Entities.Recibo;
import com.SistemaContable.Repositories.ConceptoRepository;
import com.SistemaContable.Repositories.EmpleadoRepository;
import com.SistemaContable.Repositories.EmpresaRepository;
import com.SistemaContable.Repositories.ReciboRepository;

@Service
public class ReciboService {

    @Autowired
    private ReciboRepository reciboRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired 
    private ConceptoRepository conceptoRepository;

    @Autowired
    private ConceptoReciboService conceptoReciboService;

    // Genera el encabezado y agrega todos los datos (no calculados) del recibo. 
    // El reciboDTO solo necesita: fechaDeposito, banco, empresaId, empleadoId y sueldoBase. El resto se calcula/genera luego.
    public Recibo agregarDatos(ReciboDTO reciboDTO){
        Recibo recibo = new Recibo();
        Optional<List<Recibo>> aux = reciboRepository.existsByFechaDepositoAndEmpleado(reciboDTO.getFechaDeposito(), reciboDTO.getEmpleadoId());

        if(aux.get().size() != 0){
            if((reciboDTO.getFechaDeposito().getMonthValue() == 6 || reciboDTO.getFechaDeposito().getMonthValue() == 12) && aux.get().size() == 1){
                recibo.setFechaDeposito(reciboDTO.getFechaDeposito());
                setFechas(recibo);
            }
            else{
                throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"Ya existe el/los recibo/s correspondiente/s para este mes/año");
            }
        }
        else{
            recibo.setFechaDeposito(reciboDTO.getFechaDeposito());
            setFechas(recibo);
        }
        
        recibo.setBanco(reciboDTO.getBanco());

        if(reciboDTO.getSueldoBase() < 0){
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"El sueldo ingresado no es válido");
        }
        recibo.setSueldoBase(reciboDTO.getSueldoBase());

        recibo.setTotalGravadas(0);        
        recibo.setTotalExentas(0);
        recibo.setTotalDescuentos(0);
        recibo.setTotalNeto(0);

        Empresa empresa = empresaRepository.findById(reciboDTO.getEmpresaId())
            .orElseThrow(() -> new IllegalArgumentException("Empresa no encontrada"));
        recibo.setEmpresa(empresa);

        Empleado empleado = empleadoRepository.findById(reciboDTO.getEmpleadoId())
            .orElseThrow(() -> new IllegalArgumentException("Empleado no encontrado"));
        recibo.setEmpleado(empleado);

        recibo.setEmpleador(empleado.getEmpleador());

        Recibo nuevoRecibo = reciboRepository.save(recibo);

        recibo.getEmpleado().setRecibo(nuevoRecibo);

        return nuevoRecibo;
    }

    // Setea el nombre del mes (PeriodoPago) y la fecha con mes/año (MesPago).
    // Tiene en cuenta el dia de deposito: si se hace entre el 1 y el 15, el pago corresponde al mes pasado. Si esta entre el 16 y 31, corresponde al mes actual.
    public void setFechas(Recibo recibo){
        LocalDate fecha = recibo.getFechaDeposito();
        String[] meses = {"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"};
        int nroMes = fecha.getMonthValue();

        if(nroMes == 1 && fecha.getDayOfMonth() <= 15){
            nroMes = 12;
            recibo.setPeriodoPago(meses[meses.length - 1]);
        }
        else{
            if(fecha.getDayOfMonth() <= 15){
                nroMes-=1;
            }
            recibo.setPeriodoPago(meses[nroMes - 1]);
        }

        recibo.setMesPago(nroMes + "/" + fecha.getYear());
    }

    public void agregarConceptoSueldoBase(Recibo recibo){
        double valorConcepto = recibo.getSueldoBase();
        ConceptoRecibo conceptoSueldo = conceptoReciboService.conceptoReciboSinDTO(recibo.getId(), 1, valorConcepto);
        recibo.setConceptoRecibo(conceptoSueldo);
        reciboRepository.save(recibo);
    }

    public void calcularTotales(Recibo recibo, String tipoTotal){
        List<ConceptoRecibo> conceptos = recibo.getConceptosRecibos();
        for(ConceptoRecibo conceptoRecibo : conceptos){
            if(conceptoRecibo.getConcepto().getTipo().equals(tipoTotal)){
                switch (conceptoRecibo.getConcepto().getTipo()) {
                case "G":
                    recibo.setTotalGravadas(recibo.getTotalGravadas() + conceptoRecibo.getValorConcepto());
                    break;

                case "E":
                    recibo.setTotalExentas(recibo.getTotalExentas() + conceptoRecibo.getValorConcepto());
                    break;

                case "D":
                    recibo.setTotalDescuentos(recibo.getTotalDescuentos() + conceptoRecibo.getValorConcepto());
                    break;
            
                default:
                    break;
                }
            }
        }
        reciboRepository.save(recibo);
    }

    public void calcularPresentismo(Recibo recibo){
        Concepto presentismo = conceptoRepository.findById((long) 5).get();
        double valorConcepto = recibo.getSueldoBase() * presentismo.getPorcentaje();
        ConceptoRecibo conceptoPresentismo = conceptoReciboService.conceptoReciboSinDTO(recibo.getId(), (long) 5, valorConcepto);
        recibo.setConceptoRecibo(conceptoPresentismo);
        reciboRepository.save(recibo);
    }

    public void calcularCuotaSindical(Recibo recibo){
        Concepto cuotaSindical = conceptoRepository.findById((long) 6).get();
        double valorConcepto = recibo.getTotalGravadas() * cuotaSindical.getPorcentaje();
        ConceptoRecibo conceptoCuotaSindical = conceptoReciboService.conceptoReciboSinDTO(recibo.getId(), (long) 6, valorConcepto);
        recibo.setConceptoRecibo(conceptoCuotaSindical);
        reciboRepository.save(recibo);
    }

    public void calcularConceptosObligatorios(Recibo recibo){
        List<Concepto> conceptos = conceptoRepository.findByObligatorio(true);
        conceptos.remove(0);
        for(Concepto concepto : conceptos){
            ConceptoRecibo conceptoRecibo = conceptoReciboService.conceptoReciboSinDTO(recibo.getId(), concepto.getId(), 0);
            conceptoRecibo.setValorConcepto(recibo.getTotalGravadas() * concepto.getPorcentaje());
            recibo.setConceptoRecibo(conceptoRecibo);
        }
        reciboRepository.save(recibo);
    }

    public void calcularTotalNeto(Recibo recibo){
        double totalNeto = recibo.getTotalGravadas() + recibo.getTotalExentas() - recibo.getTotalDescuentos();
        recibo.setTotalNeto(totalNeto);
        reciboRepository.save(recibo);
    }

    public void calcularRemGravadas(Recibo recibo, List<Integer> conceptosId){
        agregarConceptoSueldoBase(recibo);
        if(conceptosId.contains(5)){
            calcularPresentismo(recibo);
        }
        calcularTotales(recibo, "G");
    }

    public void calcularRemDescuentos(Recibo recibo, List<Integer> conceptosId){
        calcularConceptosObligatorios(recibo);
        if(conceptosId.contains(6)){
            calcularCuotaSindical(recibo);
        }
        calcularTotales(recibo, "D");
    }

    public ReciboDTO mapToDTO(Recibo recibo){
        ReciboDTO reciboDTO = new ReciboDTO();
        reciboDTO.setId(recibo.getId());
        reciboDTO.setFechaDeposito(recibo.getFechaDeposito());
        reciboDTO.setMesPago(recibo.getMesPago());
        reciboDTO.setPeriodoPago(recibo.getPeriodoPago());
        reciboDTO.setBanco(recibo.getBanco());
        reciboDTO.setSueldoBase(recibo.getSueldoBase());
        reciboDTO.setTotalGravadas(recibo.getTotalGravadas());
        reciboDTO.setTotalDescuentos(recibo.getTotalDescuentos());
        reciboDTO.setTotalExentas(recibo.getTotalExentas());
        reciboDTO.setTotalNeto(recibo.getTotalNeto());
        reciboDTO.setEmpresaId(recibo.getEmpresa().getId());
        reciboDTO.setEmpleadoId(recibo.getEmpleado().getId());
        reciboDTO.setEmpleadorNombre(recibo.getEmpleador().getApellido() + " " + recibo.getEmpleador().getNombre());
        
        return reciboDTO;
    }

    public Recibo generarAguinaldo(ReciboDTO reciboDTO){
        Recibo reciboAguinaldo = agregarDatos(reciboDTO);
        Concepto aguinaldo = conceptoRepository.findById((long) 7).get();
        List<Recibo> recibosPrevios = reciboAguinaldo.getEmpleado().getRecibos();
        int mesActual = reciboAguinaldo.getFechaDeposito().getMonthValue(), mesRecibo;
        int anioActual = reciboAguinaldo.getFechaDeposito().getYear(), anioRecibo;
        double mayorSueldo = 0, valorConcepto;
        for(Recibo recibo : recibosPrevios){
            mesRecibo = recibo.getFechaDeposito().getMonthValue();
            anioRecibo = recibo.getFechaDeposito().getYear();
            if(anioActual == anioRecibo && ((mesActual <= 6 && mesRecibo <= 6) || (mesActual > 6 && mesRecibo > 6))){
                if(recibo.getTotalNeto() > mayorSueldo){
                    mayorSueldo = recibo.getTotalNeto();
                }
            }
        }
        System.out.println(mayorSueldo);
        Period periodoTrabajado = Period.between(reciboAguinaldo.getEmpleado().getFechaIngreso(), reciboAguinaldo.getFechaDeposito());
        if(periodoTrabajado.getYears() == 0 && periodoTrabajado.getMonths() < 6){
            valorConcepto = (mayorSueldo / 365) * periodoTrabajado.getDays();
        }
        else{
            valorConcepto = mayorSueldo * aguinaldo.getPorcentaje();
        }
        ConceptoRecibo conceptoRecibo = conceptoReciboService.conceptoReciboSinDTO(reciboAguinaldo.getId(), aguinaldo.getId(), valorConcepto);
        reciboAguinaldo.setConceptoRecibo(conceptoRecibo);

        reciboAguinaldo.setTotalGravadas(valorConcepto);

        calcularRemDescuentos(reciboAguinaldo, reciboDTO.getConceptosId());
        calcularTotalNeto(reciboAguinaldo);

        return reciboAguinaldo;
    }

    public Recibo generarRecibo(ReciboDTO reciboDTO){
        Recibo nuevoRecibo = agregarDatos(reciboDTO);
        calcularRemGravadas(nuevoRecibo, reciboDTO.getConceptosId());
        calcularRemDescuentos(nuevoRecibo, reciboDTO.getConceptosId());
        calcularTotalNeto(nuevoRecibo);
        return nuevoRecibo;
    }
    /**
     * Aguinaldo = Mejor sueldo * 0,50 o Mejor sueldo / 2
     * Se calcula tomando como base el mejor sueldo de cada semestre (enero a junio y julio a diciembre) y sobre el mismo se aplica el 50%, es decir, el aguinaldo será la mitad del mejor sueldo del semestre.
     * En caso de no haber trabajado los 6 meses completos: Aguinaldo = (Mejor sueldo / 12) * cant meses trabajados
     * 
     * 1- Se genera en JUNIO y DICIEMBRE. Tomando el mes de la FECHA DE DEPÓSITO.
     * 2- Es un recibo a parte (más el recibo común), con todos los conceptos obligatorios incluidos + sindicato (si lo tiene). 
     * 3- Toma el total neto más alto, para calcular (necesito los recibos anteriores).
     * 
     */

     //CONTROLAR QUE NO HAYA 2 RECIBOS EN LA MISMA FECHA
}
