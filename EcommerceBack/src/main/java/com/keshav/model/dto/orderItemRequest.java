package com.keshav.model.dto;

public record orderItemRequest(
        int productId,
        int productQuantity
) {
}
