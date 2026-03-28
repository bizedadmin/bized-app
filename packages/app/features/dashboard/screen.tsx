"use client"
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TrendingUp, ShoppingBag, Users, Activity, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react-native'
import { useState, useEffect } from 'react'
import { apiFetch } from '../../utils/api'

interface DashboardScreenProps {
  stats?: {
    revenue: number
    revenueGrowth: number
    orders: number
    ordersGrowth: number
    customers: number
    customersGrowth: number
  }
  recentOrders?: Array<{ id: string; customer: string; total: number; status: string; date: string }>
  isLoading?: boolean
  onNavigate?: (route: string) => void
}

export function DashboardScreen({ stats: initialStats, recentOrders: initialOrders, isLoading: initialLoading, onNavigate }: DashboardScreenProps) {
  const [stats, setStats] = useState(initialStats)
  const [recentOrders, setRecentOrders] = useState(initialOrders || [])
  const [loading, setLoading] = useState(initialLoading ?? !initialStats)
  const [error, setError] = useState<string | null>(null)

  const formatCurrency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  useEffect(() => {
    // Only fetch if data wasn't passed in as props
    if (!initialStats) {
      async function loadDashboard() {
        try {
          setLoading(true)
          const data = await apiFetch('/api/dashboard')
          setStats(data.stats)
          setRecentOrders(data.recentOrders || [])
        } catch (err: any) {
          setError(err.message || 'Failed to load dashboard')
        } finally {
          setLoading(false)
        }
      }
      loadDashboard()
    }
  }, [initialStats])

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-[#0B141A] items-center justify-center">
        <ActivityIndicator color="#25D366" size="large" />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-[#075E54] px-6 pt-12 pb-20">
        <Text className="text-white/80 font-medium mb-1">Overview</Text>
        <Text className="text-3xl font-black text-white">Dashboard</Text>
      </View>

      <ScrollView className="-mt-14 px-6" showsVerticalScrollIndicator={false}>
        {/* KPI Cards */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
          <View className="w-[48%] bg-white dark:bg-[#111B21] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/5">
            <View className="w-10 h-10 bg-[#25D366]/10 rounded-xl items-center justify-center mb-3">
              <TrendingUp color="#25D366" size={20} />
            </View>
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Revenue</Text>
            <Text className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              {stats ? formatCurrency(stats.revenue) : '—'}
            </Text>
            {stats && (
              <View className="flex-row items-center gap-1">
                {stats.revenueGrowth >= 0 ? <ArrowUpRight color="#25D366" size={16} /> : <ArrowDownRight color="#EF4444" size={16} />}
                <Text className={`text-xs font-bold ${stats.revenueGrowth >= 0 ? 'text-[#25D366]' : 'text-red-500'}`}>
                  {Math.abs(stats.revenueGrowth)}% <Text className="text-gray-400 font-medium">vs last month</Text>
                </Text>
              </View>
            )}
          </View>

          <View className="w-[48%] bg-white dark:bg-[#111B21] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/5">
            <View className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl items-center justify-center mb-3">
              <ShoppingBag color="#3B82F6" size={20} />
            </View>
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Orders</Text>
            <Text className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              {stats?.orders ?? '—'}
            </Text>
            {stats && (
              <View className="flex-row items-center gap-1">
                {stats.ordersGrowth >= 0 ? <ArrowUpRight color="#25D366" size={16} /> : <ArrowDownRight color="#EF4444" size={16} />}
                <Text className={`text-xs font-bold ${stats.ordersGrowth >= 0 ? 'text-[#25D366]' : 'text-red-500'}`}>
                  {Math.abs(stats.ordersGrowth)}% <Text className="text-gray-400 font-medium">vs last month</Text>
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <Text className="text-gray-900 dark:text-white font-black text-lg mb-3">Quick Actions</Text>
        <View className="bg-white dark:bg-[#111B21] rounded-3xl p-1 shadow-sm border border-gray-100 dark:border-white/5 mb-6">
          <TouchableOpacity onPress={() => onNavigate?.('catalog')} className="flex-row items-center px-4 py-3 border-b border-gray-50 dark:border-white/5">
            <View className="w-8 h-8 bg-[#25D366]/10 rounded-full items-center justify-center mr-3">
              <Package color="#25D366" size={16} />
            </View>
            <Text className="flex-1 font-bold text-gray-900 dark:text-white">Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('marketing')} className="flex-row items-center px-4 py-3 border-b border-gray-50 dark:border-white/5">
            <View className="w-8 h-8 bg-[#34B7F1]/10 rounded-full items-center justify-center mr-3">
              <Activity color="#34B7F1" size={16} />
            </View>
            <Text className="flex-1 font-bold text-gray-900 dark:text-white">Send Broadcast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate?.('store')} className="flex-row items-center px-4 py-3">
            <View className="w-8 h-8 bg-purple-500/10 rounded-full items-center justify-center mr-3">
              <Users color="#A855F7" size={16} />
            </View>
            <Text className="flex-1 font-bold text-gray-900 dark:text-white">View Storefront</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Orders */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-900 dark:text-white font-black text-lg">Recent Orders</Text>
          <TouchableOpacity onPress={() => onNavigate?.('orders')}>
            <Text className="text-[#25D366] font-bold text-sm">View All</Text>
          </TouchableOpacity>
        </View>
        
        {recentOrders.length === 0 ? (
           <View className="bg-white dark:bg-[#111B21] rounded-3xl p-8 items-center shadow-sm border border-gray-100 dark:border-white/5">
             <Text className="text-gray-400 font-medium">No recent orders</Text>
           </View>
        ) : (
          recentOrders.map((order) => (
            <View key={order.id} className="bg-white dark:bg-[#111B21] rounded-3xl p-4 mb-3 shadow-sm border border-gray-100 dark:border-white/5 flex-row items-center justify-between">
              <View>
                <Text className="font-bold text-gray-900 dark:text-white">{order.customer}</Text>
                <Text className="text-gray-400 text-xs mt-0.5">{order.date}</Text>
              </View>
              <View className="items-end">
                <Text className="font-black text-[#25D366]">{formatCurrency(order.total)}</Text>
                <Text className="text-xs font-bold text-gray-500 mt-0.5 capitalize">{order.status}</Text>
              </View>
            </View>
          ))
        )}

        <View className="h-8" />
      </ScrollView>
    </View>
  )
}
