package com.uceva.suppliers.application.usecases;

import com.uceva.suppliers.domain.entities.Supplier;
import com.uceva.suppliers.domain.exceptions.ResourceNotFoundException;
import com.uceva.suppliers.domain.repositories.SupplierRepository;

public class GetSupplierByNitUseCase {

    private final SupplierRepository supplierRepository;

    public GetSupplierByNitUseCase(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public Supplier execute(String nit) {
        return supplierRepository.findByNit(nit)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proveedor con el NIT " + nit));
    }
}