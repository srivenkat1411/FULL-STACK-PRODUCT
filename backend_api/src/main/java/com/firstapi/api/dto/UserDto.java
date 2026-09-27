package com.firstapi.api.dto;

import jakarta.validation.constraints.NotBlank;

public class UserDto {
    @NotBlank String username;

    @NotBlank String password;

    @NotBlank String email;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
