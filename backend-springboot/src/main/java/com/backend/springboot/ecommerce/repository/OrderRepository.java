package com.backend.springboot.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.springboot.ecommerce.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o WHERE o.user.userId = :customerId")
    List<Order> findOrderByCustomerID(@Param("customerId") int customerId);

    @Query("SELECT o FROM Order o WHERE o.shipper.userId = :shipperId ORDER BY o.orderStatus ASC")
    List<Order> findOrderByShipperID(@Param("shipperId") int shipperId);

    @Query("SELECT o FROM Order o WHERE o.orderCode = :orderCode AND o.orderStatus <> -1")
    Optional<Order> findOrderByOrderCode(@Param("orderCode") String orderCode);
}
