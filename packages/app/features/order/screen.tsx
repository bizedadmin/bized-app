"use client"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { ShoppingBag, ChevronRight, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react-native'

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

const statusColors: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confirmed' },
  processing: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Processing' },
  shipped: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Shipped' },
  delivered: { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
  refunded: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Refunded' },
}

interface OrderScreenProps {
  orders?: Array<{ id: string; customerName: string; total: number; currency: string; status: OrderStatus; itemCount: number; createdAt: string }>
  isLoading?: boolean
  onOrderPress?: (id: string) => void
  stats?: { total: number; pending: number; delivered: number; revenue: number }
}

export function OrderScreen({ orders = [], isLoading, onOrderPress, stats }: OrderScreenProps) {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <Text className="text-3xl font-black text-[#075E54] dark:text-white mb-6">Orders</Text>

        {/* Stats Row */}
        {stats && (
          <View className="flex-row gap-3">
            <View className="flex-1 bg-[#25D366]/10 p-4 rounded-2xl">
              <Text className="text-2xl font-black text-[#075E54] dark:text-[#25D366]">{stats.total}</Text>
              <Text className="text-xs text-gray-500 mt-1">Total Orders</Text>
            </View>
            <View className="flex-1 bg-yellow-50 p-4 rounded-2xl">
              <Text className="text-2xl font-black text-yellow-600">{stats.pending}</Text>
              <Text className="text-xs text-gray-500 mt-1">Pending</Text>
            </View>
            <View className="flex-1 bg-green-50 p-4 rounded-2xl">
              <Text className="text-2xl font-black text-green-600">{stats.delivered}</Text>
              <Text className="text-xs text-gray-500 mt-1">Delivered</Text>
            </View>
          </View>
        )}
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#25D366" size="large" />
        </View>
      ) : orders.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <ShoppingBag color="#25D366" size={64} opacity={0.3} />
          <Text className="text-2xl font-black text-gray-400 mt-6">No orders yet</Text>
          <Text className="text-gray-400 text-center mt-2">Orders will appear here as customers buy from you</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const statusStyle = statusColors[item.status]
            return (
              <TouchableOpacity onPress={() => onOrderPress?.(item.id)} className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-4 shadow-sm">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="font-black text-lg text-gray-900 dark:text-white">{item.customerName}</Text>
                  <View className={`px-3 py-1 rounded-full ${statusStyle.bg}`}>
                    <Text className={`text-xs font-bold ${statusStyle.text}`}>{statusStyle.label}</Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-500">{item.itemCount} item{item.itemCount !== 1 ? 's' : ''}</Text>
                  <Text className="text-[#25D366] font-black text-lg">{item.currency} {item.total.toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}
