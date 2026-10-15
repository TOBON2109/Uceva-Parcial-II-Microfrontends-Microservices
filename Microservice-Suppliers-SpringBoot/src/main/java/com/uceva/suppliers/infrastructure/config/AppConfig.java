package com.uceva.suppliers.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.uceva.suppliers.application.usecases.GetSupplierByNitUseCase;
import com.uceva.suppliers.application.usecases.ListSuppliersUseCase;
import com.uceva.suppliers.application.usecases.RegisterSupplierUseCase;
import com.uceva.suppliers.domain.repositories.SupplierRepository;
import com.uceva.suppliers.infrastructure.repositories.InMemorySupplierRepository;

@Configuration
public class AppConfig {

    @Bean
    public SupplierRepository supplierRepository() {
        return new InMemorySupplierRepository();
    }

    @Bean
    public ListSuppliersUseCase listSuppliersUseCase(SupplierRepository supplierRepository) {
        return new ListSuppliersUseCase(supplierRepository);
    }

    @Bean
    public RegisterSupplierUseCase registerSupplierUseCase(SupplierRepository supplierRepository) {
        return new RegisterSupplierUseCase(supplierRepository);
    }

    @Bean
    public GetSupplierByNitUseCase getSupplierByNitUseCase(SupplierRepository supplierRepository) {
        return new GetSupplierByNitUseCase(supplierRepository);
    }
}