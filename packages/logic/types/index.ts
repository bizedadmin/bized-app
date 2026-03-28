// ============================================================
// @repo/logic — Shared TypeScript Types (all 10 domain modules)
// ============================================================

// ---- User / Auth ----
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'owner' | 'admin' | 'agent' | 'viewer'
  businessId: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// ---- Business ----
export interface Business {
  id: string
  name: string
  description?: string
  phone: string
  whatsappAccountId?: string
  category: string
  currency: string
  timezone: string
  logoUrl?: string
  plan: 'free' | 'starter' | 'growth' | 'enterprise'
  createdAt: string
}

// ---- Catalog ----
export interface Product {
  id: string
  businessId: string
  name: string
  description?: string
  price: number
  currency: string
  imageUrl?: string
  category?: string
  inStock: boolean
  sku?: string
  variants?: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  name: string
  price?: number
  sku?: string
  inStock: boolean
}

// ---- Orders ----
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  variantId?: string
}

export interface Order {
  id: string
  businessId: string
  customerId: string
  customerName: string
  customerPhone: string
  items: OrderItem[]
  total: number
  currency: string
  status: OrderStatus
  notes?: string
  shippingAddress?: Address
  createdAt: string
  updatedAt: string
}

// ---- Payments ----
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Payment {
  id: string
  businessId: string
  orderId?: string
  customerId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: 'card' | 'bank_transfer' | 'mobile_money' | 'cash'
  reference: string
  paidAt?: string
  createdAt: string
}

// ---- Payment Links ----
export interface PaymentLink {
  id: string
  businessId: string
  title: string
  description?: string
  amount: number
  currency: string
  url: string
  isActive: boolean
  expiresAt?: string
  createdAt: string
}

// ---- Marketing / Broadcasts ----
export type BroadcastStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'

export interface Broadcast {
  id: string
  businessId: string
  name: string
  message: string
  recipientCount: number
  sentCount: number
  deliveredCount: number
  readCount: number
  status: BroadcastStatus
  scheduledAt?: string
  sentAt?: string
  createdAt: string
}

// ---- Bookings ----
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Booking {
  id: string
  businessId: string
  customerId: string
  customerName: string
  customerPhone: string
  serviceId: string
  serviceName: string
  staffId?: string
  date: string
  time: string
  duration: number
  status: BookingStatus
  notes?: string
  price?: number
  createdAt: string
  updatedAt: string
}

// ---- Invoices ----
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Invoice {
  id: string
  businessId: string
  customerId: string
  customerName: string
  customerEmail?: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  currency: string
  status: InvoiceStatus
  dueDate: string
  paidAt?: string
  notes?: string
  createdAt: string
}

// ---- Subscriptions ----
export interface Subscription {
  id: string
  businessId: string
  customerId: string
  planId: string
  planName: string
  price: number
  currency: string
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly'
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  startDate: string
  nextBillingDate: string
  cancelledAt?: string
}

// ---- Store ----
export interface StoreConfig {
  businessId: string
  subdomain: string
  customDomain?: string
  theme: 'light' | 'dark' | 'auto'
  primaryColor: string
  logoUrl?: string
  bannerUrl?: string
  published: boolean
  seoTitle?: string
  seoDescription?: string
}

// ---- Shared ----
export interface Address {
  line1: string
  line2?: string
  city: string
  state?: string
  country: string
  postalCode?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}
