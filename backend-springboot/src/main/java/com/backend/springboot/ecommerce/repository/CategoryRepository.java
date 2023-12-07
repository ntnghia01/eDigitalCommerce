package com.backend.springboot.ecommerce.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.cateStatus <> -1")
    List<Category> findAllCategory();

    @Query("SELECT c FROM Category c WHERE (c.cateName LIKE %:cateName% OR c.cateDesc LIKE %:cateName%) AND c.cateStatus <> -1")
    List<Category> findCategoryByName(@Param("cateName") String cateName);
}
