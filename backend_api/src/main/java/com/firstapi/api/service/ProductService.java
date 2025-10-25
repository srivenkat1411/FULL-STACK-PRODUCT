package com.firstapi.api.service;

import com.firstapi.api.model.Product;
import com.firstapi.api.repo.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

    public Product getProductById(Long id) {
        return store.get(id);
    }

    public List<Product> getAllProducts()
    {
        return new ArrayList<>(store.values());
    }

    public boolean deleteProduct(Long id) {
        return store.remove(id) != null;
    }
}
