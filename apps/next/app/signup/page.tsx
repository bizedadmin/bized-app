"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0B141A]">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-white font-black text-2xl">b</span>
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Start growing your business on WhatsApp today.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={() => signIn("google", { callbackUrl: "/locations" })}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm bg-white dark:bg-[#111B21] text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              Sign up with Google
            </button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white dark:bg-[#0B141A] text-gray-500 font-bold uppercase tracking-widest text-xs">
                    Or register with email
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="block w-full bg-gray-50 dark:bg-[#111B21] border border-gray-100 dark:border-white/10 px-5 py-4 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bized.app"
                  className="block w-full bg-gray-50 dark:bg-[#111B21] border border-gray-100 dark:border-white/10 px-5 py-4 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="block w-full bg-gray-50 dark:bg-[#111B21] border border-gray-100 dark:border-white/10 px-5 py-4 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  setError("");
                  
                  try {
                    const res = await fetch("/api/auth/register", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name, email, password }),
                    });
                    
                    if (res.ok) {
                      // Once registered, sign them in 
                      await signIn("credentials", { email, password, callbackUrl: "/locations" })
                    } else {
                      const data = await res.json();
                      setError(data.message || "An error occurred during registration");
                    }
                  } catch (err) {
                    setError("Failed to reach the server");
                  } finally {
                    setLoading(false);
                  }
                }}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-green-500/20 text-lg font-bold text-white transition-all ${loading ? 'bg-[#25D366]/60 cursor-not-allowed' : 'bg-[#25D366] hover:bg-[#1fba58] hover:-translate-y-px focus:outline-none'}`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account? <a href="/login" className="text-[#25D366] hover:text-[#1fba58] font-bold">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative side panel (hidden on mobile) */}
      <div className="hidden lg:block relative w-0 flex-1 bg-[#25D366]">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-[#25D366] to-[#075E54]">
          <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center text-white">
            <h3 className="text-4xl font-black mb-6">Join 2,000+ Businesses.</h3>
            <p className="text-lg text-white/90 max-w-md">
              Zero coding. Setup in under 5 minutes. Start selling on WhatsApp instantly.
            </p>
            <div className="mt-12 flex gap-2">
              <span className="text-3xl">⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
