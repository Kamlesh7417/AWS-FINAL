export interface Order {
  order_id: string;
  order_placed_timestamp: string;
  order_status: 'OPEN' | 'SHIPPED' | 'DELIVERED';
  product: {
    name: string;
    dimensions: string;
    weight: string;
    quantity: number;
  };
  customer_address: string;
  warehouse_address: string;
  seller_address: string;
  customer?: string;
  type?: string;
  priority?: string;
}