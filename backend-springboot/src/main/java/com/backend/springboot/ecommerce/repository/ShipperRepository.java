package com.backend.springboot.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.springboot.ecommerce.entity.Shipper;

public interface ShipperRepository extends JpaRepository<Shipper, Integer> {
    // Optional<Shipper> findByShipperUsername(String shipperUsername);
    @Query("SELECT s FROM Shipper s WHERE s.shipperUsername = :shipperUsername")
    Optional<Shipper> findByShipperUsername(@Param("shipperUsername") String shipperUsername);

    Boolean existsByShipperUsername(String shipperUsername);
    // @Query("SELECT s FROM Shipper s WHERE s.shipperUsername = :shipperUsername")
    // Optional<Shipper> existsByShipperUsername(@Param("shipperUsername") String shipperUsername);

    @Query("SELECT s FROM Shipper s WHERE s.shipperStatus <> -1")
    List<Shipper> findAllShippers();
}
