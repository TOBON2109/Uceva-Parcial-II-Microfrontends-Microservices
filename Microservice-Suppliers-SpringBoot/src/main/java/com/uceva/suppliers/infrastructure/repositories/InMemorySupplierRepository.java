package com.uceva.suppliers.infrastructure.repositories;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

import com.uceva.suppliers.domain.entities.Supplier;
import com.uceva.suppliers.domain.repositories.SupplierRepository;

public class InMemorySupplierRepository implements SupplierRepository {

    private final List<Supplier> suppliers = new CopyOnWriteArrayList<>(List.of(
            new Supplier("900123456-1", "Distribuidora Tech S.A.S", "ventas@distritech.com", "3001234567"),
            new Supplier("900654321-2", "Suministros del Valle Ltda", "contacto@sumivalle.com", "3109876543"),
            new Supplier("901111222-3", "Importaciones Andinas S.A.S", "info@andinas.com", "3205558899")));

    @Override
    public List<Supplier> findAll() {
        return List.copyOf(suppliers);
    }

    @Override
    public Optional<Supplier> findByNit(String nit) {
        return suppliers.stream().filter(s -> s.nit().equals(nit)).findFirst();
    }

    @Override
    public Supplier save(Supplier supplier) {
        suppliers.add(supplier);
        return supplier;
    }
}