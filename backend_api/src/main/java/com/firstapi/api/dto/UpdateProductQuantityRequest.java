package com.firstapi.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateProductQuantityRequest(
        @NotNull long id,
        @NotBlank String name,
        @Min(0) Integer quantity
) {}
