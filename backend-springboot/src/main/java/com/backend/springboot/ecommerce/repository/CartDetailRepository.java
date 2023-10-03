package com.backend.springboot.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.springboot.ecommerce.entity.CartDetail;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    
}
