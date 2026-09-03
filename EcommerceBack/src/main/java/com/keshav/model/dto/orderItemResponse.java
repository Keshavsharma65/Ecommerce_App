package com.keshav.model.dto;

import java.math.BigDecimal;

public record orderItemResponse(
        String productName,
        int productQuantity,
        int totalPrice
) {
}
