package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Payment;
import com.backend.springboot.ecommerce.payload.request.PaymentRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.PaymentRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    
    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentRepository.findAllPayment();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequestDto paymentRequestDto) {
        Payment newPayment = new Payment();
        newPayment.setPaymentName(paymentRequestDto.getPaymentName());
        newPayment.setPaymentExplain(paymentRequestDto.getPaymentExplain());
        newPayment.setPaymentStatus(1);
        newPayment.setPaymentCreatedAt(LocalDateTime.now());
        newPayment.setPaymentUpdatedAt(LocalDateTime.now());
        paymentRepository.save(newPayment);
        return ResponseEntity.ok(new MessageResponse("Create Payment successfully!!!"));
    }
}
