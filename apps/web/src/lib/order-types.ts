/**
 * Tipos para manejo de órdenes y direcciones
 */

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  references: string;
  zipCode?: string;
}

export interface CustomerData {
  fullName: string;
  phone: string;
  email: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerData;
  shipping: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'wompi' | 'paypal';
  paymentId?: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  tier: number;
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_SHIPPING_ADDRESS: ShippingAddress = {
  fullName: '',
  phone: '',
  email: '',
  department: '',
  city: '',
  address: '',
  neighborhood: '',
  references: '',
  zipCode: '',
};