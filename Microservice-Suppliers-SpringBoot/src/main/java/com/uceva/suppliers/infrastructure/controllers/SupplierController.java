package com.uceva.suppliers.infrastructure.controllers;

import com.uceva.suppliers.application.usecases.GetSupplierByNitUseCase;
import com.uceva.suppliers.application.usecases.ListSuppliersUseCase;
import com.uceva.suppliers.application.usecases.RegisterSupplierUseCase;
import com.uceva.suppliers.domain.entities.Supplier;
import com.uceva.suppliers.infrastructure.controllers.dto.SupplierRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@Tag(name = "Proveedores", description = "Gestión de proveedores")
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
    @Operation(summary = "Listar proveedores")
    @ApiResponse(responseCode = "200", description = "Lista de proveedores")
    public List<Supplier> list() {
        return listSuppliers.execute();
    }

    @PostMapping
    @Operation(summary = "Registrar proveedor")
    @ApiResponse(responseCode = "201", description = "Proveedor registrado")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @ApiResponse(responseCode = "409", description = "NIT duplicado")
    public ResponseEntity<Supplier> register(@RequestBody SupplierRequest request) {
        Supplier supplier = registerSupplier.execute(
                request.nit(), request.name(), request.email(), request.phone());
        return ResponseEntity.status(HttpStatus.CREATED).body(supplier);
    }

    @GetMapping("/{nit}")
    @Operation(summary = "Consultar proveedor por NIT")
    @ApiResponse(responseCode = "200", description = "Proveedor encontrado")
    @ApiResponse(responseCode = "404", description = "Proveedor no encontrado")
    public Supplier getByNit(@PathVariable String nit) {
        return getSupplierByNit.execute(nit);
    }
}