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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.CartDetail;
import com.backend.springboot.ecommerce.entity.User;
import com.backend.springboot.ecommerce.entity.Order;
import com.backend.springboot.ecommerce.entity.OrderDetail;
import com.backend.springboot.ecommerce.entity.Payment;
import com.backend.springboot.ecommerce.payload.request.OrderRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.payload.response.OrderResponseDto;
import com.backend.springboot.ecommerce.repository.CartDetailRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;
import com.backend.springboot.ecommerce.service.EmailService;
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
    private UserRepository customerRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private EmailService emailService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailByOrderId(@PathVariable Integer orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findOrderDetailByOrderId(orderId);
        return new ResponseEntity<List<OrderDetail>>(orderDetails, HttpStatus.OK);
    }

    @GetMapping("/history/{customerId}")
    public ResponseEntity<List<Order>> getOrderByCustomerId(@PathVariable Integer customerId) {
        List<Order> orders = orderRepository.findOrderByCustomerID(customerId);
        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDto orderRequestDto) {
        Optional<User> customerOptional = customerRepository.findById(orderRequestDto.getCustomerId());
        Optional<Payment> paymeOptional = paymentRepository.findById(orderRequestDto.getPaymentId());

        if (customerOptional.isPresent() && paymeOptional.isPresent()) {
            User customer = customerOptional.get();
            Payment payment = paymeOptional.get();

            Order newOrder = new Order();
            // Dòng gán giá trị uuid cho thuộc tính orderCode
            // UUID code = UUID.randomUUID();
            String code = customer.getUserId() + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            newOrder.setOrderCode(code);
            newOrder.setUser(customer);
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

            if (orderRequestDto.getPaymentId() == 2) {
                newOrder.setOrderPaid(LocalDateTime.now());
            }

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

            // Gửi email chúc mừng khi đặt hàng thành công
            
            // String to = customer.getUserEmail(); // Địa chỉ email của người nhận
            // String subject = "Chúc mừng! Đơn hàng của bạn đã được đặt thành công";
            // String message = "Xin chào, " + customer.getUserName() + "!<br/><br/>"
            //         + "Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được nhận và đang được xử lý.<br/><br/>"
            //         + "Thông tin đơn hàng:<br/>"
            //         + "Mã đơn hàng: " + savedOrder.getOrderCode() + "<br/>"
            //         + "Thời gian đặt hàng: " + savedOrder.getOrderTime() + "<br/><br/>"
            //         + "Xin cảm ơn và chúc bạn một ngày tốt lành!";
            
            // // Gửi email khi đặt hàng thành công
            // emailService.sendEmail2(to, subject, message);

            return ResponseEntity.ok(new MessageResponse("Create order successfully!!!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Customer or Payment not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/confirm/{orderId}")
    public ResponseEntity<?> confirmOrder(@PathVariable Integer orderId, @RequestBody OrderRequestDto orderRequestDto) {
        Optional<User> adminOptional = customerRepository.findById(orderRequestDto.getAdminId());
        Optional<User> shipperOptional = customerRepository.findById(orderRequestDto.getShipperId());
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (shipperOptional.isPresent() && orderOptional.isPresent()) {
            Order order = orderOptional.get();
            User admin = adminOptional.get();
            User shipper = shipperOptional.get();
            order.setAdmin(admin);
            order.setShipper(shipper);
            order.setOrderConfirmed(LocalDateTime.now());
            order.setOrderStatus(2);
            Order savedOrder = orderRepository.save(order);
            System.out.println("Saved Order: " + savedOrder);
            return ResponseEntity.ok(new MessageResponse("Confirm Order successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order or Shipper not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count/{customerId}")
    public ResponseEntity<?> countOrder (@PathVariable Integer customerId) {
        List<Order> orders = orderRepository.findOrderByCustomerID(customerId);
        int count = 0;
        for (Order order : orders) {
            System.out.println(order.getOrderCode());
            count ++;
        }
        OrderResponseDto orderResponseDto = new OrderResponseDto();
        orderResponseDto.setOrderCount(count);
        return ResponseEntity.ok(orderResponseDto);
    }

    @GetMapping("/byShipperId/{shipperId}")
    public ResponseEntity<?> getOrderByShipperId (@PathVariable Integer shipperId) {
        List<Order> orders = orderRepository.findOrderByShipperID(shipperId);
        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @PutMapping("/confirmPayment/{orderId}")
    public ResponseEntity<?> confirmPayment(@PathVariable Integer orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setOrderPaid(LocalDateTime.now());
            Order savedOrder = orderRepository.save(order);
            System.out.println("Order paid: " + savedOrder.getOrderId());
            return ResponseEntity.ok(new MessageResponse("Paid successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/complete/{orderId}")
    public ResponseEntity<?> completeOrder(@PathVariable Integer orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setOrderCompleted(LocalDateTime.now());
            order.setOrderStatus(5);
            Order savedOrder = orderRepository.save(order);
            System.out.println("Order completed: " + savedOrder.getOrderId());
            return ResponseEntity.ok(new MessageResponse("Completed successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order not found!"), HttpStatus.NOT_FOUND);
        }
    }






}
