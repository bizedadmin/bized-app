"use client"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { FileText, Plus, ChevronRight, Send, CheckCircle2, AlertCircle } from 'lucide-react-native'

type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

const statusConfig: Record<InvoiceStatus, { bg: string; text: string; label: string }> = {
  draft:     { bg: 'bg-gray-100',   text: 'text-gray-600',   label: 'Draft' },
  sent:      { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Sent' },
  paid:      { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Paid' },
  overdue:   { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Overdue' },
  cancelled: { bg: 'bg-gray-100',   text: 'text-gray-500',   label: 'Cancelled' },
}

interface InvoiceScreenProps {
  invoices?: Array<{
    id: string; customerName: string; total: number; currency: string
    status: InvoiceStatus; dueDate: string; createdAt: string
  }>
  isLoading?: boolean
  totalRevenue?: number
  totalCurrency?: string
  onCreateInvoice?: () => void
  onInvoicePress?: (id: string) => void
}

export function InvoiceScreen({ invoices = [], isLoading, totalRevenue, totalCurrency = 'USD', onCreateInvoice, onInvoicePress }: InvoiceScreenProps) {
  const paidCount = invoices.filter(i => i.status === 'paid').length
  const overdueCount = invoices.filter(i => i.status === 'overdue').length

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-black text-[#075E54] dark:text-white">Invoices</Text>
          <TouchableOpacity onPress={onCreateInvoice} className="w-12 h-12 bg-[#25D366] rounded-2xl items-center justify-center shadow-lg">
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* Revenue Summary */}
        {totalRevenue != null && (
          <View className="bg-[#25D366]/10 rounded-3xl p-5 mb-4">
            <Text className="text-gray-500 text-sm mb-1">Total Collected</Text>
            <Text className="text-4xl font-black text-[#075E54] dark:text-[#25D366]">{totalCurrency} {totalRevenue.toFixed(2)}</Text>
            <View className="flex-row gap-6 mt-3">
              <View className="flex-row items-center gap-2">
                <CheckCircle2 color="#25D366" size={16} />
                <Text className="text-gray-500 text-sm">{paidCount} paid</Text>
              </View>
              {overdueCount > 0 && (
                <View className="flex-row items-center gap-2">
                  <AlertCircle color="#EF4444" size={16} />
                  <Text className="text-red-500 text-sm font-bold">{overdueCount} overdue</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#25D366" size="large" />
        </View>
      ) : invoices.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <FileText color="#25D366" size={64} opacity={0.3} />
          <Text className="text-2xl font-black text-gray-400 mt-6">No invoices yet</Text>
          <Text className="text-gray-400 text-center mt-2">Create professional invoices and send via WhatsApp</Text>
          <TouchableOpacity onPress={onCreateInvoice} className="bg-[#25D366] px-8 py-4 rounded-2xl mt-8">
            <Text className="text-white font-bold text-lg">Create Invoice</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const sc = statusConfig[item.status]
            const isOverdue = item.status === 'overdue'
            return (
              <TouchableOpacity onPress={() => onInvoicePress?.(item.id)} className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-4 shadow-sm flex-row items-center">
                <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${isOverdue ? 'bg-red-100' : 'bg-[#25D366]/10'}`}>
                  <FileText color={isOverdue ? '#EF4444' : '#25D366'} size={22} />
                </View>
                <View className="flex-1">
                  <Text className="font-black text-gray-900 dark:text-white">{item.customerName}</Text>
                  <Text className="text-gray-400 text-sm mt-0.5">Due {new Date(item.dueDate).toLocaleDateString()}</Text>
                </View>
                <View className="items-end gap-2">
                  <Text className="font-black text-lg text-gray-900 dark:text-white">{item.currency} {item.total.toFixed(2)}</Text>
                  <View className={`px-2 py-0.5 rounded-full ${sc.bg}`}>
                    <Text className={`text-xs font-bold ${sc.text}`}>{sc.label}</Text>
                  </View>
                </View>
                <ChevronRight color="#9CA3AF" size={16} className="ml-2" />
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}
