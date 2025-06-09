export interface Product {
  id?: number;
  // name: string;
  type: 'in-stock' | 'fresh-food' | 'external';
}

export interface Slot {
  id: number;
  datetime: string;
  isGreen: boolean;
}

export interface DeliveryRequest {
  cart: Product[];
  now?: string;
}
