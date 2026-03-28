"use client"

import { 
  View as RNView, 
  Text as RNText, 
  ScrollView as RNScrollView, 
  TouchableOpacity as RNTouchableOpacity, 
  useWindowDimensions, 
  Platform 
} from 'react-native'
import { Link } from 'solito/link'
import { useNavigation } from '@react-navigation/native'
import { 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Zap, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  Play,
  ShoppingBag
} from 'lucide-react-native'

// Universal Shims to bypass NativeWind/Interop issues on Web while keeping one codebase
const View = Platform.OS === 'web' ? 'div' : RNView as any
const Text = Platform.OS === 'web' ? 'span' : RNText as any
const ScrollView = Platform.OS === 'web' ? ({ children, ...props }: any) => <div {...props}>{children}</div> : RNScrollView as any
const TouchableOpacity = Platform.OS === 'web' ? 'button' : RNTouchableOpacity as any

const whatsappGreen = '#25D366'
const whatsappDark = '#075E54'

export function LandingScreen() {
  const { width } = useWindowDimensions()
  const navigation = useNavigation<any>()
  const isDesktop = width > 1024

  return (
    <View className="flex-1 bg-white dark:bg-[#0B141A] min-h-screen">
      <ScrollView 
        className="flex-1"
      >
        <View style={{ paddingBottom: 100 }}>
        {/* Navigation Placeholder */}
        <View className="flex flex-row items-center justify-between px-6 py-6 lg:px-24">
           <View className="flex flex-row items-center space-x-2">
              <View className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg">
                 <MessageCircle color="white" size={24} />
              </View>
              <Text className="text-2xl font-black text-[#075E54] dark:text-[#25D366] tracking-tighter ml-2">
                bized
              </Text>
           </View>
           <View className="hidden lg:flex flex-row items-center gap-8">
              <Text className="text-gray-600 dark:text-gray-400 font-medium">Features</Text>
              <Text className="text-gray-600 dark:text-gray-400 font-medium">Solutions</Text>
              <Text className="text-gray-600 dark:text-gray-400 font-medium">Pricing</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate("login")}
                className="bg-[#25D366] px-6 py-3 rounded-full shadow-lg hover:opacity-80 transition-opacity"
              >
                 <Text className="text-white font-bold">Try for Free</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* Hero Section */}
        <View className="px-6 py-12 lg:px-24 lg:py-24 flex flex-col items-center overflow-hidden">
          <View className="flex flex-col items-center z-10">
            <View className="bg-[#25D366]/10 px-4 py-2 rounded-full mb-6 border border-[#25D366]/20">
               <Text className="text-[#075E54] dark:text-[#25D366] font-bold text-sm tracking-wide">
                  WHATSAPP CLOUD API PARTNER
               </Text>
            </View>
            <Text 
              className="text-5xl lg:text-8xl font-black text-center text-[#075E54] dark:text-white leading-[1.1] tracking-tight mb-6"
              style={Platform.OS === 'web' ? { display: 'block' } : {}}
            >
              Your Entire Business,{"\n"}
              <Text className="text-[#25D366]">Powered by WhatsApp.</Text>
            </Text>
            <Text className="text-lg lg:text-2xl text-center text-gray-500 dark:text-gray-400 max-w-3xl mb-12 leading-relaxed">
              The unified ecosystem for commerce, broadcasts, and AI-driven customer engagement. Built for the global scale.
            </Text>

            <View className="flex flex-col lg:flex-row lg:space-x-4 w-full lg:w-auto gap-4">
               <TouchableOpacity 
                  onPress={() => navigation.navigate("login")}
                  className="bg-[#25D366] px-10 py-5 rounded-2xl shadow-2xl shadow-[#25D366]/40 flex flex-row items-center justify-center hover:scale-105 transition-transform"
               >
                  <Text className="text-white text-xl font-bold mr-2">Get Started for Free</Text>
                  <ArrowRight color="white" size={20} />
               </TouchableOpacity>
               <TouchableOpacity className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-10 py-5 rounded-2xl flex flex-row items-center justify-center hover:bg-gray-50 transition-colors">
                  <Play color="#25D366" size={20} />
                  <Text className="text-[#075E54] dark:text-white text-xl font-bold ml-2">Book a Demo</Text>
               </TouchableOpacity>
            </View>
          </View>

          {/* Social Proof */}
          <View className="mt-16 flex flex-row items-center gap-8 grayscale opacity-50 dark:invert">
             <Text className="font-bold text-gray-400 text-sm tracking-widest text-center uppercase">Trusted by 2,000+ brands worldwide</Text>
          </View>
        </View>

        {/* Feature Bento Grid */}
        <View className="px-6 lg:px-24 py-12">
           <Text className="text-3xl lg:text-5xl font-black text-[#075E54] dark:text-white mb-12">One Platform. Infinite Growth.</Text>
           
           <View className="flex flex-col lg:flex-row gap-6">
              {/* WhatsApp Commerce - Major Card */}
              <View className="flex-1">
                 <View className="bg-[#25D366]/5 dark:bg-[#25D366]/10 border border-[#25D366]/20 p-8 lg:p-12 rounded-[40px] h-[550px] overflow-hidden flex flex-col justify-between shadow-sm">
                    <View>
                       <View className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg mb-8">
                          <ShoppingBag color="white" size={28} />
                       </View>
                       <Text className="text-3xl lg:text-4xl font-black text-[#075E54] dark:text-[#25D366] mb-4">WhatsApp Commerce</Text>
                       <Text className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                          Your catalog, synced directly to chats. Native checkouts, automated cart recovery, and seamless browsing.
                       </Text>
                    </View>
                    {/* Mockup - Floating Bubble */}
                    <View className="bg-white dark:bg-[#202c33] p-6 rounded-3xl shadow-2xl self-end w-72 border border-gray-100 dark:border-gray-800 rotate-2">
                       <View className="flex flex-row items-center mb-4">
                          <View className="w-10 h-10 bg-[#25D366]/20 rounded-full mr-3" />
                          <View>
                             <Text className="font-bold dark:text-white">Organic Juice Co.</Text>
                             <Text className="text-xs text-gray-400">Online</Text>
                          </View>
                       </View>
                       <View className="bg-[#DCF8C6] dark:bg-[#005C4B] p-4 rounded-2xl rounded-tr-none mb-3">
                          <Text className="text-sm dark:text-white">Added 'Cold Press Green' to cart! 🥤</Text>
                       </View>
                       <View className="bg-[#25D366] p-4 rounded-xl flex items-center shadow-md">
                          <Text className="text-white font-bold">🛒 View Cart (1)</Text>
                       </View>
                    </View>
                 </View>
              </View>

              {/* Smaller Cards Stack */}
              <View className="flex-1 flex flex-col gap-6">
                 <View className="flex flex-col lg:flex-row gap-6">
                    <View className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-8 rounded-[32px] h-[262px] flex flex-col justify-between hover:shadow-md transition-shadow">
                       <TrendingUp color="#34B7F1" size={40} />
                       <View>
                          <Text className="text-2xl font-black text-[#075E54] dark:text-white mb-2">98% Open Rate</Text>
                          <Text className="text-gray-500 text-sm">Targeted broadcasts that actually get read.</Text>
                       </View>
                    </View>
                    <View className="flex-1 bg-[#075E54] p-8 rounded-[32px] h-[262px] flex flex-col justify-between shadow-xl">
                       <Users color="white" size={40} />
                       <View>
                          <Text className="text-2xl font-black text-white mb-2">Team Inbox</Text>
                          <Text className="text-white/60 text-sm">Collaborative agents responding in real-time.</Text>
                       </View>
                    </View>
                 </View>
                 
                 {/* AI Chatbot - Magic Card */}
                 <View className="bg-[#111B21] p-10 rounded-[40px] h-[262px] flex flex-row items-center justify-between border border-[#25D366]/30 shadow-2xl">
                    <View className="flex-1">
                       <View className="flex flex-row items-center mb-4">
                          <Zap color="#25D366" size={24} />
                          <Text className="text-[#25D366] font-bold ml-2 tracking-widest uppercase text-xs">Magic AI</Text>
                       </View>
                       <Text className="text-white text-3xl font-black mb-2">Autonomous Bot</Text>
                       <Text className="text-gray-400 text-sm leading-relaxed">Handling bookings and generating payment links while you sleep.</Text>
                    </View>
                    <View className="hidden md:flex w-24 h-24 bg-[#25D366]/20 rounded-full items-center justify-center ml-4">
                       <View className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,211,102,0.4)]">
                          <MessageCircle color="white" size={32} />
                       </View>
                    </View>
                 </View>
              </View>
           </View>

           {/* Full Width Store Preview */}
           <View className="mt-12 bg-[#F0F2F5] dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] p-8 lg:p-20 overflow-hidden flex flex-col items-center">
              <View className="flex flex-col items-center mb-12">
                 <View className="w-20 h-20 bg-[#34B7F1]/10 rounded-3xl flex items-center justify-center mb-8">
                    <Globe color="#34B7F1" size={48} />
                 </View>
                 <Text className="text-3xl lg:text-6xl font-black text-[#075E54] dark:text-white text-center mb-6">PWA Storefront Sync</Text>
                 <Text className="text-gray-500 dark:text-gray-400 text-center max-w-2xl text-lg leading-relaxed">
                    A lightning-fast web storefront that stays 100% in sync with your WhatsApp Catalog. One inventory, infinite channels.
                 </Text>
              </View>
              {/* Desktop Mockup Simulation */}
              <View className="bg-white dark:bg-[#111B21] rounded-t-[40px] border border-gray-200 dark:border-gray-800 shadow-2xl h-80 mx-auto w-full lg:w-[90%] pt-6 px-6 relative overflow-hidden">
                 <View className="flex flex-row space-x-2 mb-8">
                    <View className="w-3 h-3 bg-red-400 rounded-full" />
                    <View className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <View className="w-3 h-3 bg-green-400 rounded-full" />
                 </View>
                 <View className="flex flex-row gap-6">
                    <View className="flex-1 h-64 bg-gray-50 dark:bg-white/5 rounded-2xl shadow-inner flex items-center justify-center">
                       <ShoppingBag color="#25D366" size={48} opacity={0.1} />
                    </View>
                    <View className="flex-1 h-64 bg-gray-50 dark:bg-white/5 rounded-2xl shadow-inner flex items-center justify-center">
                       <ShoppingBag color="#25D366" size={48} opacity={0.1} />
                    </View>
                    <View className="flex-1 h-64 bg-gray-100 dark:bg-white/5 rounded-2xl shadow-inner flex items-center justify-center">
                       <ShoppingBag color="#25D366" size={48} opacity={0.1} />
                    </View>
                 </View>
              </View>
           </View>
        </View>

        {/* Closing CTA */}
        <View className="px-6 py-32 flex flex-col items-center">
           <Text className="text-4xl lg:text-7xl font-black text-[#075E54] dark:text-white text-center mb-12">Ready to transform your commerce?</Text>
           <TouchableOpacity className="bg-[#25D366] px-16 py-8 rounded-[32px] shadow-2xl shadow-[#25D366]/50 hover:scale-105 transition-transform active:scale-95">
              <Text className="text-white text-3xl font-black italic tracking-tighter">JOIN THE BIZE-DOM</Text>
           </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  )
}
