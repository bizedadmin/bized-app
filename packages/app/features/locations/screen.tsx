"use client"
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { Plus, Building2, MapPin, Store, ArrowRight, Settings, Users, LogOut, Smartphone } from 'lucide-react-native'
import { useRouter } from 'solito/router'

// Use standard HTML for web to ensure the "ugly" unstyled issue is fixed instantly
const WebWrapper = ({ children, className }: any) => Platform.OS === 'web' ? <div className={className}>{children}</div> : <View className={className}>{children}</View>
const WebText = ({ children, className }: any) => Platform.OS === 'web' ? <span className={className}>{children}</span> : <Text className={className}>{children}</Text>

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
    <WebWrapper className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} showsVerticalScrollIndicator={false}>
        
        {/* Navigation Breadcrumb / User */}
        <WebWrapper className="flex-row items-center justify-between mb-8">
          <WebWrapper className="flex-row items-center">
            <WebText className="text-gray-400 font-bold text-sm">Organization</WebText>
            <WebText className="text-gray-400 font-bold mx-2">/</WebText>
            <TouchableOpacity className="bg-white dark:bg-[#111B21] px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                <WebText className="text-gray-900 dark:text-white font-black text-sm">{orgName}</WebText>
            </TouchableOpacity>
          </WebWrapper>
          <TouchableOpacity className="w-10 h-10 bg-[#25D366] rounded-full items-center justify-center shadow-lg shadow-[#25D366]/20">
             <WebText className="text-white font-black text-xs">JD</WebText>
          </TouchableOpacity>
        </WebWrapper>

        {/* Dashboard Header */}
        <WebWrapper className="mb-10">
          <WebText className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight block">
            Businesses & Locations
          </WebText>
          <WebText className="text-base font-semibold text-gray-500 dark:text-gray-400 mt-2 block">
            Select an active location to view sales metrics and manage WhatsApp bots.
          </WebText>
        </WebWrapper>

        {/* Locations Grid / Empty State */}
        {!hasLocations ? (
          <WebWrapper className="bg-white dark:bg-[#111B21] rounded-[40px] p-12 shadow-sm border border-gray-100 dark:border-white/5 items-center mb-8">
            <WebWrapper className="w-28 h-28 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-8">
              <Store color="#25D366" size={48} />
            </WebWrapper>
            <WebText className="text-2xl font-black text-gray-900 dark:text-white text-center mb-3">No Locations Found</WebText>
            <WebText className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-sm text-lg">
              You haven't added any businesses or delivery locations to your organization yet.
            </WebText>
            <TouchableOpacity 
              className="w-full max-w-sm bg-[#25D366] rounded-2xl flex-row items-center justify-center py-5 shadow-xl shadow-[#25D366]/30"
              style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
            >
              <Plus color="white" size={24} strokeWidth={3} className="mr-2" />
              <WebText className="text-white font-bold text-lg">Add First Location</WebText>
            </TouchableOpacity>
          </WebWrapper>
        ) : (
          <WebWrapper className="space-y-6">
            <WebWrapper className="flex-row items-center justify-between mb-2 px-2">
               <WebText className="text-[10px] font-black uppercase tracking-[3px] text-gray-400">Manage Your Portfolio</WebText>
               <TouchableOpacity className="flex-row items-center">
                  <Plus color="#25D366" size={16} className="mr-1" />
                  <WebText className="text-[#25D366] font-black text-[10px]">NEW LOCATION</WebText>
               </TouchableOpacity>
            </WebWrapper>

            <WebWrapper className={`${Platform.OS === 'web' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {mockupLocations.map((loc) => (
                    <TouchableOpacity
                        key={loc.id}
                        onPress={() => router.push('/dashboard')}
                        className="bg-white dark:bg-[#111B21] rounded-[32px] p-6 border border-gray-100 dark:border-white/5 shadow-sm transition-all hover:border-[#25D366]/50 hover:shadow-xl hover:-translate-y-1 block"
                        style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
                    >
                        <WebWrapper className="flex-row items-center mb-6">
                            <WebWrapper className={`w-14 h-14 ${loc.color} rounded-[20px] flex items-center justify-center mr-4 shadow-md`}>
                                <WebText className="text-white font-black text-xl">{loc.initials}</WebText>
                            </WebWrapper>
                            <WebWrapper className="flex-1">
                                <WebText className="text-xl font-black text-gray-900 dark:text-white mb-0.5 block">{loc.name}</WebText>
                                <WebWrapper className="flex-row items-center">
                                    <MapPin color="#9CA3AF" size={12} className="mr-1" />
                                    <WebText className="text-xs font-bold text-gray-500 uppercase tracking-widest">ID: {loc.id}</WebText>
                                </WebWrapper>
                            </WebWrapper>
                            <WebWrapper className={`px-2.5 py-1 rounded-full ${loc.status === 'Online' ? 'bg-green-100' : 'bg-red-100'}`}>
                                <WebText className={`text-[9px] font-black ${loc.status === 'Online' ? 'text-green-700' : 'text-red-700'}`}>
                                    {loc.status}
                                </WebText>
                            </WebWrapper>
                        </WebWrapper>

                        <WebWrapper className="h-px bg-gray-50 dark:bg-white/5 w-full mb-6" />

                        <WebWrapper className="flex-row items-center justify-between">
                            <WebWrapper className="flex-row gap-4">
                                <WebWrapper className="items-center flex-row gap-1">
                                    <Users color="#6B7280" size={14} />
                                    <WebText className="text-gray-500 font-bold text-[11px]">{loc.staff} Staff</WebText>
                                </WebWrapper>
                                <WebWrapper className="items-center flex-row gap-1">
                                    <Smartphone color={loc.whatsapp === 'Connected' ? "#25D366" : "#EF4444"} size={14} />
                                    <WebText className={`font-bold text-[11px] ${loc.whatsapp === 'Connected' ? 'text-[#25D366]' : 'text-red-500'}`}>
                                        WhatsApp
                                    </WebText>
                                </WebWrapper>
                            </WebWrapper>
                            <WebWrapper className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 items-center justify-center">
                                <ArrowRight color="#25D366" size={18} />
                            </WebWrapper>
                        </WebWrapper>
                    </TouchableOpacity>
                ))}
            </WebWrapper>
          </WebWrapper>
        )}

        {/* Organization Management Footer */}
        <WebWrapper className="mt-auto pt-12 border-t border-gray-100 dark:border-white/5 flex-row items-center justify-between">
            <TouchableOpacity className="flex-row items-center opacity-70 hover:opacity-100">
                <Settings color="#6B7280" size={18} className="mr-2" />
                <WebText className="text-gray-500 dark:text-gray-400 font-black text-xs uppercase tracking-widest">Org Settings</WebText>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center opacity-70 hover:opacity-100">
                <WebText className="text-red-500 font-black text-xs uppercase tracking-widest mr-2">Sign out</WebText>
                <LogOut color="#EF4444" size={18} />
            </TouchableOpacity>
        </WebWrapper>

      </ScrollView>
    </WebWrapper>
  )
}
