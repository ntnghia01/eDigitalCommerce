package com.backend.springboot.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.springboot.ecommerce.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT o FROM Order o ORDER BY o.orderTime DESC")
    List<Order> findAllOrder();

    @Query("SELECT o FROM Order o WHERE o.user.userId = :customerId ORDER BY o.orderTime DESC")
    List<Order> findOrderByCustomerID(@Param("customerId") int customerId);

    @Query("SELECT o FROM Order o WHERE o.user.userId = :customerId AND (o.user.userName LIKE %:search% OR o.orderCode LIKE %:search% OR o.orderNote LIKE %:search%)")
    List<Order> searchOrder(@Param("customerId") int customerId, @Param("search") String search);

    @Query("SELECT o FROM Order o WHERE o.shipper.userId = :shipperId AND (o.user.userName LIKE %:search% OR o.orderCode LIKE %:search% OR o.orderNote LIKE %:search% OR o.user.userPhone LIKE %:search%)")
    List<Order> searchOrderByShipperId(@Param("shipperId") int shipperId, @Param("search") String search);

    @Query("SELECT o FROM Order o WHERE o.shipper.userId = :shipperId ORDER BY o.orderStatus ASC")
    List<Order> findOrderByShipperID(@Param("shipperId") int shipperId);

    @Query("SELECT o FROM Order o WHERE o.orderCode = :orderCode")
    Optional<Order> findOrderByOrderCode(@Param("orderCode") String orderCode);

    @Query("SELECT b FROM Order b WHERE (b.user.userName LIKE %:userName% OR b.orderCode LIKE %:userName% OR b.orderNote LIKE %:userName%) AND b.orderStatus <> -1")
    List<Order> findOrderByUserName(@Param("userName") String userName);


}
