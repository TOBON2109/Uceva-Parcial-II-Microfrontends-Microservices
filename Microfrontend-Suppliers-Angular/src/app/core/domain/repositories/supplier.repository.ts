import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

export abstract class SupplierRepository {
  abstract getAll(): Observable<Supplier[]>;
  abstract getByNit(nit: string): Observable<Supplier>;
  abstract register(supplier: Supplier): Observable<Supplier>;
}