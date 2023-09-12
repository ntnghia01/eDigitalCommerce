package com.backend.springboot.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springboot.ecommerce.entity.Category;
import com.backend.springboot.ecommerce.payload.request.CategoryRequestDto;
import com.backend.springboot.ecommerce.payload.response.MessageResponse;
import com.backend.springboot.ecommerce.repository.CategoryRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;



    @GetMapping
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categoryList = categoryRepository.findAll();
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Integer categoryId) {
        Optional<Category> cateOptional = categoryRepository.findById(categoryId);
        if(cateOptional.isPresent()) {
            Category category = cateOptional.get();
            return new ResponseEntity<Category>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequestDto categoryRequestDto) {
        Category category = new Category(categoryRequestDto.getCategoryName(), categoryRequestDto.getCategoryDesc());
        categoryRepository.save(category);
        return ResponseEntity.ok(new MessageResponse("Add category successfully!!!"));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategory(@PathVariable Integer categoryId, @RequestBody CategoryRequestDto categoryRequestDto) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Category existingCategory = categoryOptional.get();
            existingCategory.setCateName(categoryRequestDto.getCategoryName());
            existingCategory.setCateDesc(categoryRequestDto.getCategoryDesc());
            existingCategory.setCateStatus(categoryRequestDto.getCategoryStatus());
            existingCategory.setCateUpdatedAt(LocalDateTime.now());

            categoryRepository.save(existingCategory);
            return ResponseEntity.ok(new MessageResponse("Update category successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Category existingCategory = categoryOptional.get();
            existingCategory.setCateStatus(-1);
            existingCategory.setCateUpdatedAt(LocalDateTime.now());
            
            categoryRepository.save(existingCategory);
            return ResponseEntity.ok(new MessageResponse("Delete category successfully!"));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
