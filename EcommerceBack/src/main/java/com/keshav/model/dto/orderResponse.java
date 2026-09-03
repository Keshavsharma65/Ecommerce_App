package com.keshav.model.dto;

import java.time.LocalDate;
import java.util.List;

public record orderResponse(
        String orderId,
        String customerName,
        String customerEmail,
        String orderStatus,
        LocalDate orderDate,
        List<orderItemResponse> items
) {
}
