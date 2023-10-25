package com.backend.springboot.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.springboot.ecommerce.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    
}
