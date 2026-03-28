"use client"

import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { MotiView, MotiText } from 'moti'
import { Link } from 'solito/link'
import { LayoutDashboard, ShoppingBag, CreditCard, ChevronRight } from 'lucide-react-native'

export function HomeScreen() {
  const modules = [
    { title: 'Catalog', icon: ShoppingBag, color: '#25D366' },
    { title: 'Orders', icon: LayoutDashboard, color: '#075E54' },
    { title: 'Payments', icon: CreditCard, color: '#128C7E' },
  ]

  return (
    <View className="flex-1 bg-[#F0F2F5] dark:bg-[#111B21]">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          className="mb-8 items-center"
        >
          <View className="w-16 h-16 bg-[#25D366] rounded-2xl items-center justify-center shadow-lg mb-4">
            <LayoutDashboard size={32} color="white" />
          </View>
          <MotiText 
            className="text-4xl font-extrabold text-[#075E54] dark:text-[#25D366] mb-1"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 300 }}
          >
            Bized App
          </MotiText>
          <Text className="text-gray-500 dark:text-gray-400 font-medium">
            Universal Domain Dashboard
          </Text>
        </MotiView>

        <View className="space-y-4">
          {modules.map((item, index) => (
            <MotiView
              key={item.title}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 500, delay: 400 + index * 100 }}
            >
              <Link href={`/${item.title.toLowerCase()}`} legacyBehavior={false}>
                <View className="bg-white dark:bg-[#202c33] p-5 rounded-2xl flex-row items-center border border-gray-100 dark:border-gray-800 shadow-sm mt-4">
                  <View 
                    style={{ backgroundColor: item.color }} 
                    className="w-12 h-12 rounded-xl items-center justify-center mr-4 shadow-sm"
                  >
                    <item.icon size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                      {item.title} Module
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      Manage {item.title.toLowerCase()} configurations
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#8696a0" />
                </View>
              </Link>
            </MotiView>
          ))}
        </View>

        <View className="mt-12 bg-[#D1E9FF] dark:bg-[#202c33] p-6 rounded-3xl border border-[#34B7F1]/20">
           <Text className="text-[#075E54] dark:text-[#34B7F1] font-bold mb-2">💡 Quick Tip</Text>
           <Text className="text-gray-700 dark:text-gray-400 text-sm leading-6">
              Use Solito to share these 10 distinct module domains between your PWA and Native apps seamlessly.
           </Text>
        </View>
      </ScrollView>
    </View>
  )
}


