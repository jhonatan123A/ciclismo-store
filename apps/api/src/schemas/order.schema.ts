import { z } from 'zod';

export const orderItemSchema = z.object({
  // productId NO debe ser opcional ni tener default ('')
  productId: z.string().min(1, 'El ID del producto es obligatorio'),
  name: z.string().optional(),
  image: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1),
  price: z.number().positive(),
});

export const shippingAddressSchema = z.object({
  department: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  address: z.string().optional(),
  neighborhood: z.string().optional(),
  references: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email'),
  customerPhone: z.string().optional(),
  items: z.array(orderItemSchema).min(1, 'Debe haber al menos un ítem en la orden'),
  shippingAddress: shippingAddressSchema,
  billingAddress: shippingAddressSchema.optional(),
  paymentMethod: z.enum(['wompi', 'paypal', 'stripe', 'mercadopago']),
  paymentId: z.string().optional(),   // ✅ AHORA OPCIONAL
  // Permitimos 0 o mayor para subtotal en casos especiales
  subtotal: z.number().min(0),
  shippingCost: z.number().min(0).default(0),
  total: z.number().positive(),
  tax: z.number().default(0),
  discount: z.number().default(0),
  notes: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;