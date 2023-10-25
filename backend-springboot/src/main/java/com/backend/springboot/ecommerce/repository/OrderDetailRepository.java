package com.backend.springboot.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.springboot.ecommerce.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
    
}
