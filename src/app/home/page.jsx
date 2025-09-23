'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GraduationCap, ArrowRight, BookOpen, Play, Users, Star, Award } from 'lucide-react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { ClipLoader } from 'react-spinners';
import Footer from '@/components/common/Footer'


export default function Home() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (!token) {
      router.push('/login')
      return
    }
    
    setCheckingAuth(false)
    
    // No need for cleanup function since we're just checking auth status
  }, [router])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    

    setTimeout(() => {
      setIsLoading(false)
      router.push('/home')
    }, 2000)
  }

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
           <ClipLoader color="#4F46E5" size={50} />;
      </div>
    )
  }
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                B.Tech ExamPrep
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Genius
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Study Smarter. Ace Every Semester.
                <span className="block mt-2 text-lg">
                  Access repeated important questions, clear answers, and YouTube tutorials - all in one place.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link href="/dashboard"
                  disabled={isLoading}
                 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <StatCard icon={<BookOpen className="w-8 h-8 text-blue-600" />} title="1000+" subtitle="Important Questions" color="bg-blue-100" />
                <StatCard icon={<Play className="w-8 h-8 text-purple-600" />} title="500+" subtitle="Video Tutorials" color="bg-purple-100" />
                <StatCard icon={<Users className="w-8 h-8 text-indigo-600" />} title="10k+" subtitle="Happy Students" color="bg-indigo-100" />
              </div>
            </div>
          </div>
        </div>     
        <FeaturesSection />       
        <div className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Exam Preparation?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of B.Tech students who are already studying smarter, not harder.
            </p>
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Your Journey Today
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div> 
        </div>
      </div> 
      <Footer />
    </div>
  )
}

function StatCard({ icon, title, subtitle, color }) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-white" />, title: 'Repeated Questions', description: 'Focus on questions that appear repeatedly in exams. Smart preparation starts here.', gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Play className="w-8 h-8 text-white" />, title: 'Video Tutorials', description: 'Watch curated YouTube videos for topics you find difficult. Visual learning made easy.', gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Star className="w-8 h-8 text-white" />, title: 'Branch-Specific', description: 'Content organized by AI/ML, CSE, ECE, EEE branches. Get exactly what you need.', gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <Award className="w-8 h-8 text-white" />, title: 'Smart Bookmarks', description: 'Save important questions and create your personal study collection for quick revision.', gradient: 'from-pink-500 to-pink-600'
    },
  ]

  return (
    <div className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ExamPrep Genius?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for B.Tech exam success, organized by branch and semester
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl"
            >
              <div className="text-center pb-4 px-6 pt-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
