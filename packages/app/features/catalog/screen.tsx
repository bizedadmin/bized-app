"use client"
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Link } from 'solito/link'
import { Package, Plus, Search, ChevronRight } from 'lucide-react-native'

interface CatalogScreenProps {
  products?: Array<{ id: string; name: string; price: number; currency: string; inStock: boolean; imageUrl?: string }>
  isLoading?: boolean
  onAddProduct?: () => void
  onProductPress?: (id: string) => void
}

export function CatalogScreen({ products = [], isLoading, onAddProduct, onProductPress }: CatalogScreenProps) {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      {/* Header */}
      <View className="bg-white dark:bg-[#111B21] px-6 pt-12 pb-6 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-3xl font-black text-[#075E54] dark:text-white">Catalog</Text>
          <TouchableOpacity onPress={onAddProduct} className="w-12 h-12 bg-[#25D366] rounded-2xl items-center justify-center shadow-lg">
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center bg-gray-100 dark:bg-white/10 rounded-2xl px-4 py-3">
          <Search color="#9CA3AF" size={20} />
          <Text className="ml-3 text-gray-400">Search products...</Text>
        </View>
      </View>

      {/* Product List */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#25D366" size="large" />
        </View>
      ) : products.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Package color="#25D366" size={64} opacity={0.3} />
          <Text className="text-2xl font-black text-gray-400 mt-6">No products yet</Text>
          <Text className="text-gray-400 text-center mt-2">Add your first product to start selling</Text>
          <TouchableOpacity onPress={onAddProduct} className="bg-[#25D366] px-8 py-4 rounded-2xl mt-8">
            <Text className="text-white font-bold text-lg">Add Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onProductPress?.(item.id)} className="bg-white dark:bg-[#111B21] rounded-3xl p-5 mb-4 shadow-sm flex-row items-center">
              <View className="w-16 h-16 bg-[#25D366]/10 rounded-2xl items-center justify-center">
                <Package color="#25D366" size={32} />
              </View>
              <View className="flex-1 ml-4">
                <Text className="font-black text-lg text-gray-900 dark:text-white">{item.name}</Text>
                <Text className="text-[#25D366] font-bold mt-1">{item.currency} {item.price.toFixed(2)}</Text>
                <View className={`w-fit mt-1 px-2 py-0.5 rounded-full ${item.inStock ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Text className={`text-xs font-bold ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </Text>
                </View>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}
