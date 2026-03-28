"use client"
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { User as UserIcon, Building2, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native'

interface UserScreenProps {
  user?: {
    name: string; email: string; phone?: string
    role: string; avatarUrl?: string
  }
  business?: {
    name: string; plan: string; phone: string
  }
  onEditProfile?: () => void
  onEditBusiness?: () => void
  onLogout?: () => void
  onSection?: (section: string) => void
}

export function UserScreen({ user, business, onEditProfile, onEditBusiness, onLogout, onSection }: UserScreenProps) {
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? '??'
  const planColors: Record<string, string> = {
    free: 'bg-gray-100 text-gray-600',
    starter: 'bg-blue-100 text-blue-700',
    growth: 'bg-[#25D366]/10 text-[#075E54]',
    enterprise: 'bg-purple-100 text-purple-700',
  }
  const planColor = planColors[business?.plan ?? 'free'] ?? planColors.free

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      {/* Header / Profile Card */}
      <View className="bg-[#075E54] px-6 pt-16 pb-10">
        <View className="items-center mb-4">
          <View className="w-24 h-24 bg-[#25D366] rounded-3xl items-center justify-center shadow-2xl mb-4">
            <Text className="text-white text-4xl font-black">{initials}</Text>
          </View>
          <Text className="text-white text-2xl font-black">{user?.name ?? 'Loading...'}</Text>
          <Text className="text-white/70 mt-1">{user?.email}</Text>
          {user?.phone && <Text className="text-white/60 text-sm mt-0.5">{user.phone}</Text>}
        </View>

        {business && (
          <View className="bg-white/10 rounded-2xl p-4 mt-2 flex-row items-center justify-between">
            <View>
              <Text className="text-white font-black">{business.name}</Text>
              <Text className="text-white/60 text-sm mt-0.5">{business.phone}</Text>
            </View>
            <View className={`px-3 py-1.5 rounded-full ${planColor.split(' ')[0]} bg-white/20`}>
              <Text className="text-white text-xs font-black uppercase tracking-wide">{business.plan}</Text>
            </View>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest px-2 mb-3 mt-2">Account</Text>
        {[
          { icon: UserIcon,   label: 'Edit Profile',      desc: 'Update your name, email, photo', onPress: onEditProfile },
          { icon: Building2,  label: 'Business Settings',  desc: 'Name, category, currency',        onPress: onEditBusiness },
          { icon: Bell,       label: 'Notifications',      desc: 'Alerts and push settings',        onPress: () => onSection?.('notifications') },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={item.onPress}
            className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-3 shadow-sm flex-row items-center"
          >
            <View className="w-11 h-11 bg-[#25D366]/10 rounded-2xl items-center justify-center mr-4">
              <item.icon color="#25D366" size={20} />
            </View>
            <View className="flex-1">
              <Text className="font-black text-gray-900 dark:text-white">{item.label}</Text>
              <Text className="text-gray-400 text-sm mt-0.5">{item.desc}</Text>
            </View>
            <ChevronRight color="#9CA3AF" size={18} />
          </TouchableOpacity>
        ))}

        {/* Security & Support */}
        <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest px-2 mb-3 mt-4">Security & Support</Text>
        {[
          { icon: Shield,     label: 'Security',          desc: 'Password, 2FA, sessions',          onPress: () => onSection?.('security') },
          { icon: HelpCircle, label: 'Help & Support',    desc: 'Docs, chat support, feedback',     onPress: () => onSection?.('support') },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={item.onPress}
            className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-3 shadow-sm flex-row items-center"
          >
            <View className="w-11 h-11 bg-gray-100 dark:bg-white/10 rounded-2xl items-center justify-center mr-4">
              <item.icon color="#9CA3AF" size={20} />
            </View>
            <View className="flex-1">
              <Text className="font-black text-gray-900 dark:text-white">{item.label}</Text>
              <Text className="text-gray-400 text-sm mt-0.5">{item.desc}</Text>
            </View>
            <ChevronRight color="#9CA3AF" size={18} />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          onPress={onLogout}
          className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-3xl p-5 mt-4 flex-row items-center justify-center gap-3"
        >
          <LogOut color="#EF4444" size={20} />
          <Text className="text-red-500 font-black text-lg">Sign Out</Text>
        </TouchableOpacity>

        <View className="h-8" />
      </ScrollView>
    </View>
  )
}
