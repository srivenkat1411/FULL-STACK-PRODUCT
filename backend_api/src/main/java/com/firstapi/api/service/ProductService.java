package com.firstapi.api.service;

import com.firstapi.api.dto.UpdateProductQuantityRequest;
import com.firstapi.api.model.Product;
import com.firstapi.api.repo.ProductRepository;
import com.firstapi.api.exception.GlobalExceptionHandler;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    private final ProductRepository repo;
    private final Map<Long, Product> store = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(1);

    public Product createProduct(Product product)
    {
        return repo.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return repo.findById(id);
    }

    public Optional<Product> getProductByName(String name) {
        return repo.findByNameIgnoreCase(name);
    }

    public List<Product> getAllProducts()
    {
        return repo.findAll();
    }

    public boolean deleteProduct(Long id) {
        return store.remove(id) != null;
    }

    @Transactional
    public void updateproductQuantity(String name, UpdateProductQuantityRequest body)
    {
        validateInputs(name,body);
        Product p = repo.findByNameIgnoreCase(body.name())
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + body.name()));

        if (p.getId() != body.id())
            throw new IllegalArgumentException("Body id does not match DB record for name=" + body.name());

        p.setQuantity(body.quantity());
        repo.save(p);
    }

    private static void validateInputs(String pathName, UpdateProductQuantityRequest body) {
        if (!pathName.equals(body.name()))
            throw new IllegalArgumentException("Path variable name and body.name must match");

        if(body.quantity() == null)
        {
            throw new IllegalArgumentException("Quantity must be greater than or equal to 0");
        }
    }
}
