package com.backend.springboot.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.springboot.ecommerce.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
    @Query("SELECT o FROM OrderDetail o WHERE o.order.orderId = :orderId")
    List<OrderDetail> findOrderDetailByOrderId(@Param("orderId") int orderId);

    @Query("SELECT o FROM OrderDetail o WHERE o.order.orderCode = :orderCode")
    List<OrderDetail> findOrderDetailByOrderCode(@Param("orderCode") String orderCode);

    @Query("SELECT SUM(od.orderDetailQuantity * p.proPrice) " +
    "FROM OrderDetail od " +
    "JOIN od.order o " +
    "JOIN od.product p " +
    "WHERE EXTRACT(QUARTER FROM o.orderTime) = :quarter")
    Integer getTotalAmountByQuarter(int quarter);
}
