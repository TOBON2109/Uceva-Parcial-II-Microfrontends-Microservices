package com.uceva.suppliers.domain.repositories;

import java.util.List;
import java.util.Optional;

import com.uceva.suppliers.domain.entities.Supplier;

public interface SupplierRepository {
    List<Supplier> findAll();

    Optional<Supplier> findByNit(String nit);

    Supplier save(Supplier supplier);
}