package com.SistemaContable.Exceptions;


import java.time.LocalDateTime;

public class ErrorMessage {
    private final String timestamp;
    private String message;
    private int status;
    private String path;
    public ErrorMessage( String message, int status, String details) {
        this.timestamp = LocalDateTime.now().toString();
        this.message = message;
        this.status = status;
        this.path = details;
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
        return path;
    }

    public void setDetails(String details) { this.path = details; }

    public String getTimestamp() { return timestamp; }
}
