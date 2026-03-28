"use client"
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { Plus, MapPin, Store, ArrowRight, Settings, Users, LogOut, Smartphone } from 'lucide-react-native'
import { useRouter } from 'solito/router'
import { styled } from 'nativewind'

// Force standard RN components to behave with Tailwind classes on Web
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)

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
    <StyledView className="flex-1 bg-gray-50 dark:bg-[#0B141A]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: Platform.OS === 'web' ? 48 : 24 }} showsVerticalScrollIndicator={false}>
        
        {/* Navigation Breadcrumb / User */}
        <StyledView className="flex-row items-center justify-between mb-8">
          <StyledView className="flex-row items-center">
            <StyledText className="text-gray-400 font-bold text-sm">Organization</StyledText>
            <StyledText className="text-gray-400 font-bold mx-2">/</StyledText>
            <StyledView className="bg-white dark:bg-[#111B21] px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                <StyledText className="text-gray-900 dark:text-white font-black text-sm">{orgName}</StyledText>
            </StyledView>
          </StyledView>
          <StyledTouchableOpacity className="w-10 h-10 bg-[#25D366] rounded-full items-center justify-center shadow-lg shadow-[#25D366]/20">
             <StyledText className="text-white font-black text-xs">JD</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Dashboard Header */}
        <StyledView className="mb-10 lg:mb-16">
          <StyledText className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Businesses & Locations
          </StyledText>
          <StyledText className="text-base lg:text-lg font-semibold text-gray-500 dark:text-gray-400 mt-2">
            Select an active location to view sales metrics and manage WhatsApp bots.
          </StyledText>
        </StyledView>

        {/* Locations Grid / Empty State */}
        {!hasLocations ? (
          <StyledView className="bg-white dark:bg-[#111B21] rounded-[40px] p-12 shadow-sm border border-gray-100 dark:border-white/5 items-center mb-8">
            <StyledView className="w-28 h-28 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-8">
              <Store color="#25D366" size={48} />
            </StyledView>
            <StyledText className="text-2xl font-black text-gray-900 dark:text-white text-center mb-3">No Locations Found</StyledText>
            <StyledText className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-sm text-lg">
              You haven't added any businesses or delivery locations to your organization yet.
            </StyledText>
            <StyledTouchableOpacity 
              className="w-full max-w-sm bg-[#25D366] rounded-2xl flex-row items-center justify-center py-5 shadow-xl shadow-[#25D366]/30"
            >
              <Plus color="white" size={24} strokeWidth={3} className="mr-2" />
              <StyledText className="text-white font-bold text-lg">Add First Location</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        ) : (
          <StyledView className="space-y-6">
            <StyledView className="flex-row items-center justify-between mb-4 px-2">
               <StyledText className="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Manage Portfolio</StyledText>
               <StyledTouchableOpacity className="flex-row items-center bg-white dark:bg-[#111B21] px-4 py-2 rounded-full border border-gray-100 dark:border-white/5">
                  <Plus color="#25D366" size={16} className="mr-2" />
                  <StyledText className="text-[#25D366] font-black text-[10px]">NEW LOCATION</StyledText>
               </StyledTouchableOpacity>
            </StyledView>

            <StyledView className={`${Platform.OS === 'web' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex-col gap-4'}`}>
                {mockupLocations.map((loc) => (
                    <StyledTouchableOpacity
                        key={loc.id}
                        onPress={() => router.push('/dashboard')}
                        className="bg-white dark:bg-[#111B21] rounded-[32px] p-8 border border-gray-100 dark:border-white/5 shadow-sm transition-all hover:border-[#25D366]/50 hover:shadow-xl hover:-translate-y-1"
                        style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
                    >
                        <StyledView className="flex-row items-center mb-8">
                            <StyledView className={`w-14 h-14 ${loc.color} rounded-[20px] flex items-center justify-center mr-5 shadow-md`}>
                                <StyledText className="text-white font-black text-xl">{loc.initials}</StyledText>
                            </StyledView>
                            <StyledView className="flex-1">
                                <StyledText className="text-xl font-black text-gray-900 dark:text-white mb-0.5">{loc.name}</StyledText>
                                <StyledView className="flex-row items-center">
                                    <MapPin color="#9CA3AF" size={12} className="mr-1" />
                                    <StyledText className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {loc.id}</StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>

                        <StyledView className="h-px bg-gray-50 dark:bg-white/5 w-full mb-8" />

                        <StyledView className="flex-row items-center justify-between">
                            <StyledView className="flex-row gap-5">
                                <StyledView className="items-center flex-row gap-1.5">
                                    <Users color="#6B7280" size={16} />
                                    <StyledText className="text-gray-500 font-bold text-xs">{loc.staff} Staff</StyledText>
                                </StyledView>
                                <StyledView className="items-center flex-row gap-1.5">
                                    <Smartphone color={loc.whatsapp === 'Connected' ? "#25D366" : "#EF4444"} size={16} />
                                    <StyledText className={`font-bold text-xs ${loc.whatsapp === 'Connected' ? 'text-[#25D366]' : 'text-red-500'}`}>
                                        WhatsApp
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#0B141A] items-center justify-center">
                                <ArrowRight color="#25D366" size={20} />
                            </StyledView>
                        </StyledView>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>
          </StyledView>
        )}

        {/* Organization Management Footer */}
        <StyledView className="mt-12 lg:mt-24 pt-12 border-t border-gray-100 dark:border-white/5 flex-row items-center justify-between">
            <StyledTouchableOpacity className="flex-row items-center opacity-70 hover:opacity-100">
                <Settings color="#6B7280" size={18} className="mr-2" />
                <StyledText className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-[3px]">Org Settings</StyledText>
            </StyledTouchableOpacity>
            
            <StyledTouchableOpacity className="flex-row items-center opacity-70 hover:opacity-100">
                <StyledText className="text-red-500 font-black text-[10px] uppercase tracking-[3px] mr-2">Sign out</StyledText>
                <LogOut color="#EF4444" size={18} />
            </StyledTouchableOpacity>
        </StyledView>

      </ScrollView>
    </StyledView>
  )
}
