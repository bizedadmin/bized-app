import { Platform } from 'react-native'

/**
 * Shared API client for both Next.js (web) and Expo (mobile).
 */
const BASE_URL = Platform.OS === 'web' 
  ? '' 
  : (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000') 

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || `API Error: ${response.status}`)
    }

    return data
  } catch (error: any) {
    console.error(`[API FETCH ERROR]: ${path}`, error)
    throw error
  }
}
