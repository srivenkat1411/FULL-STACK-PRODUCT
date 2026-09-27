package com.firstapi.api.controller;

import com.firstapi.api.dto.UpdateProductQuantityRequest;
import com.firstapi.api.dto.ProductResponse;
import com.firstapi.api.model.Product;
import com.firstapi.api.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Tag(name = "Products")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> listAll() {
        List<Product> products = productService.getAllProducts();
        if (products == null || products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No products found");
        }
        return ResponseEntity.ok(products.stream().map(ProductResponse::from).toList());
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody Product product) {
        Product saved = productService.createProduct(product);
        return ResponseEntity.created(URI.create("/api/products/" + saved.getId()))
                .body(ProductResponse.from(saved));
    }

    @PostMapping("/me")
    public ResponseEntity<ProductResponse> createForAuthenticatedUser(@RequestBody Product product) {
        Product saved = productService.createProductForAuthenticatedUser(product);
        return ResponseEntity.created(URI.create("/api/products/" + saved.getId()))
                .body(ProductResponse.from(saved));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
        return ResponseEntity.of(productService.getProductById(id).map(ProductResponse::from));
    }

    @Operation(summary = "Get by name", description = "Case-insensitive lookup")
    @GetMapping("/name/{name}")
    public ResponseEntity<ProductResponse> getByName(@PathVariable String name) {
        return ResponseEntity.of(productService.getProductByName(name).map(ProductResponse::from));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{name}/quantity-update")
    public ResponseEntity<Void> updateQuantity(@PathVariable String name, @RequestBody UpdateProductQuantityRequest body)
    {
        productService.updateproductQuantity(name,body);
        return ResponseEntity.noContent().build();
    }


}
