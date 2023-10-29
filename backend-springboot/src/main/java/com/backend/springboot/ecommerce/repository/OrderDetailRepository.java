package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.springboot.ecommerce.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
    @Query("SELECT o FROM OrderDetail o WHERE o.order.orderId = :orderId")
    List<OrderDetail> findOrderDetailByOrderId(@Param("orderId") int orderId);
}
