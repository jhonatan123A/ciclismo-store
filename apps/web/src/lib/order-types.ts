/**
 * Tipos para manejo de órdenes y direcciones
 */

// ✅ NUEVO: Tipos de documento permitidos en Colombia (DIAN)
export type DocumentType = 'CC' | 'CE' | 'NIT' | 'PA';

// ✅ NUEVO: Tipo de persona (natural o jurídica)
export type PersonType = 'NATURAL' | 'JURIDICA';

// ✅ NUEVO: Régimen fiscal ante la DIAN
export type TaxRegime = 'NO_RESPONSABLE' | 'RESPONSABLE' | 'SIMPLE';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  // ✅ NUEVO: Datos legales obligatorios (DIAN + guías de envío)
  documentType: DocumentType;
  documentId: string;
  personType: PersonType;
  taxRegime: TaxRegime;
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
  // ✅ NUEVO: Defaults razonables (cubren el 95% de clientes)
  documentType: 'CC',
  documentId: '',
  personType: 'NATURAL',
  taxRegime: 'NO_RESPONSABLE',
  department: '',
  city: '',
  address: '',
  neighborhood: '',
  references: '',
  zipCode: '',
};