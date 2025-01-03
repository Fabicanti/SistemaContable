package com.SistemaContable.Services;

import com.SistemaContable.DTO.DashboardDTO;
import com.SistemaContable.Repositories.AsientoContableRepository;
import com.SistemaContable.Repositories.DetalleAsientoRepository;
import com.SistemaContable.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DetalleAsientoRepository detalleAsientoRepository;

    @Autowired
    private AsientoContableRepository asientoContableRepository;

    public DashboardDTO getDashboard(Long id) {
        DashboardDTO dashboard = new DashboardDTO();
        Long totalUsuarios = usuarioRepository.count();
        Long totalDetalles = detalleAsientoRepository.countByUsuarioId(id);
        Long totalAsientos = asientoContableRepository.count();

        dashboard.setCantidadTotalUsuarios(totalUsuarios);
        dashboard.setCantidadMovimientos(totalDetalles);
        dashboard.setCantidadAsientos(totalAsientos);
        return dashboard;
    }
}
