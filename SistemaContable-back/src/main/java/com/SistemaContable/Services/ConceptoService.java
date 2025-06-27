package com.SistemaContable.Services;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.SistemaContable.DTO.ConceptoDTO;
import com.SistemaContable.Entities.Concepto;
import com.SistemaContable.Repositories.ConceptoRepository;

@Service
public class ConceptoService {

    @Autowired
    private ConceptoRepository conceptoRepository;

    // No vi necesario crear una tabla para controlar 3 tipos de conceptos
    private ArrayList<String> tipos = new ArrayList<>(Arrays.asList("G", "E", "D"));

    // Para crear un concepto, cosa que no veo necesaria pero está por las dudas, si no tiene algun porcentaje necesario para calcular, asignarle un 1 para evitar errores. 
    public Concepto agregarConcepto(ConceptoDTO conceptoDTO){
        Concepto concepto = new Concepto();

        if(!tipos.contains(conceptoDTO.getTipo().toUpperCase())){
             throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,"El tipo de concepto ingresado no es válido");
        }
        concepto.setTipo(conceptoDTO.getTipo());
        concepto.setNombre(conceptoDTO.getNombre());
        
        concepto.setPorcentaje(conceptoDTO.getPorcentaje());

        return conceptoRepository.save(concepto);
    }


}
