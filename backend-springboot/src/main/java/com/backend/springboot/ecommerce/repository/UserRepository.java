package com.backend.springboot.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.springboot.ecommerce.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserPhone(String userPhone);
    // @Query("SELECT c FROM Customer c WHERE c.customerPhone = :customerPhone")
    // Optional<Customer> findByCustomerPhone(@Param("customerPhone") String customerPhone);
    Boolean existsByUserPhone(String userPhone);
    Boolean existsByUserPhoneAndUserStatus(String userPhone, Integer userStatus);

    @Query("SELECT shipper FROM User shipper WHERE shipper.userRole = 3 and shipper.userStatus <> -1")
    List<User> findAllShipperAvailable();

    @Query("SELECT u FROM User u WHERE u.userStatus <> -1 AND u.userPhone = :userPhone AND u.userId <> :customerId")
    Optional<User> findUserByPhoneExcludingUserId(@Param("customerId") Integer customerId, @Param("userPhone") String userPhone);

    @Query("SELECT u FROM User u WHERE u.userStatus <> -1 AND u.userEmail = :userEmail AND u.userId <> :customerId")
    Optional<User> findUserByEmailExcludingUserId(@Param("customerId") Integer customerId, @Param("userEmail") String userEmail);

    @Query("SELECT u FROM User u WHERE u.userRole = 1 and u.userStatus <> -1")
    List<User> findAllCustomer();

    @Query("SELECT u FROM User u WHERE u.userRole = 2 and u.userStatus <> -1")
    List<User> findAllAdmin();

    @Query("SELECT u FROM User u WHERE u.userRole = 3 and u.userStatus <> -1")
    List<User> findAllShipper();

    @Query("SELECT b FROM User b WHERE (b.userName LIKE %:search% OR b.userPhone LIKE %:search% OR b.userEmail LIKE %:search%) AND b.userRole = :userRole AND b.userStatus <> -1")
    List<User> findUserFollowRole(@Param("search") String search, @Param("userRole") Integer userRole);

}
