package com.SistemaContable.Exceptions;

public class ErrorMessage {
    private String message;
    private int status;
    private String details;
    public ErrorMessage(String message, int status, String details) {
        this.message = message;
        this.status = status;
        this.details = details;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
