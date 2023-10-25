package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
// import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.CartDetail;
import com.backend.springboot.ecommerce.entity.Customer;
import com.backend.springboot.ecommerce.entity.Order;
import com.backend.springboot.ecommerce.entity.OrderDetail;
import com.backend.springboot.ecommerce.entity.Payment;
import com.backend.springboot.ecommerce.payload.request.OrderRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CartDetailRepository;
import com.backend.springboot.ecommerce.repository.CustomerRepository;
import com.backend.springboot.ecommerce.repository.OrderDetailRepository;
import com.backend.springboot.ecommerce.repository.OrderRepository;
import com.backend.springboot.ecommerce.repository.PaymentRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/order")
public class OrderController {
    
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerRepository customerRepository;
    // @Autowired
    // private ShipperRepository shipperRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    // @Autowired
    // private AdminRepository adminRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDto orderRequestDto) {
        Optional<Customer> customerOptional = customerRepository.findById(orderRequestDto.getCustomerId());
        Optional<Payment> paymeOptional = paymentRepository.findById(orderRequestDto.getPaymentId());

        if (customerOptional.isPresent() && paymeOptional.isPresent()) {
            Customer customer = customerOptional.get();
            Payment payment = paymeOptional.get();

            Order newOrder = new Order();
            // Dòng gán giá trị uuid cho thuộc tính orderCode
            // UUID code = UUID.randomUUID();
            String code = customer.getCustomerId() + "_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            newOrder.setOrderCode(code);
            newOrder.setCustomer(customer);
            newOrder.setPayment(payment);
            newOrder.setOrderTime(LocalDateTime.now());
            newOrder.setOrderName(orderRequestDto.getOrderName());
            newOrder.setOrderPhone(orderRequestDto.getOrderPhone());
            newOrder.setOrderAddress(orderRequestDto.getOrderAddress());
            newOrder.setOrderNote(orderRequestDto.getOrderNote());
            newOrder.setOrderShipFee(orderRequestDto.getOrderShipFee());
            LocalDateTime orderTime = newOrder.getOrderTime();
            LocalDateTime orderShipExpected = orderTime.plusDays(7);
            newOrder.setOrderShipExpected(orderShipExpected);
            newOrder.setOrderTotalAmount(orderRequestDto.getOrderTotalAmount());
            newOrder.setOrderStatus(1);
            newOrder.setOrderCreatedAt(LocalDateTime.now());
            newOrder.setOrderUpdatedAt(LocalDateTime.now());

            Order savedOrder = orderRepository.save(newOrder);
            List<CartDetail> cartDetails = cartDetailRepository.findCartDetailByCustomerID(orderRequestDto.getCustomerId());

            for (CartDetail cartDetail : cartDetails) {
                OrderDetail newOrderDetail = new OrderDetail();
                newOrderDetail.setOrder(savedOrder);
                newOrderDetail.setProduct(cartDetail.getProduct());
                newOrderDetail.setOrderDetailQuantity(cartDetail.getCartDetailQuantity());
                newOrderDetail.setOrderDetailCreatedAt(LocalDateTime.now());
                newOrderDetail.setOrderDetailUpdatedAt(LocalDateTime.now());
                OrderDetail savedOrderDetail = orderDetailRepository.save(newOrderDetail);
                System.out.println("Saved: #" + savedOrderDetail.getOrderDetailId());
                // Delete cartDetail
                System.out.println("Deleted: #" + cartDetail.getCartDetailId());
                cartDetailRepository.delete(cartDetail);
            }
            return ResponseEntity.ok(new MessageResponse("Create order successfully!!!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Customer or Payment not found!"), HttpStatus.NOT_FOUND);
        }
    }



}
