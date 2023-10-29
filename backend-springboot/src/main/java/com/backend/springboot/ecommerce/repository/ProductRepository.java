package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.proStatus <> -1")
    List<Product> findAllProduct();

    @Query("SELECT p FROM Product p WHERE p.proStatus = 1")
    List<Product> findAllProductAvailable();

    @Query("SELECT p FROM Product p WHERE p.proName LIKE %:proName% AND p.proStatus <> -1")
    List<Product> findProductByName(@Param("proName") String proName);
    
}
