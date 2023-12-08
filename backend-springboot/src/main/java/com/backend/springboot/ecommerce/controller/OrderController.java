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
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.entity.Supplier;
import com.backend.springboot.ecommerce.payload.request.OrderRequestDto;
import com.backend.springboot.ecommerce.payload.request.SupplierRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.payload.response.OrderResponseDto;
import com.backend.springboot.ecommerce.repository.CartDetailRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;
import com.backend.springboot.ecommerce.service.EmailService;
import com.backend.springboot.ecommerce.repository.OrderDetailRepository;
import com.backend.springboot.ecommerce.repository.OrderRepository;
import com.backend.springboot.ecommerce.repository.PaymentRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;


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
    private ProductRepository productRepository;

    @Autowired
    private EmailService emailService;



    @GetMapping
    public ResponseEntity<List<Order>> getAllOrder() {
        List<Order> orders = orderRepository.findAllOrder();
        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailByOrderId(@PathVariable Integer orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findOrderDetailByOrderId(orderId);
        return new ResponseEntity<List<OrderDetail>>(orderDetails, HttpStatus.OK);
    }

    @GetMapping("/orderDetailByCode/{orderCode}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailByOrderCode(@PathVariable String orderCode) {
        List<OrderDetail> orderDetails = orderDetailRepository.findOrderDetailByOrderCode(orderCode);
        return new ResponseEntity<List<OrderDetail>>(orderDetails, HttpStatus.OK);
    }

    @GetMapping("/history/{customerId}")
    public ResponseEntity<List<Order>> getOrderByCustomerId(@PathVariable Integer customerId) {
        List<Order> orders = orderRepository.findOrderByCustomerID(customerId);
        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @PostMapping("/history/search")
    public ResponseEntity<List<Order>> searchOrderHistory(@RequestBody OrderRequestDto searchData) {
        List<Order> orders;
        if (searchData.getOrderCode() == "") {
            orders = orderRepository.findOrderByCustomerID(searchData.getCustomerId());
        } else {
            orders = orderRepository.searchOrder(searchData.getCustomerId(), searchData.getOrderCode());
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
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
                Optional<Product> productOptional = productRepository.findById(cartDetail.getProduct().getProId());

                Product product = productOptional.get();
                product.setProQuantity(product.getProQuantity()-cartDetail.getCartDetailQuantity());

                productRepository.save(product);
                System.err.println("Reduce: " + product.getProId());

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

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
            String formattedOrderTime = savedOrder.getOrderTime().format(formatter);
            
            String to = customer.getUserEmail(); // Địa chỉ email của người nhận
            String subject = "E-STORE CONGRATULATES YOU ON YOUR SUCCESSFULLY ORDER!!!";
            String message = "Xin chào, " + customer.getUserName() + "!<br/><br/>"
                    + "Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được nhận và đang được xử lý.<br/><br/>"
                    + "THÔNG TIN ĐƠN HÀNG:<br/>"
                    + "Mã đơn hàng: " + savedOrder.getOrderCode() + "<br/>"
                    + "Thời gian đặt hàng: " + formattedOrderTime + "<br/><br/>"
                    + "Xin cảm ơn và chúc bạn một ngày tốt lành!";
            
            // Gửi email khi đặt hàng thành công
            emailService.sendEmail(to, subject, message);

            return ResponseEntity.ok(new MessageResponse("Create order successfully!!!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Customer or Payment not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/sendMail")
    public ResponseEntity<?> testMail() {
        try {
            emailService.sendEmail("nghiab1910265@student.ctu.edu.vn", "E-Store", "Chúc mừng");
            return ResponseEntity.ok(new MessageResponse("Send successfully!!!"));
        } catch(Exception e) {
            return new ResponseEntity<>(new MessageResponse("Failed"), HttpStatus.NOT_FOUND);
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

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
            String formattedOrderTime = savedOrder.getOrderTime().format(formatter);
            
            String to = shipper.getUserEmail(); // Địa chỉ email của người nhận
            String subject = "E-STORE DELIVERY NOTIFICATION!!!";
            String message = "Xin chào, " + shipper.getUserName() + "!<br/><br/>"
                    + "Bạn có một đơn hàng mới vừa được phân công. Vui lòng kiểm tra và thực hiện sớm.<br/><br/>"
                    + "THÔNG TIN ĐƠN HÀNG:<br/>"
                    + "Mã đơn hàng: " + savedOrder.getOrderCode() + "<br/>"
                    + "Thời gian đặt hàng: " + formattedOrderTime + "<br/><br/>"
                    + "Xin cảm ơn và chúc bạn một ngày tốt lành!";
            emailService.sendEmail(to, subject, message);

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

    @PostMapping("/byShipperId/search")
    public ResponseEntity<List<Order>> searchOrderByShipperID(@RequestBody OrderRequestDto searchData) {
        List<Order> orders;
        if (searchData.getOrderCode() == "") {
            orders = orderRepository.findOrderByShipperID(searchData.getShipperId());
        } else {
            orders = orderRepository.searchOrderByShipperId(searchData.getShipperId(), searchData.getOrderCode());
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
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

    @PostMapping("/lookup")
    public ResponseEntity<Order> getOrderByOrderCode(@RequestBody OrderRequestDto orderRequestDto) {
        Optional<Order> orderOptional = orderRepository.findOrderByOrderCode(orderRequestDto.getOrderCode());
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            return new ResponseEntity<Order>(order, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/searchByUserName")
    public ResponseEntity<List<Order>> searchOrderByUserName(@RequestBody OrderRequestDto searchData) {
        List<Order> orders;
        if (searchData.getOrderName() == "") {
            orders = orderRepository.findAll(); // Lấy tất cả sản phẩm nếu searchData rỗng
        } else {
            orders = orderRepository.findOrderByUserName(searchData.getOrderName());
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Integer orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setOrderCancelled(LocalDateTime.now());
            Order savedOrder = orderRepository.save(order);
            System.out.println("Request cancel order: " + savedOrder.getOrderId());
            return ResponseEntity.ok(new MessageResponse("Request cancel successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/confirmCancel/{orderId}")
    public ResponseEntity<?> confirmCancelOrder(@PathVariable Integer orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setOrderStatus(-1);
            order.setOrderUpdatedAt(LocalDateTime.now());
            Order savedOrder = orderRepository.save(order);

            List<OrderDetail> orderDetails = orderDetailRepository.findOrderDetailByOrderId(savedOrder.getOrderId());

            for (OrderDetail orderDetail : orderDetails) {
                Optional<Product> productOptional = productRepository.findById(orderDetail.getProduct().getProId());

                Product product = productOptional.get();
                product.setProQuantity(product.getProQuantity()+orderDetail.getOrderDetailQuantity());

                productRepository.save(product);
                System.err.println("Incre: " + product.getProId());


            }
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
            String formattedOrderTime = savedOrder.getOrderTime().format(formatter);
            
            String to = savedOrder.getUser().getUserEmail(); // Địa chỉ email của người nhận
            String subject = "E-STORE ANNOUNCEMENT OF SUCCESSFUL ORDER CANCELLATION!!!";
            String message = "Xin chào, " + savedOrder.getUser().getUserName() + "!<br/><br/>"
                    + "Đơn hàng của bạn đã được hủy!<br/><br/>"
                    + "THÔNG TIN ĐƠN HÀNG:<br/>"
                    + "Mã đơn hàng: " + savedOrder.getOrderCode() + "<br/>"
                    + "Thời gian đặt hàng: " + formattedOrderTime + "<br/><br/>"
                    + "Thời gian hủy: " + savedOrder.getOrderCancelled() + "<br/><br/>"
                    + "Xin lỗi nếu bạn không hài lòng với đơn hàng và mong bạn sẽ trở lại mua hàng!";
            
            // Gửi email khi đặt hàng thành công
            emailService.sendEmail(to, subject, message);
            System.out.println("confirm cancel order: " + savedOrder.getOrderId());
            return ResponseEntity.ok(new MessageResponse("confirm cancel successfully!"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Order not found!"), HttpStatus.NOT_FOUND);
        }
    }


}
