"use client"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { RefreshCw, Plus, ChevronRight, TrendingUp } from 'lucide-react-native'

type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired'
type BillingInterval = 'daily' | 'weekly' | 'monthly' | 'yearly'

const statusConfig: Record<SubscriptionStatus, { bg: string; text: string; label: string }> = {
  active:    { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Active' },
  paused:    { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Paused' },
  cancelled: { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Cancelled' },
  expired:   { bg: 'bg-gray-100',   text: 'text-gray-500',   label: 'Expired' },
}

const intervalLabel: Record<BillingInterval, string> = {
  daily: '/day', weekly: '/week', monthly: '/mo', yearly: '/yr',
}

interface SubscriptionScreenProps {
  subscriptions?: Array<{
    id: string; planName: string; customerName?: string
    price: number; currency: string; interval: BillingInterval
    status: SubscriptionStatus; nextBillingDate?: string
  }>
  isLoading?: boolean
  totalMRR?: number
  mrrCurrency?: string
  onCreatePlan?: () => void
  onSubscriptionPress?: (id: string) => void
}

export function SubscriptionScreen({ subscriptions = [], isLoading, totalMRR, mrrCurrency = 'USD', onCreatePlan, onSubscriptionPress }: SubscriptionScreenProps) {
  const activeCount = subscriptions.filter(s => s.status === 'active').length

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-black text-[#075E54] dark:text-white">Subscriptions</Text>
          <TouchableOpacity onPress={onCreatePlan} className="w-12 h-12 bg-[#25D366] rounded-2xl items-center justify-center shadow-lg">
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* MRR Summary */}
        <View className="flex-row gap-4">
          <View className="flex-1 bg-[#25D366]/10 rounded-2xl p-4">
            <Text className="text-gray-500 text-xs mb-1">Monthly Revenue</Text>
            <Text className="text-2xl font-black text-[#075E54] dark:text-[#25D366]">
              {totalMRR != null ? `${mrrCurrency} ${totalMRR.toFixed(2)}` : '—'}
            </Text>
          </View>
          <View className="flex-1 bg-blue-50 dark:bg-[#34B7F1]/10 rounded-2xl p-4">
            <Text className="text-gray-500 text-xs mb-1">Active Plans</Text>
            <Text className="text-2xl font-black text-[#34B7F1]">{activeCount}</Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#25D366" size="large" />
        </View>
      ) : subscriptions.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <RefreshCw color="#25D366" size={64} opacity={0.3} />
          <Text className="text-2xl font-black text-gray-400 mt-6">No subscriptions yet</Text>
          <Text className="text-gray-400 text-center mt-2">Create recurring plans for your customers to build predictable revenue</Text>
          <TouchableOpacity onPress={onCreatePlan} className="bg-[#25D366] px-8 py-4 rounded-2xl mt-8">
            <Text className="text-white font-bold text-lg">Create Plan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const sc = statusConfig[item.status]
            return (
              <TouchableOpacity onPress={() => onSubscriptionPress?.(item.id)} className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-4 shadow-sm flex-row items-center">
                <View className="w-12 h-12 bg-[#25D366]/10 rounded-2xl items-center justify-center mr-4">
                  <RefreshCw color="#25D366" size={22} />
                </View>
                <View className="flex-1">
                  <Text className="font-black text-gray-900 dark:text-white">{item.planName}</Text>
                  {item.customerName && <Text className="text-gray-400 text-sm mt-0.5">{item.customerName}</Text>}
                  {item.nextBillingDate && (
                    <Text className="text-gray-400 text-xs mt-0.5">Next: {new Date(item.nextBillingDate).toLocaleDateString()}</Text>
                  )}
                </View>
                <View className="items-end gap-2">
                  <Text className="font-black text-lg text-gray-900 dark:text-white">
                    {item.currency} {item.price.toFixed(2)}
                    <Text className="text-sm font-medium text-gray-400">{intervalLabel[item.interval]}</Text>
                  </Text>
                  <View className={`px-2 py-0.5 rounded-full ${sc.bg}`}>
                    <Text className={`text-xs font-bold ${sc.text}`}>{sc.label}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}
