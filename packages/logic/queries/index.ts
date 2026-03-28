import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import type { 
  User, Business, Product, Order, Payment, PaymentLink, 
  Broadcast, Booking, Invoice, Subscription, StoreConfig,
  PaginatedResponse, ApiError
} from '../types'

// ============================================================
// Query Keys — Centralized for cache management
// ============================================================
export const queryKeys = {
  // Auth
  currentUser: ['auth', 'me'] as const,
  // Business
  business: (id: string) => ['business', id] as const,
  // Catalog
  products: (businessId: string, page = 1) => ['products', businessId, page] as const,
  product: (id: string) => ['product', id] as const,
  // Orders
  orders: (businessId: string, page = 1) => ['orders', businessId, page] as const,
  order: (id: string) => ['order', id] as const,
  // Payments
  payments: (businessId: string, page = 1) => ['payments', businessId, page] as const,
  // Payment links
  paymentLinks: (businessId: string) => ['payment-links', businessId] as const,
  // Broadcasts
  broadcasts: (businessId: string, page = 1) => ['broadcasts', businessId, page] as const,
  broadcast: (id: string) => ['broadcast', id] as const,
  // Bookings
  bookings: (businessId: string, page = 1) => ['bookings', businessId, page] as const,
  booking: (id: string) => ['booking', id] as const,
  // Invoices
  invoices: (businessId: string, page = 1) => ['invoices', businessId, page] as const,
  invoice: (id: string) => ['invoice', id] as const,
  // Subscriptions
  subscriptions: (businessId: string, page = 1) => ['subscriptions', businessId, page] as const,
  // Store
  storeConfig: (businessId: string) => ['store', businessId] as const,
} as const

// ============================================================
// Auth Hooks
// ============================================================
export function useCurrentUser(options?: Partial<UseQueryOptions<User>>) {
  return useQuery<User>({
    queryKey: queryKeys.currentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
    queryFn: options?.queryFn ?? (() => Promise.reject(new Error('queryFn not provided'))),
  })
}

// ============================================================
// Business Hooks
// ============================================================
export function useBusiness(businessId: string, queryFn: () => Promise<Business>) {
  return useQuery<Business>({
    queryKey: queryKeys.business(businessId),
    queryFn,
    staleTime: 1000 * 60 * 10,
    enabled: !!businessId,
  })
}

export function useUpdateBusiness(businessId: string) {
  const queryClient = useQueryClient()
  return useMutation<Business, ApiError, Partial<Business>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.business(businessId), data)
    },
  })
}

// ============================================================
// Catalog Hooks
// ============================================================
export function useProducts(businessId: string, page = 1, queryFn: () => Promise<PaginatedResponse<Product>>) {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: queryKeys.products(businessId, page),
    queryFn,
    staleTime: 1000 * 60 * 2,
    enabled: !!businessId,
  })
}

export function useProduct(id: string, queryFn: () => Promise<Product>) {
  return useQuery<Product>({
    queryKey: queryKeys.product(id),
    queryFn,
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation<Product, ApiError, Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient()
  return useMutation<Product, ApiError, Partial<Product>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.product(id), data)
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation<void, ApiError, string>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

// ============================================================
// Order Hooks
// ============================================================
export function useOrders(businessId: string, page = 1, queryFn: () => Promise<PaginatedResponse<Order>>) {
  return useQuery<PaginatedResponse<Order>>({
    queryKey: queryKeys.orders(businessId, page),
    queryFn,
    staleTime: 1000 * 30, // 30s — orders update frequently
    enabled: !!businessId,
  })
}

export function useOrder(id: string, queryFn: () => Promise<Order>) {
  return useQuery<Order>({
    queryKey: queryKeys.order(id),
    queryFn,
    enabled: !!id,
  })
}

export function useUpdateOrderStatus(orderId: string) {
  const queryClient = useQueryClient()
  return useMutation<Order, ApiError, { status: Order['status']; notes?: string }>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.order(orderId), data)
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

// ============================================================
// Payment Hooks
// ============================================================
export function usePayments(businessId: string, page = 1, queryFn: () => Promise<PaginatedResponse<Payment>>) {
  return useQuery<PaginatedResponse<Payment>>({
    queryKey: queryKeys.payments(businessId, page),
    queryFn,
    staleTime: 1000 * 60,
    enabled: !!businessId,
  })
}

// ============================================================
// Payment Links Hooks
// ============================================================
export function usePaymentLinks(businessId: string, queryFn: () => Promise<PaymentLink[]>) {
  return useQuery<PaymentLink[]>({
    queryKey: queryKeys.paymentLinks(businessId),
    queryFn,
    enabled: !!businessId,
  })
}

export function useCreatePaymentLink() {
  const queryClient = useQueryClient()
  return useMutation<PaymentLink, ApiError, Omit<PaymentLink, 'id' | 'url' | 'createdAt'>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-links'] })
    },
  })
}

// ============================================================
// Broadcast Hooks
// ============================================================
export function useBroadcasts(businessId: string, page = 1, queryFn: () => Promise<PaginatedResponse<Broadcast>>) {
  return useQuery<PaginatedResponse<Broadcast>>({
    queryKey: queryKeys.broadcasts(businessId, page),
    queryFn,
    enabled: !!businessId,
  })
}

export function useCreateBroadcast() {
  const queryClient = useQueryClient()
  return useMutation<Broadcast, ApiError, Omit<Broadcast, 'id' | 'sentCount' | 'deliveredCount' | 'readCount' | 'createdAt'>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['broadcasts'] })
    },
  })
}

// ============================================================
// Booking Hooks
// ============================================================
export function useBookings(businessId: string, page = 1, queryFn: () => Promise<PaginatedResponse<Booking>>) {
  return useQuery<PaginatedResponse<Booking>>({
    queryKey: queryKeys.bookings(businessId, page),
    queryFn,
    staleTime: 1000 * 60,
    enabled: !!businessId,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation<Booking, ApiError, Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// ============================================================
// Invoice Hooks
// ============================================================
export function useInvoices(businessId: string, page = 1, queryFn: () => Promise<PaginatedResponse<Invoice>>) {
  return useQuery<PaginatedResponse<Invoice>>({
    queryKey: queryKeys.invoices(businessId, page),
    queryFn,
    enabled: !!businessId,
  })
}

export function useCreateInvoice() {
  const queryClient = useQueryClient()
  return useMutation<Invoice, ApiError, Omit<Invoice, 'id' | 'subtotal' | 'total' | 'createdAt'>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    },
  })
}

// ============================================================
// Subscription Hooks
// ============================================================
export function useSubscriptions(businessId: string, page = 1, queryFn: () => Promise<PaginatedResponse<Subscription>>) {
  return useQuery<PaginatedResponse<Subscription>>({
    queryKey: queryKeys.subscriptions(businessId, page),
    queryFn,
    enabled: !!businessId,
  })
}

// ============================================================
// Store Hooks
// ============================================================
export function useStoreConfig(businessId: string, queryFn: () => Promise<StoreConfig>) {
  return useQuery<StoreConfig>({
    queryKey: queryKeys.storeConfig(businessId),
    queryFn,
    enabled: !!businessId,
  })
}

export function useUpdateStoreConfig(businessId: string) {
  const queryClient = useQueryClient()
  return useMutation<StoreConfig, ApiError, Partial<StoreConfig>>({
    mutationFn: () => Promise.reject(new Error('mutationFn not provided')),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.storeConfig(businessId), data)
    },
  })
}
