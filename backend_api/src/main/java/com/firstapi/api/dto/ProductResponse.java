package com.firstapi.api.dto;

import com.firstapi.api.model.Product;

public record ProductResponse(
        long id,
        String name,
        double price,
        Double quantity,
        String username
) {
    public static ProductResponse from(Product product) {
        String username = product.getUser() == null
                ? null
                : product.getUser().getUsername();

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getQuantity(),
                username
        );
    }
}