package com.keshav.repo;

import com.keshav.model.dto.orderResponse;
import com.keshav.model.order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderRepo extends JpaRepository<order, Integer> {
    order findByOrderId(String orderId);
}