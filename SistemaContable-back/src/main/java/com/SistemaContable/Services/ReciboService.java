package com.SistemaContable.Services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SistemaContable.DTO.ConceptoReciboDTO;
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
    // El reciboDTO solo necesita: fechaDeposito, banco, empresaId y empleadoId. El resto se calcula/genera luego.
    public Recibo agregarDatos(ReciboDTO reciboDTO){
        Recibo recibo = new Recibo();

        recibo.setFechaDeposito(reciboDTO.getFechaDeposito());
        setFechas(recibo);

        recibo.setBanco(reciboDTO.getBanco());

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

        return nuevoRecibo;
    }

    // Devuelve el nombre del mes (PeriodoPago) y la fecha con mes/año (MesPago).
    // Tiene en cuenta el dia de deposito: si se hace entre el 1 y el 15, el pago corresponde al mes pasado. Si esta entre el 16 y 31, corresponde al mes actual.
    public void setFechas(Recibo recibo){
        LocalDate fecha = recibo.getFechaDeposito();
        String[] meses = {"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"};
        int nroMes = fecha.getMonthValue();

        if(fecha.getDayOfMonth() <= 15){
            nroMes-=1;
        }

        recibo.setPeriodoPago(meses[nroMes - 1]);
        recibo.setMesPago(nroMes + "/" + fecha.getYear());
    }

    // De esta función para abajo, excepto el mapToDTO, las estoy probando/arreglando. 
    public void agregarSueldoBase(Recibo recibo){
        double valorConcepto = recibo.getEmpleado().getSalarioBasico();
        ConceptoReciboDTO conceptoReciboDTO = new ConceptoReciboDTO(recibo.getId(),(long) 1,valorConcepto);
        ConceptoRecibo conceptoSueldo = conceptoReciboService.crearConceptoRecibo(conceptoReciboDTO);
        recibo.setConceptoRecibo(conceptoSueldo);
    }

    public void calcularTotales(Recibo recibo){
        List<ConceptoRecibo> conceptos = recibo.getConceptosRecibos();
        for(ConceptoRecibo concepto : conceptos){
            switch (concepto.getConcepto().getTipo()) {
                case "G":
                    recibo.setTotalGravadas(recibo.getTotalGravadas() + concepto.getValorConcepto());
                    break;

                case "E":
                    recibo.setTotalExentas(recibo.getTotalExentas() + concepto.getValorConcepto());
                    break;

                case "D":
                    recibo.setTotalDescuentos(recibo.getTotalDescuentos() + concepto.getValorConcepto());
                    break;
            
                default:
                    break;
            }
        }
        reciboRepository.save(recibo);
    }

    public void calcularConceptosObligatorios(Recibo recibo){
        ConceptoRecibo conceptoRecibo = conceptoReciboService.crearConceptoReciboVacio();
        conceptoRecibo.setRecibo(recibo);
        List<Concepto> conceptos = conceptoRepository.findByObligatorio(true);
        conceptos.removeFirst();
        for(Concepto concepto : conceptos){
            conceptoRecibo.setConcepto(concepto);
            conceptoRecibo.setValorConcepto(recibo.getTotalGravadas() * concepto.getPorcentaje());
            recibo.setConceptoRecibo(conceptoRecibo);
        }
        reciboRepository.save(recibo);
    }

    public void calcularPresentismo(Recibo recibo){
        Concepto presentismo = conceptoRepository.findById((long) 5).get();
        double valorConcepto = recibo.getEmpleado().getSalarioBasico() * presentismo.getPorcentaje();
        ConceptoRecibo conceptoRecibo = conceptoReciboService.crearConceptoReciboVacio();
        conceptoRecibo.setRecibo(recibo);
        conceptoRecibo.setConcepto(presentismo);
        conceptoRecibo.setValorConcepto(valorConcepto);
        recibo.setConceptoRecibo(conceptoRecibo);
        reciboRepository.save(recibo);
    }

    public void calcularTotalNeto(Recibo recibo){
        double totalNeto = recibo.getTotalGravadas() + recibo.getTotalExentas() - recibo.getTotalDescuentos();
        recibo.setTotalNeto(totalNeto);
        reciboRepository.save(recibo);
    }

    public ReciboDTO mapToDTO(Recibo recibo){
        ReciboDTO reciboDTO = new ReciboDTO();
        reciboDTO.setId(recibo.getId());
        reciboDTO.setFechaDeposito(recibo.getFechaDeposito());
        reciboDTO.setMesPago(recibo.getMesPago());
        reciboDTO.setPeriodoPago(recibo.getPeriodoPago());
        reciboDTO.setBanco(recibo.getBanco());
        reciboDTO.setTotalGravadas(recibo.getTotalGravadas());
        reciboDTO.setTotalDescuentos(recibo.getTotalDescuentos());
        reciboDTO.setTotalExentas(recibo.getTotalExentas());
        reciboDTO.setTotalNeto(recibo.getTotalNeto());
        reciboDTO.setEmpresaId(recibo.getEmpresa().getId());
        reciboDTO.setEmpleadoId(recibo.getEmpleado().getId());
        reciboDTO.setEmpleadorNombre(recibo.getEmpleador().getApellido() + " " + recibo.getEmpleador().getNombre());
        
        return reciboDTO;
    }
    
}
