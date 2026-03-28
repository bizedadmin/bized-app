"use client"
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native'
import { Globe, Palette, Eye, Settings, ExternalLink, CheckCircle2 } from 'lucide-react-native'

interface StoreScreenProps {
  storeConfig?: {
    subdomain: string; customDomain?: string; theme: 'light' | 'dark' | 'auto'
    primaryColor: string; published: boolean; logoUrl?: string
    seoTitle?: string; seoDescription?: string
  }
  isLoading?: boolean
  onPublishToggle?: (published: boolean) => void
  onEditSection?: (section: 'theme' | 'domain' | 'seo') => void
}

export function StoreScreen({ storeConfig, isLoading, onPublishToggle, onEditSection }: StoreScreenProps) {
  const storeUrl = storeConfig?.customDomain
    ? `https://${storeConfig.customDomain}`
    : storeConfig?.subdomain
    ? `https://${storeConfig.subdomain}.bized.app`
    : null

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <Text className="text-3xl font-black text-[#075E54] dark:text-white mb-2">My Store</Text>
        <Text className="text-gray-500">Configure your PWA storefront</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Store Status Banner */}
        <View className={`rounded-3xl p-6 mb-6 ${storeConfig?.published ? 'bg-[#25D366]/10 border border-[#25D366]/20' : 'bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10'}`}>
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-4">
              <View className="flex-row items-center gap-2 mb-2">
                {storeConfig?.published ? (
                  <CheckCircle2 color="#25D366" size={20} />
                ) : (
                  <Globe color="#9CA3AF" size={20} />
                )}
                <Text className={`font-black text-lg ${storeConfig?.published ? 'text-[#075E54] dark:text-[#25D366]' : 'text-gray-400'}`}>
                  {storeConfig?.published ? 'Store is Live' : 'Store is Offline'}
                </Text>
              </View>
              {storeUrl && (
                <Text className="text-[#34B7F1] text-sm font-medium">{storeUrl}</Text>
              )}
            </View>
            <Switch
              value={storeConfig?.published ?? false}
              onValueChange={onPublishToggle}
              trackColor={{ false: '#E5E7EB', true: '#25D366' }}
              thumbColor="white"
            />
          </View>
        </View>

        {/* Settings Sections */}
        {[
          { key: 'theme', icon: Palette, label: 'Theme & Branding', desc: 'Colors, logo, and look & feel', color: '#34B7F1' },
          { key: 'domain', icon: Globe, label: 'Domain', desc: storeConfig?.customDomain ?? `${storeConfig?.subdomain ?? '—'}.bized.app`, color: '#25D366' },
          { key: 'seo', icon: Settings, label: 'SEO Settings', desc: 'Title, description, metadata', color: '#F59E0B' },
        ].map((section) => (
          <TouchableOpacity
            key={section.key}
            onPress={() => onEditSection?.(section.key as any)}
            className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-4 shadow-sm flex-row items-center"
          >
            <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4`} style={{ backgroundColor: `${section.color}20` }}>
              <section.icon color={section.color} size={22} />
            </View>
            <View className="flex-1">
              <Text className="font-black text-gray-900 dark:text-white">{section.label}</Text>
              <Text className="text-gray-400 text-sm mt-0.5">{section.desc}</Text>
            </View>
            <ExternalLink color="#9CA3AF" size={18} />
          </TouchableOpacity>
        ))}

        {/* Preview Banner */}
        {storeUrl && (
          <View className="bg-[#111B21] rounded-3xl p-6 mt-2">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white font-black text-lg">Preview Store</Text>
              <Eye color="#25D366" size={22} />
            </View>
            <View className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <View className="flex-row gap-1.5 mb-3">
                <View className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <View className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <View className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </View>
              <Text className="text-[#25D366] text-xs font-mono">{storeUrl}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
