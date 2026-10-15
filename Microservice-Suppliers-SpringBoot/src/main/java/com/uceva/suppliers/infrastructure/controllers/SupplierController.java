package com.uceva.suppliers.infrastructure.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uceva.suppliers.application.usecases.GetSupplierByNitUseCase;
import com.uceva.suppliers.application.usecases.ListSuppliersUseCase;
import com.uceva.suppliers.application.usecases.RegisterSupplierUseCase;
import com.uceva.suppliers.domain.entities.Supplier;
import com.uceva.suppliers.infrastructure.controllers.dto.SupplierRequest;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    private final ListSuppliersUseCase listSuppliers;
    private final RegisterSupplierUseCase registerSupplier;
    private final GetSupplierByNitUseCase getSupplierByNit;

    public SupplierController(ListSuppliersUseCase listSuppliers,
                              RegisterSupplierUseCase registerSupplier,
                              GetSupplierByNitUseCase getSupplierByNit) {
        this.listSuppliers = listSuppliers;
        this.registerSupplier = registerSupplier;
        this.getSupplierByNit = getSupplierByNit;
    }

    @GetMapping
    public List<Supplier> list() {
        return listSuppliers.execute();
    }

    @PostMapping
    public ResponseEntity<Supplier> register(@RequestBody SupplierRequest request) {
        Supplier supplier = registerSupplier.execute(
                request.nit(), request.name(), request.email(), request.phone());
        return ResponseEntity.status(HttpStatus.CREATED).body(supplier);
    }

    @GetMapping("/{nit}")
    public Supplier getByNit(@PathVariable String nit) {
        return getSupplierByNit.execute(nit);
    }
}