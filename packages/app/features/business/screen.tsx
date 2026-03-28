"use client"
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { Plus, Building2, ChevronRight, Store, ArrowRight, Settings } from 'lucide-react-native'

type Business = { id: string, name: string, role: string, initials: string, color: string }

const mockupBusinesses: Business[] = [
  // Uncomment below to test existing business UI
  // { id: '1', name: 'Bized Retail Store', role: 'Owner', initials: 'BR', color: 'bg-[#25D366]' },
]

export function BusinessScreen() {
  const hasBusinesses = mockupBusinesses.length > 0;

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="mt-8 mb-10">
          <View className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-6">
            <Building2 color="#25D366" size={32} strokeWidth={2.5} />
          </View>
          <Text className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Your Businesses
          </Text>
          <Text className="text-base font-medium text-gray-500 dark:text-gray-400">
            Select an existing workspace or create a new one to manage your WhatsApp sales.
          </Text>
        </View>

        {/* Create New Business CTA - Prominent if no businesses, secondary if businesses exist */}
        {!hasBusinesses && (
          <View className="bg-white dark:bg-[#111B21] rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-white/5 items-center mb-8">
            <View className="w-24 h-24 bg-gray-50 dark:bg-[#0B141A] rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-[#111B21] shadow-sm">
              <Store color="#9CA3AF" size={40} />
            </View>
            <Text className="text-xl font-black text-gray-900 dark:text-white text-center mb-2">No Businesses Yet</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-xs">
              Create your first business workspace to start generating revenue through WhatsApp.
            </Text>
            <TouchableOpacity 
              className="w-full bg-[#25D366] rounded-2xl flex-row items-center justify-center py-4 px-6 shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20bd5a] hover:-translate-y-1"
              style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
            >
              <Plus color="white" size={24} strokeWidth={3} className="mr-2" />
              <Text className="text-white font-bold text-lg">Create New Business</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* List of Existing Businesses */}
        {hasBusinesses && (
          <View className="space-y-4 mb-8">
            {mockupBusinesses.map((biz) => (
              <TouchableOpacity
                key={biz.id}
                className="bg-white dark:bg-[#111B21] rounded-[24px] p-5 flex-row items-center border border-gray-100 dark:border-white/5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] transition-all hover:border-[#25D366]/50 hover:shadow-md hover:-translate-y-1"
                style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
              >
                <View className={`w-14 h-14 ${biz.color} rounded-2xl flex items-center justify-center mr-5 shadow-sm`}>
                  <Text className="text-white font-black text-xl">{biz.initials}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-black text-gray-900 dark:text-white mb-1">{biz.name}</Text>
                  <View className="flex-row items-center">
                    <Text className="text-xs font-bold text-gray-500 uppercase tracking-widest">{biz.role}</Text>
                  </View>
                </View>
                <View className="w-10 h-10 bg-gray-50 dark:bg-[#0B141A] rounded-full flex items-center justify-center">
                  <ArrowRight color="#25D366" size={20} />
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              className="bg-transparent border-2 border-dashed border-gray-300 dark:border-gray-700/50 rounded-[24px] p-6 flex-row items-center justify-center mt-4 transition-all hover:border-[#25D366] hover:bg-gray-50 dark:hover:bg-white/5"
              style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
            >
              <Plus color="#9CA3AF" size={24} className="mr-3" />
              <Text className="text-gray-500 dark:text-gray-400 font-bold text-lg">Add Another Business</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Settings / Profile (Optional bottom elements) */}
        <TouchableOpacity 
          className="flex-row items-center py-4 self-center mt-auto opacity-60 transition-all hover:opacity-100"
          style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
        >
          <Settings color="#6B7280" size={18} className="mr-2" />
          <Text className="text-gray-500 dark:text-gray-400 font-bold text-sm">Account Settings</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}
