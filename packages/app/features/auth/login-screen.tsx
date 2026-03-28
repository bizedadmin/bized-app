"use client"
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'solito/navigation'
import { apiFetch } from '../../utils/api'

export function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      const msg = "Please fill in all fields"
      Platform.OS === 'web' ? alert(msg) : Alert.alert("Error", msg)
      return
    }

    setLoading(true)
    try {
      if (isLogin) {
        // Sign In
        const data = await apiFetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        })
        console.log("Logged in:", data)
        router.replace("/locations")
      } else {
        // Sign Up
        const data = await apiFetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        })
        const msg = "Account created! You can now sign in."
        Platform.OS === 'web' ? alert(msg) : Alert.alert("Success", msg)
        setIsLogin(true)
      }
    } catch (err: any) {
      const msg = err.message || "An error occurred"
      Platform.OS === 'web' ? alert(msg) : Alert.alert("Error", msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-[#0B141A] justify-center px-6">
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 mb-6">
          <Text className="text-white font-black text-2xl">b</Text>
        </View>
        <Text className="text-3xl font-black text-gray-900 dark:text-white text-center">
          {isLogin ? "Welcome back" : "Create Account"}
        </Text>
        <Text className="text-gray-500 mt-2 text-center text-base">
          {isLogin ? "Log in to manage your business" : "Start your journey with Bized"}
        </Text>
      </View>

      <View className="space-y-4 max-w-sm mx-auto w-full">
        {!isLogin && (
          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Full Name</Text>
            <TextInput 
              value={name}
              onChangeText={setName}
              placeholder="Jane Doe"
              placeholderTextColor="#9ca3af"
              className="w-full bg-gray-50 dark:bg-[#111B21] border border-gray-100 dark:border-white/10 px-5 py-4 rounded-2xl text-gray-900 dark:text-white"
            />
          </View>
        )}

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
          onPress={handleAuth}
          disabled={loading}
          className={`w-full ${loading ? 'opacity-70' : ''} bg-[#25D366] text-white py-4 rounded-2xl items-center shadow-lg shadow-green-500/20`}
        >
          {loading ? <ActivityIndicator color="white" /> : (
            <Text className="text-white font-bold text-lg">{isLogin ? "Sign In" : "Sign Up"}</Text>
          )}
        </TouchableOpacity>

        <View className="items-center mt-6">
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text className="text-gray-500 text-sm text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Text className="text-[#25D366] font-bold">{isLogin ? "Sign up free" : "Log in"}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
