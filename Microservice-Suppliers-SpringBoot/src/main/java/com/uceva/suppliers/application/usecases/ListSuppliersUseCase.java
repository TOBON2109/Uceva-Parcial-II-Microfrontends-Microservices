package com.uceva.suppliers.application.usecases;

import java.util.List;

import com.uceva.suppliers.domain.entities.Supplier;
import com.uceva.suppliers.domain.repositories.SupplierRepository;

public class ListSuppliersUseCase {

    private final SupplierRepository supplierRepository;

    public ListSuppliersUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> execute() {
        return supplierRepository.findAll();
    }
}