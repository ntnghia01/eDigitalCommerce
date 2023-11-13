package com.backend.springboot.ecommerce.controller;

import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.payload.request.VNPAYRequestDto;
import com.backend.springboot.ecommerce.service.VNPayService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/vnpay")
public class VNPayController {
    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/submitOrder")
    public String submidOrder(
                            // @RequestParam("amount") Integer orderTotal,
                            // @RequestParam("orderInfo") String orderInfo,
                            @RequestBody VNPAYRequestDto vnpayRequestDto,
                            HttpServletRequest request){
        // String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String baseUrl = "http://localhost:5173/successfulpayment";
        String vnpayUrl = vnPayService.createOrder(vnpayRequestDto.getAmount(), vnpayRequestDto.getOrderInfo(), baseUrl);
        return vnpayUrl;
    }

    @GetMapping("/vnpay-payment")
    public String GetMapping(HttpServletRequest request){
        int paymentStatus =vnPayService.orderReturn(request);

        // String orderInfo = request.getParameter("vnp_OrderInfo");
        // String paymentTime = request.getParameter("vnp_PayDate");
        // String transactionId = request.getParameter("vnp_TransactionNo");
        // String totalPrice = request.getParameter("vnp_Amount");

        // model.addAttribute("orderId", orderInfo);
        // model.addAttribute("totalPrice", totalPrice);
        // model.addAttribute("paymentTime", paymentTime);
        // model.addAttribute("transactionId", transactionId);

        return paymentStatus == 1 ? "ordersuccess" : "orderfail";
    }
}
