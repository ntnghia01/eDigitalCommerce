package com.backend.springboot.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.springboot.ecommerce.entity.CartDetail;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    @Query("SELECT c FROM CartDetail c WHERE c.cart.cartId = :cartId AND c.product.proId = :proId")
    Optional<CartDetail> existedProduct(@Param("cartId") int cartId, @Param("proId") int proId);

    @Query("SELECT c FROM CartDetail c WHERE c.cart.customer.customerId = :customerId")
    List<CartDetail> findCartDetailByCustomerID(@Param("customerId") int customerId);
}
