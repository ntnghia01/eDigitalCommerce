package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Order;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.OrderRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/shipper")
public class ShipperController {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllShipper() {
        List<User> shippers = userRepository.findAllShipperAvailable();
        return new ResponseEntity<>(shippers, HttpStatus.OK);
    }

    @PutMapping("/startShip/{orderId}")
    public ResponseEntity<?> startShip(@PathVariable Integer orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setOrderShipping(LocalDateTime.now());
            order.setOrderStatus(3);
            Order savedOrder = orderRepository.save(order);
            System.out.println("Start ship Order: " + savedOrder.getOrderId());
            return ResponseEntity.ok(new MessageResponse("Start ship successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/shipped/{orderId}")
    public ResponseEntity<?> shipped(@PathVariable Integer orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setOrderShipped(LocalDateTime.now());
            order.setOrderStatus(4);
            Order savedOrder = orderRepository.save(order);
            System.out.println("Start ship Order: " + savedOrder.getOrderId());
            return ResponseEntity.ok(new MessageResponse("Shipped successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order not found!"), HttpStatus.NOT_FOUND);
        }
    }

}
