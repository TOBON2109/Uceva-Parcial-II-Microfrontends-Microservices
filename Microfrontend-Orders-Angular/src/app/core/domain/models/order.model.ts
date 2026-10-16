export interface OrderItem {
  productCode: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  supplierNit: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

export interface CreateOrderRequest {
  supplierNit: string;
  items: OrderItem[];
}