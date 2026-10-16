import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../domain/models/supplier.model';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';
import { SUPPLIERS_API_URL } from '../config/api.config';

@Injectable()
export class HttpSupplierRepository extends SupplierRepository {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(SUPPLIERS_API_URL);
  }

  getByNit(nit: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${SUPPLIERS_API_URL}/${encodeURIComponent(nit)}`);
  }

  register(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(SUPPLIERS_API_URL, supplier);
  }
}