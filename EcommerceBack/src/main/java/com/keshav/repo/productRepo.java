package com.keshav.repo;

import com.keshav.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface productRepo extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.product_Name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.product_description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.product_Category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.productCode) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProduct(String keyword);
}
