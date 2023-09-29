package com.backend.springboot.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Import;
import com.backend.springboot.ecommerce.entity.ImportDetail;
import com.backend.springboot.ecommerce.entity.Product;
import com.backend.springboot.ecommerce.payload.request.ImportDetailRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.ImportDetailRepository;
import com.backend.springboot.ecommerce.repository.ImportRepository;
import com.backend.springboot.ecommerce.repository.ProductRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/importdetail")
public class ImportDetailController {
    @Autowired
    private ImportDetailRepository importDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImportRepository importRepository;

    // @GetMapping
    // public ResponseEntity<List<ImportDetail>> getAllImportDetail() {
    //     List<ImportDetail> importDetails = importDetailRepository.findAll();
    //     return new ResponseEntity<List<ImportDetail>>(importDetails, HttpStatus.OK);
    // }

    @PostMapping
    public ResponseEntity<?> createImportDetail(@RequestBody ImportDetailRequestDto importDetailRequestDto) {
        Optional<Product> productOptional = productRepository.findById(importDetailRequestDto.getProduct());
        Optional<Import> importOptional = importRepository.findById(importDetailRequestDto.getImportImport());

        if (productOptional.isPresent() && importOptional.isPresent()) {
            Product product = productOptional.get();
            product.setProQuantity(product.getProQuantity()+importDetailRequestDto.getImportDetailQuantity());

            Import import1 = importOptional.get();
            ImportDetail newImportDetail = new ImportDetail();
            newImportDetail.setProduct(product);
            newImportDetail.setImportImport(import1);
            newImportDetail.setImportDetailQuantity(importDetailRequestDto.getImportDetailQuantity());
            newImportDetail.setImportDetailPrice(importDetailRequestDto.getImportDetailPrice());

            productRepository.save(product);
            importDetailRepository.save(newImportDetail);
            return ResponseEntity.ok(new MessageResponse("Add import detail successfully"));
        } else {
            return new ResponseEntity<>(new MessageResponse("Product or Import not found!"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{importId}")
    public ResponseEntity<List<ImportDetail>> getByImportID(@PathVariable Integer importId) {
        List<ImportDetail> importDetails = importDetailRepository.findByImportID(importId);
        return new ResponseEntity<List<ImportDetail>>(importDetails, HttpStatus.OK);
    }
}
