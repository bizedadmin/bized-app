import { z } from 'zod'

// ---- Auth / User ----
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(7, 'Enter a valid phone number').optional(),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
})

export const UserProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
})

// ---- Business ----
export const BusinessSchema = z.object({
  name: z.string().min(2, 'Business name is required'),
  description: z.string().optional(),
  phone: z.string().min(7, 'Valid phone required'),
  category: z.string().min(1, 'Category is required'),
  currency: z.string().length(3, 'Use 3-letter currency code (e.g. USD)'),
  timezone: z.string(),
})

// ---- Catalog / Products ----
export const ProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  currency: z.string().length(3),
  category: z.string().optional(),
  inStock: z.boolean().default(true),
  sku: z.string().optional(),
  imageUrl: z.string().url().optional(),
})

export const ProductVariantSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive().optional(),
  sku: z.string().optional(),
  inStock: z.boolean().default(true),
})

// ---- Orders ----
export const OrderItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  variantId: z.string().optional(),
})

export const CreateOrderSchema = z.object({
  customerId: z.string(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(7),
  items: z.array(OrderItemSchema).min(1, 'At least one item required'),
  notes: z.string().optional(),
  shippingAddress: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    country: z.string(),
    postalCode: z.string().optional(),
  }).optional(),
})

export const UpdateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  notes: z.string().optional(),
})

// ---- Payment Links ----
export const PaymentLinkSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3),
  expiresAt: z.string().datetime().optional(),
})

// ---- Broadcasts ----
export const BroadcastSchema = z.object({
  name: z.string().min(2, 'Broadcast name is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(4096),
  scheduledAt: z.string().datetime().optional(),
  recipientFilter: z.object({
    tags: z.array(z.string()).optional(),
    segments: z.array(z.string()).optional(),
  }).optional(),
})

// ---- Bookings ----
export const BookingSchema = z.object({
  customerId: z.string(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(7),
  serviceId: z.string(),
  serviceName: z.string(),
  staffId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Use HH:MM format'),
  duration: z.number().int().positive(),
  notes: z.string().optional(),
  price: z.number().nonnegative().optional(),
})

// ---- Invoices ----
export const InvoiceItemSchema = z.object({
  description: z.string().min(2),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
})

export const CreateInvoiceSchema = z.object({
  customerId: z.string(),
  customerName: z.string().min(2),
  customerEmail: z.string().email().optional(),
  items: z.array(InvoiceItemSchema).min(1),
  taxRate: z.number().min(0).max(100).default(0),
  currency: z.string().length(3),
  dueDate: z.string().datetime(),
  notes: z.string().optional(),
})

// ---- Subscriptions ----
export const SubscriptionSchema = z.object({
  customerId: z.string(),
  planId: z.string(),
  planName: z.string(),
  price: z.number().positive(),
  currency: z.string().length(3),
  interval: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  startDate: z.string().datetime(),
})

// ---- Store ----
export const StoreConfigSchema = z.object({
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens only'),
  customDomain: z.string().optional(),
  theme: z.enum(['light', 'dark', 'auto']).default('light'),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#25D366'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

// Inferred types from schemas
export type LoginInput = z.infer<typeof LoginSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>
export type ProductInput = z.infer<typeof ProductSchema>
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
export type PaymentLinkInput = z.infer<typeof PaymentLinkSchema>
export type BroadcastInput = z.infer<typeof BroadcastSchema>
export type BookingInput = z.infer<typeof BookingSchema>
export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>
export type SubscriptionInput = z.infer<typeof SubscriptionSchema>
export type StoreConfigInput = z.infer<typeof StoreConfigSchema>
