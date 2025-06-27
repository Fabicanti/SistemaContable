package com.SistemaContable.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SistemaContable.DTO.ConceptoReciboDTO;
import com.SistemaContable.Entities.Concepto;
import com.SistemaContable.Entities.ConceptoRecibo;
import com.SistemaContable.Entities.Recibo;
import com.SistemaContable.Repositories.ConceptoReciboRepository;
import com.SistemaContable.Repositories.ConceptoRepository;
import com.SistemaContable.Repositories.ReciboRepository;

@Service
public class ConceptoReciboService {

    @Autowired
    private ConceptoReciboRepository conceptoReciboRepository;

    @Autowired
    private ReciboRepository reciboRepository;

    @Autowired
    private ConceptoRepository conceptoRepository;

    public ConceptoRecibo crearConceptoRecibo(ConceptoReciboDTO conceptoReciboDTO){
        ConceptoRecibo conceptoRecibo = new ConceptoRecibo();

        Recibo recibo = reciboRepository.findById(conceptoReciboDTO.getReciboId())
            .orElseThrow(() -> new IllegalArgumentException("Recibo no encontrado"));
        conceptoRecibo.setRecibo(recibo);

        Concepto concepto = conceptoRepository.findById(conceptoReciboDTO.getConceptoId())
            .orElseThrow(() -> new IllegalArgumentException("Concepto no encontrado"));
        conceptoRecibo.setConcepto(concepto);

        conceptoRecibo.setValorConcepto(conceptoReciboDTO.getValorConcepto());

        return conceptoReciboRepository.save(conceptoRecibo);
    }
    
    public ConceptoRecibo conceptoReciboSinDTO(long reciboId, long conceptoId, double valorConcepto){
        ConceptoReciboDTO conceptoReciboDTO = new ConceptoReciboDTO(reciboId, conceptoId, valorConcepto);
        return crearConceptoRecibo(conceptoReciboDTO);
    }
}
