package com.firstapi.api.dto;

public record AuthResponse 
    
(
    String token,
    String username,
    String role
) {}
