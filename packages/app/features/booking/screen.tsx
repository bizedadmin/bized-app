"use client"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Calendar, Plus, Clock, ChevronRight } from 'lucide-react-native'

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

const statusConfig: Record<BookingStatus, { bg: string; text: string; label: string }> = {
  pending:   { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
  confirmed: { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Confirmed' },
  cancelled: { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Cancelled' },
  completed: { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Completed' },
}

interface BookingScreenProps {
  bookings?: Array<{
    id: string; customerName: string; serviceName: string
    date: string; time: string; duration: number
    status: BookingStatus; price?: number; currency?: string
  }>
  isLoading?: boolean
  onCreateBooking?: () => void
  onBookingPress?: (id: string) => void
}

export function BookingScreen({ bookings = [], isLoading, onCreateBooking, onBookingPress }: BookingScreenProps) {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-black text-[#075E54] dark:text-white">Bookings</Text>
          <TouchableOpacity onPress={onCreateBooking} className="w-12 h-12 bg-[#25D366] rounded-2xl items-center justify-center shadow-lg">
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 mt-2">Manage appointments and service bookings</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#25D366" size="large" />
        </View>
      ) : bookings.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Calendar color="#25D366" size={64} opacity={0.3} />
          <Text className="text-2xl font-black text-gray-400 mt-6">No bookings yet</Text>
          <Text className="text-gray-400 text-center mt-2">Your appointments will appear here</Text>
          <TouchableOpacity onPress={onCreateBooking} className="bg-[#25D366] px-8 py-4 rounded-2xl mt-8">
            <Text className="text-white font-bold text-lg">New Booking</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const sc = statusConfig[item.status]
            return (
              <TouchableOpacity onPress={() => onBookingPress?.(item.id)} className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-4 shadow-sm">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1 mr-3">
                    <Text className="font-black text-lg text-gray-900 dark:text-white">{item.customerName}</Text>
                    <Text className="text-[#25D366] font-bold mt-0.5">{item.serviceName}</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${sc.bg}`}>
                    <Text className={`text-xs font-bold ${sc.text}`}>{sc.label}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-4">
                  <View className="flex-row items-center gap-1">
                    <Calendar color="#9CA3AF" size={14} />
                    <Text className="text-gray-500 text-sm">{item.date}</Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Clock color="#9CA3AF" size={14} />
                    <Text className="text-gray-500 text-sm">{item.time} · {item.duration}min</Text>
                  </View>
                  {item.price != null && (
                    <Text className="text-[#25D366] font-black ml-auto">{item.currency} {item.price.toFixed(2)}</Text>
                  )}
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}
