'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Loader2 } from 'lucide-react
import { Button } from '@/components/ui/button'
import { registerUser, loginUser, loginWithGoogle } from '@/lib/firebase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('register')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  useEffect(() => {
    let mounted = true

    const checkAuth = () => {
      const token = Cookies.get('jwt_token')
      if (token && mounted) {
        router.replace('/home')
      }
    }

    checkAuth()

    return () => {
      mounted = false
    }
  }, [router])
  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'register') {
        await registerUser(email, password)
        setMessage('Registration successful! Please log in.')
        setMode('login')
      } else {
        const userCredential = await loginUser(email, password)
        const jwtToken = await userCredential.user.getIdToken()
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        router.replace('/home')
      }
    } catch (err) {
      setMessage(err.message)
    } 
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const userCredential = await loginWithGoogle()
      const jwtToken = await userCredential.user.getIdToken()
      Cookies.set('jwt_token', jwtToken, { expires: 30 })
      router.replace('/home')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 animate-pulse" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 opacity-30 rounded-full blur-3xl animate-bounce-slow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 opacity-30 rounded-full blur-3xl animate-bounce-slow delay-700" />
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/image2.png"
            width={100}
            height={100}
            alt="logo"
            className="mb-4 p-2 bg-gradient-to-br from-white to-white-900 rounded-full border border-white-900 shadow-2xl"
          />
          <h1 className="text-3xl text-white font-extrabold text-center">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            {mode === 'login'
              ? 'Welcome back! 👋'
              : 'Join the future of exam prep 🚀'}
          </p>
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center shadow-md transition"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Continue with Google'
            )}
          </Button>
        </div>
        <div className="flex items-center my-6 text-gray-500">
          <hr className="flex-grow border-gray-700" />
          <span className="px-3 text-sm">or</span>
          <hr className="flex-grow border-gray-700" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none peer"
              required
            />
            <label className="absolute left-3 -top-2 text-xs text-purple-400 bg-gray-900 px-1">
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none peer"
              required
            />
            <label className="absolute left-3 -top-2 text-xs text-purple-400 bg-gray-900 px-1">
              Password
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 mx-auto animate-spin" />
            ) : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already registered?'}
          <button
            type="button"
            onClick={() =>
              setMode(mode === 'login' ? 'register' : 'login')
            }
            className="ml-2 text-purple-400 hover:underline font-semibold"
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
        {message && (
          <p className="mt-4 text-center text-red-400 text-sm font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
