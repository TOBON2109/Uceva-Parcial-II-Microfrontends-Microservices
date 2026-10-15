package com.uceva.suppliers.domain.entities;

import com.uceva.suppliers.domain.exceptions.DomainValidationException;

public record Supplier(String nit, String name, String email, String phone) {

    public static Supplier create(String nit, String name, String email, String phone) {
        if (nit == null || nit.isBlank()) {
            throw new DomainValidationException("El NIT es obligatorio");
        }
        if (name == null || name.isBlank()) {
            throw new DomainValidationException("El nombre es obligatorio");
        }
        if (email == null || !email.contains("@")) {
            throw new DomainValidationException("El correo electrónico no es válido");
        }
        return new Supplier(
                nit.trim(),
                name.trim(),
                email.trim(),
                phone == null ? "" : phone.trim());
    }
}