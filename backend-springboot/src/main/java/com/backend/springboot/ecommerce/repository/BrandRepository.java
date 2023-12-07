package com.backend.springboot.ecommerce.repository;

import com.backend.springboot.ecommerce.entity.Brand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    @Query("SELECT b FROM Brand b WHERE b.brandStatus <> -1")
    List<Brand> findAllBrand();

    @Query("SELECT b FROM Brand b WHERE (b.brandName LIKE %:brandName% OR b.brandDesc LIKE %:brandName%) AND b.brandStatus <> -1")
    List<Brand> findBrandByName(@Param("brandName") String brandName);
}
