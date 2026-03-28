"use client"
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export function LoginScreen({ onSignInWithGoogle, onSignInWithEmail }: {
  onSignInWithGoogle?: () => void
  onSignInWithEmail?: (e: string, p: string) => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigation<any>()

  const handleEmailSignIn = () => {
    if (onSignInWithEmail) onSignInWithEmail(email, password)
    else navigation.replace("Main")
  }

  const handleGoogleSignIn = () => {
    if (onSignInWithGoogle) onSignInWithGoogle()
    else navigation.replace("Main")
  }

  return (
    <View className="flex-1 bg-white dark:bg-[#0B141A] justify-center px-6">
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 mb-6">
          <Text className="text-white font-black text-2xl">b</Text>
        </View>
        <Text className="text-3xl font-black text-gray-900 dark:text-white text-center">
          Welcome back
        </Text>
        <Text className="text-gray-500 mt-2 text-center text-base">
          Log in to manage your business
        </Text>
      </View>

      <View className="space-y-4 max-w-sm mx-auto w-full">
        <TouchableOpacity 
          onPress={handleGoogleSignIn}
          className="w-full flex-row items-center justify-center gap-3 bg-white dark:bg-[#111B21] border border-gray-200 dark:border-white/10 py-4 rounded-2xl shadow-sm"
        >
          {/* Simple flat G icon */}
          <Text className="font-black text-lg text-blue-500">G</Text>
          <Text className="font-bold text-gray-700 dark:text-gray-300">Continue with Google</Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-4 opacity-30">
          <View className="flex-1 h-px bg-gray-400" />
          <Text className="px-4 text-gray-500 font-bold uppercase tracking-widest text-xs">Or email</Text>
          <View className="flex-1 h-px bg-gray-400" />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email</Text>
          <TextInput 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="admin@bized.app"
            placeholderTextColor="#9ca3af"
            className="w-full bg-gray-50 dark:bg-[#111B21] border border-gray-100 dark:border-white/10 px-5 py-4 rounded-2xl text-gray-900 dark:text-white"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Password</Text>
          <View className="relative justify-center">
            <TextInput 
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              className="w-full bg-gray-50 dark:bg-[#111B21] border border-gray-100 dark:border-white/10 px-5 py-4 rounded-2xl text-gray-900 dark:text-white pr-14"
            />
            <TouchableOpacity 
              className="absolute right-4 p-2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text className="text-gray-400 font-bold">{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleEmailSignIn}
          className="w-full bg-[#25D366] text-white py-4 rounded-2xl items-center shadow-lg shadow-green-500/20"
        >
          <Text className="text-white font-bold text-lg">Sign In</Text>
        </TouchableOpacity>

        <View className="items-center mt-6">
          <Text className="text-gray-500 text-sm">
            Don't have an account? <Text className="text-[#25D366] font-bold">Sign up free</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}
