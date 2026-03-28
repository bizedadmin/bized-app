"use client"
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { Plus, Building2, MapPin, Store, ArrowRight, Settings, Users, LogOut, CheckCircle, Smartphone } from 'lucide-react-native'
import { useRouter } from 'solito/router'

type BusinessLocation = { 
  id: string, 
  name: string, 
  status: 'Online' | 'Offline', 
  whatsapp: 'Connected' | 'Disconnected',
  initials: string, 
  color: string,
  staff: number
}

const mockupLocations: BusinessLocation[] = [
  { id: '1', name: 'Downtown Main Store', status: 'Online', whatsapp: 'Connected', initials: 'DS', color: 'bg-green-500', staff: 5 },
  { id: '2', name: 'Airport Pickup Point', status: 'Online', whatsapp: 'Disconnected', initials: 'AP', color: 'bg-blue-500', staff: 2 },
  { id: '3', name: 'Westside Logistics Hub', status: 'Offline', whatsapp: 'Connected', initials: 'WL', color: 'bg-orange-500', staff: 8 },
]

export function LocationsScreen() {
  const router = useRouter()
  const hasLocations = mockupLocations.length > 0;
  const orgName = "Bized Global Ltd";

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} showsVerticalScrollIndicator={false}>
        
        {/* Navigation Breadcrumb / User */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold text-sm">Organization</Text>
            <Text className="text-gray-400 font-bold mx-2">/</Text>
            <TouchableOpacity className="bg-white dark:bg-[#111B21] px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                <Text className="text-gray-900 dark:text-white font-black text-sm">{orgName}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-[#25D366] rounded-full items-center justify-center shadow-lg shadow-[#25D366]/20">
             <Text className="text-white font-black">JD</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Header */}
        <View className="mb-10">
          <Text className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Businesses & Locations
          </Text>
          <Text className="text-base font-semibold text-gray-500 dark:text-gray-400 mt-2">
            Select an active location to view sales metrics and manage WhatsApp bots.
          </Text>
        </View>

        {/* Create New Location CTA (Always visible if businesses exist) */}
        {!hasLocations ? (
          <View className="bg-white dark:bg-[#111B21] rounded-[40px] p-12 shadow-sm border border-gray-100 dark:border-white/5 items-center mb-8">
            <View className="w-28 h-28 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-8">
              <Store color="#25D366" size={48} />
            </View>
            <Text className="text-2xl font-black text-gray-900 dark:text-white text-center mb-3">No Locations Found</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-sm text-lg">
              You haven't added any businesses or delivery locations to your organization yet.
            </Text>
            <TouchableOpacity 
              className="w-full max-w-sm bg-[#25D366] rounded-2xl flex-row items-center justify-center py-5 shadow-xl shadow-[#25D366]/30 transition-all hover:bg-[#20bd5a] hover:-translate-y-1"
              style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
            >
              <Plus color="white" size={24} strokeWidth={3} className="mr-2" />
              <Text className="text-white font-bold text-lg">Add First Location</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="space-y-6">
            <View className="flex-row items-center justify-between mb-2 px-2">
               <Text className="text-xs font-black uppercase tracking-[3px] text-gray-400">Manage Your Portfolio</Text>
               <TouchableOpacity className="flex-row items-center">
                  <Plus color="#25D366" size={16} className="mr-1" />
                  <Text className="text-[#25D366] font-black text-xs">NEW LOCATION</Text>
               </TouchableOpacity>
            </View>

            <View className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockupLocations.map((loc) => (
                    <TouchableOpacity
                        key={loc.id}
                        onPress={() => router.push('/dashboard')}
                        className="bg-white dark:bg-[#111B21] rounded-[32px] p-6 border border-gray-100 dark:border-white/5 shadow-sm transition-all hover:border-[#25D366]/50 hover:shadow-xl hover:-translate-y-1"
                        style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
                    >
                        <View className="flex-row items-center mb-6">
                            <View className={`w-14 h-14 ${loc.color} rounded-[20px] flex items-center justify-center mr-4 shadow-md`}>
                                <Text className="text-white font-black text-xl">{loc.initials}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-xl font-black text-gray-900 dark:text-white mb-0.5">{loc.name}</Text>
                                <View className="flex-row items-center">
                                    <MapPin color="#9CA3AF" size={12} className="mr-1" />
                                    <Text className="text-xs font-bold text-gray-500">ID: {loc.id}</Text>
                                </View>
                            </View>
                            <View className={`px-3 py-1 rounded-full ${loc.status === 'Online' ? 'bg-green-100' : 'bg-red-100'}`}>
                                <Text className={`text-[10px] font-black ${loc.status === 'Online' ? 'text-green-700' : 'text-red-700'}`}>
                                    {loc.status}
                                </Text>
                            </View>
                        </View>

                        <View className="h-px bg-gray-50 dark:bg-white/5 w-full mb-6" />

                        <View className="flex-row items-center justify-between">
                            <View className="flex-row gap-4">
                                <View className="items-center flex-row gap-1">
                                    <Users color="#6B7280" size={14} />
                                    <Text className="text-gray-500 font-bold text-xs">{loc.staff} Staff</Text>
                                </View>
                                <View className="items-center flex-row gap-1">
                                    <Smartphone color={loc.whatsapp === 'Connected' ? "#25D366" : "#EF4444"} size={14} />
                                    <Text className={`font-bold text-xs ${loc.whatsapp === 'Connected' ? 'text-[#25D366]' : 'text-red-500'}`}>
                                        WhatsApp
                                    </Text>
                                </View>
                            </View>
                            <View className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 items-center justify-center">
                                <ArrowRight color="#25D366" size={18} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
          </View>
        )}

        {/* Organization Management Footer */}
        <View className="mt-auto pt-12 border-t border-gray-100 dark:border-white/5 flex-row items-center justify-between">
            <TouchableOpacity className="flex-row items-center opacity-70 hover:opacity-100">
                <Settings color="#6B7280" size={18} className="mr-2" />
                <Text className="text-gray-500 dark:text-gray-400 font-black text-xs uppercase tracking-widest">Org Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center opacity-70 hover:opacity-100">
                <Text className="text-red-500 font-black text-xs uppercase tracking-widest mr-2">Log out</Text>
                <LogOut color="#EF4444" size={18} />
            </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}
