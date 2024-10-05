package com.SistemaContable.Controllers;

import com.SistemaContable.DTO.DashboardDTO;
import com.SistemaContable.Repositories.UsuarioRepository;
import com.SistemaContable.Services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerDashboard(@PathVariable Long id) {
        if (usuarioRepository.findById(id).isPresent()) {
            DashboardDTO dashboardDTO = dashboardService.getDashboard(id);
            return ResponseEntity.ok(dashboardDTO);
        }
        return ResponseEntity.notFound().build();
    }
}
