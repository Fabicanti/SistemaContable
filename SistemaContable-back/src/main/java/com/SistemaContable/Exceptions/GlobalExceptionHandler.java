package com.SistemaContable.Exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * Este método permite devolver un mensaje personalizado de tipo ErrorMessage para la excepción
     * ResponseStatusException.
     * @param ex es la Excepción invocada
     * @param request Obtiene la URL que causó la excepción.
     * @return el mensaje de tipo ErrorMessage (Mensaje de error personalizado
     * cuando ocurran excepciones específicas. Esto es útil para que el usuario pueda saber qué error tuvo
     * al ejecutar una función.
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorMessage> handle(ResponseStatusException ex, HttpServletRequest request){
        ErrorMessage errorMessage = new ErrorMessage(
                ex.getReason(),
                ex.getStatusCode().value(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(errorMessage, ex.getStatusCode());
    }
}
