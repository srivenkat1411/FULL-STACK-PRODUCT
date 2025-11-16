package com.firstapi.api.controller;

import com.firstapi.api.dto.UpdateProductQuantityRequest;
import com.firstapi.api.model.Product;
import com.firstapi.api.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
    public List<Product> listAll() {
        return productService.getAllProducts();
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        Product saved = productService.createProduct(product);
        return ResponseEntity.created(URI.create("/api/products/" + saved.getId()))
                .body(saved);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Product>> getById(@PathVariable Long id) {
        Optional<Product> p = productService.getProductById(id);
        if (p.isPresent())
            return ResponseEntity.ok(p);
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Get by name", description = "Case-insensitive lookup")
    @GetMapping("/name/{name}")
    public ResponseEntity<Optional<Product>> getByName(@PathVariable String name) {
        Optional<Product> p = productService.getProductByName(name);
        if (p.isPresent())
            return ResponseEntity.ok(p);
        return ResponseEntity.notFound().build();
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
