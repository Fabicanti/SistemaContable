package com.SistemaContable.DTO;

public class PasswordDTO {
    private Long userId;
    private String oldPassword;
    private String newPassword;

    public PasswordDTO(){ }

    public PasswordDTO(String oldPassword, String newPassword, Long userId) {
        this.userId = userId;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
