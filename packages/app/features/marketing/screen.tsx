"use client"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Radio, Plus, TrendingUp, Eye } from 'lucide-react-native'

type BroadcastStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'

interface MarketingScreenProps {
  broadcasts?: Array<{ 
    id: string; name: string; status: BroadcastStatus; 
    recipientCount: number; readCount: number; sentAt?: string; 
    scheduledAt?: string; createdAt: string 
  }>
  isLoading?: boolean
  onCreateBroadcast?: () => void
  onBroadcastPress?: (id: string) => void
}

const statusConfig: Record<BroadcastStatus, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Draft' },
  scheduled: { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Scheduled' },
  sending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Sending...' },
  sent: { bg: 'bg-green-100', text: 'text-green-700', label: 'Sent' },
  failed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Failed' },
}

export function MarketingScreen({ broadcasts = [], isLoading, onCreateBroadcast, onBroadcastPress }: MarketingScreenProps) {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-black text-[#075E54] dark:text-white">Broadcasts</Text>
          <TouchableOpacity onPress={onCreateBroadcast} className="w-12 h-12 bg-[#25D366] rounded-2xl items-center justify-center shadow-lg">
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 mt-2">Send targeted WhatsApp campaigns to your customers</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#25D366" size="large" />
        </View>
      ) : broadcasts.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Radio color="#25D366" size={64} opacity={0.3} />
          <Text className="text-2xl font-black text-gray-400 mt-6">No broadcasts yet</Text>
          <Text className="text-gray-400 text-center mt-2">Create your first broadcast to reach all your customers at once</Text>
          <TouchableOpacity onPress={onCreateBroadcast} className="bg-[#25D366] px-8 py-4 rounded-2xl mt-8">
            <Text className="text-white font-bold text-lg">Create Broadcast</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={broadcasts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const sc = statusConfig[item.status]
            const openRate = item.recipientCount > 0 ? Math.round((item.readCount / item.recipientCount) * 100) : 0
            return (
              <TouchableOpacity onPress={() => onBroadcastPress?.(item.id)} className="bg-white dark:bg-[#111B21] rounded-3xl p-6 mb-4 shadow-sm">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="font-black text-lg text-gray-900 dark:text-white flex-1 mr-3">{item.name}</Text>
                  <View className={`px-3 py-1 rounded-full ${sc.bg}`}>
                    <Text className={`text-xs font-bold ${sc.text}`}>{sc.label}</Text>
                  </View>
                </View>
                {item.status === 'sent' && (
                  <View className="flex-row gap-6 mt-2">
                    <View className="items-center">
                      <Text className="text-xl font-black text-[#075E54] dark:text-[#25D366]">{item.recipientCount}</Text>
                      <Text className="text-xs text-gray-400 mt-0.5">Recipients</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-xl font-black text-[#34B7F1]">{openRate}%</Text>
                      <Text className="text-xs text-gray-400 mt-0.5">Open Rate</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-xl font-black text-[#25D366]">{item.readCount}</Text>
                      <Text className="text-xs text-gray-400 mt-0.5">Read</Text>
                    </View>
                  </View>
                )}
                {item.scheduledAt && item.status === 'scheduled' && (
                  <Text className="text-gray-400 text-sm mt-2">📅 Scheduled: {new Date(item.scheduledAt).toLocaleDateString()}</Text>
                )}
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}
