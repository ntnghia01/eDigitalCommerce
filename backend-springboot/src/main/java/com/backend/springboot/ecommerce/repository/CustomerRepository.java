package com.backend.springboot.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.springboot.ecommerce.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByCustomerPhone(String customerPhone);
    // @Query("SELECT c FROM Customer c WHERE c.customerPhone = :customerPhone")
    // Optional<Customer> findByCustomerPhone(@Param("customerPhone") String customerPhone);
    Boolean existsByCustomerPhone(String customerPhone);
}
