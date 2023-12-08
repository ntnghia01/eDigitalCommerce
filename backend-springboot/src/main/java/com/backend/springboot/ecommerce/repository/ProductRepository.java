package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.proStatus <> -1 ORDER BY p.proCreatedAt DESC")
    List<Product> findAllProduct();

    @Query("SELECT p FROM Product p WHERE p.proStatus = 1")
    List<Product> findAllProductAvailable();

    @Query("SELECT p FROM Product p WHERE p.proStatus = 1 ORDER BY p.proCreatedAt DESC")
    List<Product> findAllProductAvailableDESC();

    @Query("SELECT p FROM Product p WHERE (p.proName LIKE %:proName% OR p.proDesc LIKE %:proName%) AND p.proStatus =1")
    List<Product> findProductAvailableByName(@Param("proName") String proName);

    @Query("SELECT p FROM Product p WHERE (p.proName LIKE %:proName% OR p.proDesc LIKE %:proName%) AND p.proStatus <> -1 ORDER BY p.proCreatedAt DESC")
    List<Product> findProductByName(@Param("proName") String proName);

    @Query("SELECT p FROM Product p WHERE p.category.cateId = :cateId AND p.proStatus =1 ORDER BY p.proCreatedAt DESC")
    List<Product> findProductByCateID(@Param("cateId") Integer cateId);

    @Query("SELECT p FROM Product p WHERE p.brand.brandId = :brandId AND p.proStatus <> -1 ORDER BY p.proCreatedAt DESC")
    List<Product> findProductByBrandID(@Param("brandId") Integer brandId);
    

    @Query("SELECT od.product, SUM(od.orderDetailQuantity) AS totalSoldQuantity " +
    "FROM OrderDetail od " +
    "GROUP BY od.product " +
    "ORDER BY totalSoldQuantity DESC")
List<Product> findMostSoldProducts();


}
