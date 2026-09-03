package com.keshav.model.dto;

import java.util.List;

public record orderRequest(
        String customerName,
        String customerEmail,
        List<orderItemRequest> items
) {
}
