package com.uceva.suppliers.application.usecases;

import com.uceva.suppliers.domain.entities.Supplier;
import com.uceva.suppliers.domain.exceptions.ResourceConflictException;
import com.uceva.suppliers.domain.repositories.SupplierRepository;

public class RegisterSupplierUseCase {

    private final SupplierRepository supplierRepository;

    public RegisterSupplierUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public Supplier execute(String nit, String name, String email, String phone) {
        Supplier supplier = Supplier.create(nit, name, email, phone);
        if (supplierRepository.findByNit(supplier.nit()).isPresent()) {
            throw new ResourceConflictException(
                    "Ya existe un proveedor con el NIT " + supplier.nit());
        }
        return supplierRepository.save(supplier);
    }
}