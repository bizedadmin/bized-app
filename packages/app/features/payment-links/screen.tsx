"use client"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Link2, Plus, Copy, ExternalLink } from 'lucide-react-native'

interface PaymentLinkScreenProps {
  paymentLinks?: Array<{ id: string; title: string; amount: number; currency: string; url: string; isActive: boolean; expiresAt?: string }>
  isLoading?: boolean
  onCreateLink?: () => void
  onCopyLink?: (url: string) => void
}

export function PaymentLinkScreen({ paymentLinks = [], isLoading, onCreateLink, onCopyLink }: PaymentLinkScreenProps) {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-black text-[#075E54] dark:text-white">Payment Links</Text>
          <TouchableOpacity onPress={onCreateLink} className="w-12 h-12 bg-[#25D366] rounded-2xl items-center justify-center shadow-lg">
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 mt-2">Create shareable payment links for WhatsApp</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#25D366" size="large" />
        </View>
      ) : paymentLinks.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Link2 color="#25D366" size={64} opacity={0.3} />
          <Text className="text-2xl font-black text-gray-400 mt-6">No payment links yet</Text>
          <Text className="text-gray-400 text-center mt-2">Create a link to collect payments via WhatsApp</Text>
          <TouchableOpacity onPress={onCreateLink} className="bg-[#25D366] px-8 py-4 rounded-2xl mt-8">
            <Text className="text-white font-bold text-lg">Create Link</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={paymentLinks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white dark:bg-[#111B21] rounded-3xl p-6 mb-4 shadow-sm">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="font-black text-lg text-gray-900 dark:text-white flex-1 mr-3">{item.title}</Text>
                <View className={`px-3 py-1 rounded-full ${item.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Text className={`text-xs font-bold ${item.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </Text>
                </View>
              </View>
              <Text className="text-2xl font-black text-[#25D366] mb-4">{item.currency} {item.amount.toFixed(2)}</Text>
              <View className="flex-row gap-3">
                <TouchableOpacity onPress={() => onCopyLink?.(item.url)} className="flex-1 flex-row items-center justify-center bg-[#25D366]/10 py-3 rounded-2xl gap-2">
                  <Copy color="#25D366" size={16} />
                  <Text className="text-[#25D366] font-bold">Copy Link</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-100 dark:bg-white/10 py-3 rounded-2xl gap-2">
                  <ExternalLink color="#9CA3AF" size={16} />
                  <Text className="text-gray-500 font-bold">View</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}
