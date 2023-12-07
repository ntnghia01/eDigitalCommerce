package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    @Query("SELECT s FROM Supplier s WHERE s.supplierStatus <> -1")
    List<Supplier> findAllSupplier();

    @Query("SELECT b FROM Supplier b WHERE (b.supplierName LIKE %:supplierName% OR b.supplierEmail LIKE %:supplierName% OR b.supplierPhone LIKE %:supplierName% OR b.supplierAddress LIKE %:supplierName%) AND b.supplierStatus <> -1")
    List<Supplier> findSupplierByName(@Param("supplierName") String supplierName);
}
