'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import LoginPage from './login/page'



export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/home')
      } else {
        setLoading(false) 
      }
    })
    return () => unsubscribe()
  }, [router])

  return (
    <div >
      <LoginPage />
    </div>
  )
}
