package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Import;
import com.backend.springboot.ecommerce.entity.ImportDetail;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.repository.ImportDetailRepository;
import com.backend.springboot.ecommerce.repository.ImportRepository;
import com.backend.springboot.ecommerce.repository.OrderDetailRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;
import com.backend.springboot.ecommerce.repository.ReviewRepository;
import com.backend.springboot.ecommerce.repository.UserRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/revenue")
public class RevenueController {
    
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImportRepository importRepository;

    @Autowired
    private ImportDetailRepository importDetailRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/total-revenue")
    public ResponseEntity<Long> getTotalRevenue() {
        Long totalOrderAmount = getTotalOrderAmount();
        Long totalImportAmount = getTotalImportAmount();

        if (totalOrderAmount != null && totalImportAmount != null) {
            Long totalRevenue =   totalOrderAmount - totalImportAmount;
            return ResponseEntity.ok(totalRevenue);
        }

        return ResponseEntity.badRequest().build();
    }

    private Long getTotalOrderAmount() {
        String jpql = "SELECT SUM(o.orderTotalAmount) FROM Order o";
        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class);
        return query.getSingleResult();
    }

    private Long getTotalImportAmount() {
        String jpql = "SELECT SUM(i.importTotal) FROM Import i";
        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class);
        return query.getSingleResult();
    }

    @GetMapping("/total-product-quantity")
    public ResponseEntity<Integer> getTotalProductQuantity() {
        List<Product> products = productRepository.findByProStatusNot(-1); // Lấy các sản phẩm có proStatus khác -1
    
        if (!products.isEmpty()) {
            int totalQuantity = 0;
    
            // Tính tổng số lượng sản phẩm
            for (Product product : products) {
                totalQuantity += product.getProQuantity();
            }
    
            return ResponseEntity.ok(totalQuantity);
        }
    
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/total-sold-products")
    public ResponseEntity<Long> getTotalSoldProducts() {
        List<Product> allProducts = productRepository.findAll();
        Long totalQuantitySold = 0L;

        for (Product product : allProducts) {
            Long productQuantitySold = productRepository.getTotalQuantitySoldByProduct(product);
            totalQuantitySold += (productQuantitySold != null ? productQuantitySold : 0);
        }

        return ResponseEntity.ok(totalQuantitySold);
    }

    @GetMapping("/total-amount-by-quarter")
    public ResponseEntity<List<Integer>> getTotalAmountByQuarter() {
        List<Import> allImports = importRepository.findAll();
        List<Integer> totalAmountByQuarter = new ArrayList<>();

        for (int quarter = 1; quarter <= 4; quarter++) {
            int totalAmount = 0;

            for (Import anImport : allImports) {
                if (getQuarter(anImport.getImportDate()) == quarter) {
                    List<ImportDetail> importDetails = importDetailRepository.findByImportImport_ImportId(anImport.getImportId());

                    for (ImportDetail importDetail : importDetails) {
                        totalAmount += (importDetail.getImportDetailPrice() * importDetail.getImportDetailQuantity());
                    }
                }
            }

            totalAmountByQuarter.add(totalAmount);
        }

        return ResponseEntity.ok(totalAmountByQuarter);
    }

    private int getQuarter(LocalDateTime dateTime) {
        int month = dateTime.getMonthValue();
        return (int) Math.ceil(month / 3.0);
    }

    @GetMapping("/total-amount-by-quarter2")
    public ResponseEntity<List<Integer>> getTotalAmountByQuarter2() {
        List<Integer> totalAmountByQuarter = new ArrayList<>();

        for (int quarter = 1; quarter <= 4; quarter++) {
            Integer totalAmount = orderDetailRepository.getTotalAmountByQuarter(quarter);
            totalAmountByQuarter.add(totalAmount != null ? totalAmount : 0);
        }

        return ResponseEntity.ok(totalAmountByQuarter);
    }

    @GetMapping("/gender-stats")
    public ResponseEntity<List<Map<String, Object>>> getUserGenderStats() {
        List<Object[]> genderCounts = userRepository.getUserCountByGender();

        List<Map<String, Object>> genderStats = genderCounts.stream().map(row -> {
            Integer count = ((Number) row[0]).intValue();
            String genderLabel = (String) row[1];

            Map<String, Object> map = Map.of("label", genderLabel, "value", count);
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(genderStats);
    }

    @GetMapping("/count-by-rate")
    public ResponseEntity<List<Map<String, Object>>> countReviewsByRateIncludingZero() {
        List<Object[]> reviewCountByRate = reviewRepository.countReviewsByRateIncludingZero(1); // Chuyển trạng thái cần thống kê ở đây
        
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : reviewCountByRate) {
            Map<String, Object> map = new HashMap<>();
            map.put("label", row[1]);
            map.put("value", row[0]);
            result.add(map);
        }
        
        return ResponseEntity.ok(result);
    }

    
}
