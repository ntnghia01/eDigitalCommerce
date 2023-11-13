package com.backend.springboot.ecommerce.controller;

// import java.net.URLEncoder;
// import java.io.ObjectInputFilter.Config;
// import java.nio.charset.StandardCharsets;
// import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.token.Sha512DigestUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.backend.springboot.ecommerce.config.Config;
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

    @PostMapping("/create")
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

    // @GetMapping("/create_payment")
    // public ResponseEntity<?> createPaymentVNPAY() {
    //     // String vnp_Version = "2.1.0";
    //     // String vnp_Command = "pay";
    //     // String vnp_OrderInfo = req.getParameter("vnp_OrderInfo");
    //     // String orderType = req.getParameter("ordertype");
    //     String vnp_TxnRef = Config.getRandomNumber(8);
        
    //     String vnp_OrderInfo = "Thanh toan don hang: " + vnp_TxnRef; // them sau
    //     // String vnp_IpAddr = Config.getIpAddress(req);
    //     String vnp_TmnCode = Config.vnp_TmnCode;

    //     String vnp_Version = Config.vnp_Version;
    //     String vnp_Command = Config.vnp_Command;

    //     // int amount = Integer.parseInt(req.getParameter("amount")) * 100;
    //     int amount = 1000;
    //     Map vnp_Params = new HashMap<>();
    //     vnp_Params.put("vnp_Version", vnp_Version);
    //     vnp_Params.put("vnp_Command", vnp_Command);
    //     vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
    //     vnp_Params.put("vnp_Amount", String.valueOf(amount));
    //     vnp_Params.put("vnp_CurrCode", "VND");

    //     vnp_Params.put("vnp_BankCode", "NCB");

    //     // String bank_code = req.getParameter("bankcode");
    //     // if (bank_code != null && !bank_code.isEmpty()) {
    //     //     vnp_Params.put("vnp_BankCode", bank_code);
    //     // }
    //     vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
    //     vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo); //thanh toan orderID
    //     vnp_Params.put("vnp_OrderType", orderType);

    //     vnp_Params.put("vnp_Locale", "vn"); // them sau

    //     // String locate = req.getParameter("language");
    //     // if (locate != null && !locate.isEmpty()) {
    //     //     vnp_Params.put("vnp_Locale", locate);
    //     // } else {
    //     //     vnp_Params.put("vnp_Locale", "vn");
    //     // }
    //     // vnp_Params.put("vnp_ReturnUrl", Config.vnp_Returnurl);
    //     // vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
    //     Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

    //     SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
    //     String vnp_CreateDate = formatter.format(cld.getTime());

    //     vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
    //     cld.add(Calendar.MINUTE, 15);
    //     String vnp_ExpireDate = formatter.format(cld.getTime());
    //     //Add Params of 2.1.0 Version
    //     vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
    //     //Billing
    //     vnp_Params.put("vnp_Bill_Mobile", req.getParameter("txt_billing_mobile"));
    //     vnp_Params.put("vnp_Bill_Email", req.getParameter("txt_billing_email"));
    //     String fullName = (req.getParameter("txt_billing_fullname")).trim();
    //     if (fullName != null && !fullName.isEmpty()) {
    //         int idx = fullName.indexOf(' ');
    //         String firstName = fullName.substring(0, idx);
    //         String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
    //         vnp_Params.put("vnp_Bill_FirstName", firstName);
    //         vnp_Params.put("vnp_Bill_LastName", lastName);

    //     }
    //     vnp_Params.put("vnp_Bill_Address", req.getParameter("txt_inv_addr1"));
    //     vnp_Params.put("vnp_Bill_City", req.getParameter("txt_bill_city"));
    //     vnp_Params.put("vnp_Bill_Country", req.getParameter("txt_bill_country"));
    //     if (req.getParameter("txt_bill_state") != null && !req.getParameter("txt_bill_state").isEmpty()) {
    //         vnp_Params.put("vnp_Bill_State", req.getParameter("txt_bill_state"));
    //     }
    //     // Invoice
    //     vnp_Params.put("vnp_Inv_Phone", req.getParameter("txt_inv_mobile"));
    //     vnp_Params.put("vnp_Inv_Email", req.getParameter("txt_inv_email"));
    //     vnp_Params.put("vnp_Inv_Customer", req.getParameter("txt_inv_customer"));
    //     vnp_Params.put("vnp_Inv_Address", req.getParameter("txt_inv_addr1"));
    //     vnp_Params.put("vnp_Inv_Company", req.getParameter("txt_inv_company"));
    //     vnp_Params.put("vnp_Inv_Taxcode", req.getParameter("txt_inv_taxcode"));
    //     vnp_Params.put("vnp_Inv_Type", req.getParameter("cbo_inv_type"));
    //     //Build data to hash and querystring
    //     List fieldNames = new ArrayList(vnp_Params.keySet());
    //     Collections.sort(fieldNames);
    //     StringBuilder hashData = new StringBuilder();
    //     StringBuilder query = new StringBuilder();
    //     Iterator itr = fieldNames.iterator();
    //     while (itr.hasNext()) {
    //         String fieldName = (String) itr.next();
    //         String fieldValue = (String) vnp_Params.get(fieldName);
    //         if ((fieldValue != null) && (fieldValue.length() > 0)) {
    //             //Build hash data
    //             hashData.append(fieldName);
    //             hashData.append('=');
    //             hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
    //             //Build query
    //             query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
    //             query.append('=');
    //             query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
    //             if (itr.hasNext()) {
    //                 query.append('&');
    //                 hashData.append('&');
    //             }
    //         }
    //     }
    //     String queryUrl = query.toString();
    //     String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
    //     queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
    //     String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
    //     // com.google.gson.JsonObject job = new JsonObject();
    //     // job.addProperty("code", "00");
    //     // job.addProperty("message", "success");
    //     // job.addProperty("data", paymentUrl);
    //     // Gson gson = new Gson();
    //     // resp.getWriter().write(gson.toJson(job));
    // }
        //vui lòng tham khảo thêm tại code demo
        

}