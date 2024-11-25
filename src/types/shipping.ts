export interface ShippingOption {
  carrier: string;
  logo: string;
  service: string;
  deliveryTime: string;
  originalPrice: number;
  negotiatedPrice: number;
  rating: number;
  isBestOption?: boolean;
  days: string;
  discountedPrice: number;
  aiSavings: number;
  reliability: number;
  count: number;
  type: string;
  co2: number;
  customs: string;
  documentation: string[];
}