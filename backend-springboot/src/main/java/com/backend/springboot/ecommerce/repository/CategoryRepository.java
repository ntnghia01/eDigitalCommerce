package com.backend.springboot.ecommerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.springboot.ecommerce.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
}
