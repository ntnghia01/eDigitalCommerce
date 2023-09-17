package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Brand;
import com.backend.springboot.ecommerce.entity.Category;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.payload.request.ProductRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.BrandRepository;
import com.backend.springboot.ecommerce.repository.CategoryRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> productList = productRepository.findAllProduct();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductRequestDto productRequestDto) {
        Optional<Category> categOptional = categoryRepository.findById(productRequestDto.getCateId());
        Optional<Brand> brandOptional = brandRepository.findById(productRequestDto.getBrandId());
        if (categOptional.isPresent() && brandOptional.isPresent()) {
            Category category = categOptional.get();
            Brand brand = brandOptional.get();
            Product newProduct = new Product();

            newProduct.setCategory(category);
            newProduct.setBrand(brand);
            newProduct.setProName(productRequestDto.getProName());
            newProduct.setProPrice(productRequestDto.getProPrice());
            newProduct.setProDesc(productRequestDto.getProDesc());
            newProduct.setProQuantity(productRequestDto.getProQuantity());
            newProduct.setProStatus(1);
            newProduct.setProCreatedAt(LocalDateTime.now());
            newProduct.setProUpdatedAt(LocalDateTime.now());

            productRepository.save(newProduct);
            return ResponseEntity.ok(new MessageResponse("Add product successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Add product failed"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{proId}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer proId, @RequestBody ProductRequestDto productRequestDto) {
        Optional<Product> proOptional = productRepository.findById(proId);
        Optional<Category> cateOptional = categoryRepository.findById(productRequestDto.getCateId());
        Optional<Brand> brandOptional = brandRepository.findById(productRequestDto.getBrandId());

        if (proOptional.isPresent() && cateOptional.isPresent() && brandOptional.isPresent()) {
            Product product = proOptional.get();
            Category category = cateOptional.get();
            Brand brand = brandOptional.get();

            product.setCategory(category);
            product.setBrand(brand);
            product.setProName(productRequestDto.getProName());
            product.setProPrice(productRequestDto.getProPrice());
            product.setProDesc(productRequestDto.getProDesc());
            product.setProQuantity(productRequestDto.getProQuantity());
            product.setProStatus(productRequestDto.getProStatus());
            product.setProUpdatedAt(LocalDateTime.now());

            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Update product successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{proId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer proId) {
        Optional<Product> proOptional = productRepository.findById(proId);
        if (proOptional.isPresent()) {
            Product product = proOptional.get();
            product.setProStatus(-1);
            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Delete product successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{proId}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer proId) {
        Optional<Product> proOptional = productRepository.findById(proId);
        if (proOptional.isPresent()) {
            Product product = proOptional.get();
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
