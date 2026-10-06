package com.SistemaContable;

import com.SistemaContable.DTO.AsientoDTO;
import com.SistemaContable.DTO.CuentaDTO;
import com.SistemaContable.DTO.DetalleAsientoDTO;
import com.SistemaContable.Entities.Cuenta;
import com.SistemaContable.Repositories.AsientoContableRepository;
import com.SistemaContable.Repositories.CuentaRepository;
import com.SistemaContable.Services.AsientoContableService;
import com.SistemaContable.Services.CuentaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest(properties = {
        "spring.security.oauth2.client.registration.github.client-id=test",
        "spring.security.oauth2.client.registration.github.client-secret=test",
        "spring.security.oauth2.client.registration.google.client-id=test",
        "spring.security.oauth2.client.registration.google.client-secret=test"
})
@Transactional
class CuentaBorradoLogicoIntegrationTests {

    @Autowired
    private CuentaService cuentaService;

    @Autowired
    private AsientoContableService asientoContableService;

    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private AsientoContableRepository asientoContableRepository;

    @Test
    void unaCuentaNuevaQuedaActiva() {
        Cuenta padre = cuentaPorCodigo("40200");
        CuentaDTO nueva = new CuentaDTO();
        nueva.setNombre("Otros ingresos");
        nueva.setRecibeSaldo(true);
        nueva.setTipoCuentaId(padre.getTipoCuenta().getId());
        nueva.setCuentaPadreId(padre.getId());

        CuentaDTO creada = cuentaService.crearCuenta(nueva);

        assertThat(creada.getActiva()).isTrue();
        assertThat(cuentaRepository.findById(creada.getId())).get().extracting(Cuenta::getActiva).isEqualTo(true);
    }

    @Test
    void unaCuentaPuedeDesactivarse() {
        Cuenta cuenta = cuentaPorCodigo("10101");

        cuentaService.eliminarCuenta(cuenta.getId());

        assertThat(cuentaRepository.findById(cuenta.getId())).get().extracting(Cuenta::getActiva).isEqualTo(false);
    }

    @Test
    void desactivarNoEliminaElRegistro() {
        Cuenta cuenta = cuentaPorCodigo("10102");

        cuentaService.eliminarCuenta(cuenta.getId());

        assertThat(cuentaRepository.existsById(cuenta.getId())).isTrue();
    }

    @Test
    void unaCuentaConMovimientosHistoricosPuedeDesactivarse() {
        Cuenta cuenta = cuentaPorCodigo("10101");
        registrarAsiento(cuenta, cuentaPorCodigo("40101"));

        cuentaService.eliminarCuenta(cuenta.getId());

        assertThat(cuentaRepository.findById(cuenta.getId())).get().extracting(Cuenta::getActiva).isEqualTo(false);
        assertThat(cuentaRepository.countMovimientosByCuentaId(cuenta.getId())).isEqualTo(1L);
    }

    @Test
    void unaCuentaInactivaNoPuedeUsarseEnUnNuevoAsiento() {
        Cuenta cuenta = cuentaPorCodigo("10101");
        cuentaService.eliminarCuenta(cuenta.getId());

        assertThatThrownBy(() -> registrarAsiento(cuenta, cuentaPorCodigo("40101")))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(error -> {
                    ResponseStatusException exception = (ResponseStatusException) error;
                    assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
                    assertThat(exception.getReason()).contains("está inactiva");
                });
    }

    @Test
    void unaCuentaInactivaConservaSusMovimientosHistoricos() {
        Cuenta cuenta = cuentaPorCodigo("10101");
        registrarAsiento(cuenta, cuentaPorCodigo("40101"));
        cuentaService.eliminarCuenta(cuenta.getId());

        assertThat(asientoContableRepository.findByFechaBetweenAndCuentaId(
                LocalDate.now(), LocalDate.now(), cuenta.getId())).hasSize(1);
    }

    @Test
    void noSePuedeDesactivarUnaCuentaConHijasActivas() {
        Cuenta cuentaPadre = cuentaPorCodigo("10100");

        assertThatThrownBy(() -> cuentaService.eliminarCuenta(cuentaPadre.getId()))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(error -> {
                    ResponseStatusException exception = (ResponseStatusException) error;
                    assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
                    assertThat(exception.getReason()).contains("cuentas hijas activas");
                });
    }

    @Test
    void unaCuentaPuedeReactivarse() {
        Cuenta cuenta = cuentaPorCodigo("10101");
        cuentaService.eliminarCuenta(cuenta.getId());

        CuentaDTO reactivada = cuentaService.reactivarCuenta(cuenta.getId());

        assertThat(reactivada.getActiva()).isTrue();
        assertThat(cuentaRepository.findById(cuenta.getId())).get().extracting(Cuenta::getActiva).isEqualTo(true);
    }

    @Test
    void noSePuedeReactivarUnaCuentaSiSuPadreEstaInactivo() {
        Cuenta cuentaPadre = cuentaPorCodigo("10200");
        List<Cuenta> hijas = List.copyOf(cuentaPadre.getSubCuentas());
        hijas.forEach(hija -> cuentaService.eliminarCuenta(hija.getId()));
        cuentaService.eliminarCuenta(cuentaPadre.getId());

        assertThatThrownBy(() -> cuentaService.reactivarCuenta(hijas.get(0).getId()))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(error -> {
                    ResponseStatusException exception = (ResponseStatusException) error;
                    assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
                    assertThat(exception.getReason()).contains("cuenta padre está inactiva");
                });
    }

    @Test
    void losListadosOperativosExcluyenCuentasInactivas() {
        Cuenta cuenta = cuentaPorCodigo("10101");
        cuentaService.eliminarCuenta(cuenta.getId());

        assertThat(cuentaService.obtenerCuentasOperativas())
                .extracting(CuentaDTO::getId)
                .doesNotContain(cuenta.getId());
        assertThat(cuentaService.obtenerNombresCuentas()).doesNotContain(cuenta.getNombre());
        assertThat(cuentaService.obtenerTodasLasCuentas())
                .filteredOn(dto -> dto.getId().equals(cuenta.getId()))
                .singleElement()
                .extracting(CuentaDTO::getActiva)
                .isEqualTo(false);
    }

    private Cuenta cuentaPorCodigo(String codigo) {
        return cuentaRepository.findByCodigoCuenta(codigo);
    }

    private void registrarAsiento(Cuenta cuentaDebe, Cuenta cuentaHaber) {
        DetalleAsientoDTO debe = new DetalleAsientoDTO();
        debe.setCuentaId(cuentaDebe.getId());
        debe.setDebe(100);
        debe.setHaber(0);

        DetalleAsientoDTO haber = new DetalleAsientoDTO();
        haber.setCuentaId(cuentaHaber.getId());
        haber.setDebe(0);
        haber.setHaber(100);

        AsientoDTO asiento = new AsientoDTO();
        asiento.setFecha(LocalDate.now());
        asiento.setDescripcion("Asiento de prueba para borrado lógico");
        asiento.setUsuarioId(1L);
        asiento.setDetalles(List.of(debe, haber));
        asientoContableService.registrarAsiento(asiento);
    }
}
