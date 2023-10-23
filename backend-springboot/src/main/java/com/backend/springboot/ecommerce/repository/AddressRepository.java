package com.backend.springboot.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.springboot.ecommerce.entity.Address;
import com.backend.springboot.ecommerce.entity.Product;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    @Query("SELECT a FROM Address a WHERE a.customer.customerId = :customerId AND a.addressStatus <> -1")
    List<Address> findByCustomerID(@Param("customerId") int customerId);

    @Query("SELECT a FROM Address a WHERE a.customer.customerId = :customerId AND a.addressStatus = 2")
    Optional<Address> findDefaultAddressByCustomerID(@Param("customerId") int customerId);

    @Query("SELECT a FROM Address a WHERE a.addressStatus <> -1")
    List<Product> findAllAddress();
}
