package com.uceva.suppliers.infrastructure.controllers.dto;

public record SupplierRequest(String nit, String name, String email, String phone) {
}