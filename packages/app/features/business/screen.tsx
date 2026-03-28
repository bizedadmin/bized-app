"use client"
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Building2, Phone, Globe, Tag, Coins, Clock, ChevronRight, Edit3 } from 'lucide-react-native'

const CATEGORIES = [
  'Retail', 'Food & Beverage', 'Health & Beauty', 'Fashion', 'Electronics',
  'Home & Garden', 'Education', 'Professional Services', 'Travel', 'Other'
]

interface BusinessScreenProps {
  business?: {
    id: string; name: string; description?: string; phone: string
    whatsappAccountId?: string; category: string; currency: string
    timezone: string; logoUrl?: string; plan: string
  }
  isLoading?: boolean
  onEdit?: (field: string) => void
  onUpgradePlan?: () => void
}

const planBadge: Record<string, { bg: string; text: string; label: string }> = {
  free:       { bg: 'bg-gray-100',     text: 'text-gray-700',    label: 'Free' },
  starter:    { bg: 'bg-blue-100',     text: 'text-blue-700',    label: 'Starter' },
  growth:     { bg: 'bg-[#25D366]/15', text: 'text-[#075E54]',   label: 'Growth' },
  enterprise: { bg: 'bg-purple-100',   text: 'text-purple-700',  label: 'Enterprise' },
}

export function BusinessScreen({ business, isLoading, onEdit, onUpgradePlan }: BusinessScreenProps) {
  const plan = planBadge[business?.plan ?? 'free'] ?? planBadge.free
  const initials = business?.name?.slice(0, 2).toUpperCase() ?? '??'

  const fields = [
    { icon: Building2, key: 'name',     label: 'Business Name',   value: business?.name },
    { icon: Phone,     key: 'phone',    label: 'WhatsApp Number',  value: business?.phone },
    { icon: Tag,       key: 'category', label: 'Category',         value: business?.category },
    { icon: Coins,     key: 'currency', label: 'Currency',         value: business?.currency },
    { icon: Globe,     key: 'timezone', label: 'Timezone',         value: business?.timezone },
  ]

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      {/* Header */}
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <Text className="text-3xl font-black text-[#075E54] dark:text-white mb-6">Business</Text>

        {/* Logo + Name */}
        <View className="flex-row items-center gap-5">
          <View className="w-20 h-20 bg-[#25D366] rounded-3xl items-center justify-center shadow-lg">
            <Text className="text-white text-3xl font-black">{initials}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xl font-black text-gray-900 dark:text-white">{business?.name ?? '—'}</Text>
            {business?.description && (
              <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>{business.description}</Text>
            )}
            <View className={`mt-2 self-start px-3 py-1 rounded-full ${plan.bg}`}>
              <Text className={`text-xs font-black ${plan.text}`}>{plan.label} Plan</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Business Details */}
        <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest px-2 mb-3 mt-2">Details</Text>
        {fields.map((field) => (
          <TouchableOpacity
            key={field.key}
            onPress={() => onEdit?.(field.key)}
            className="bg-white dark:bg-[#111B21] rounded-3xl px-5 py-4 mb-3 shadow-sm flex-row items-center"
          >
            <View className="w-10 h-10 bg-[#25D366]/10 rounded-xl items-center justify-center mr-4">
              <field.icon color="#25D366" size={18} />
            </View>
            <View className="flex-1">
              <Text className="text-gray-400 text-xs mb-0.5">{field.label}</Text>
              <Text className="font-bold text-gray-900 dark:text-white">{field.value ?? '—'}</Text>
            </View>
            <Edit3 color="#9CA3AF" size={16} />
          </TouchableOpacity>
        ))}

        {/* WhatsApp Connection */}
        <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest px-2 mb-3 mt-4">WhatsApp</Text>
        <View className="bg-white dark:bg-[#111B21] rounded-3xl px-5 py-4 mb-3 shadow-sm flex-row items-center">
          <View className="w-10 h-10 bg-[#25D366]/10 rounded-xl items-center justify-center mr-4">
            <Phone color="#25D366" size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-gray-400 text-xs mb-0.5">Cloud API Account</Text>
            <Text className="font-bold text-gray-900 dark:text-white">
              {business?.whatsappAccountId ? `Connected (${business.whatsappAccountId})` : 'Not Connected'}
            </Text>
          </View>
          <View className={`w-3 h-3 rounded-full ${business?.whatsappAccountId ? 'bg-[#25D366]' : 'bg-gray-300'}`} />
        </View>

        {/* Upgrade CTA */}
        {business?.plan === 'free' && (
          <TouchableOpacity
            onPress={onUpgradePlan}
            className="bg-[#075E54] rounded-3xl p-6 mt-4 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-white font-black text-xl">Upgrade Plan</Text>
              <Text className="text-white/70 text-sm mt-1">Unlock advanced features & higher limits</Text>
            </View>
            <ChevronRight color="white" size={24} />
          </TouchableOpacity>
        )}

        <View className="h-8" />
      </ScrollView>
    </View>
  )
}
