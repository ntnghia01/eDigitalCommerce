package com.backend.springboot.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.springboot.ecommerce.entity.Shipper;

public interface ShipperRepository extends JpaRepository<Shipper, Integer> {
    
}
