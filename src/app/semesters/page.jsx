"use client"

import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Calendar, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { semesters,branchMap } from '@/data/data';

export default function Semesters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const branch = searchParams.get("branch")
  const branchInfo = branchMap[branch]|| branchMap["CSE"];
  const handleSemesterSelect = (semesterNumber) => {
    router.push(`/subjects?branch=${(branch)}&semester=${semesterNumber}`)
  }

  useEffect(() => {
    if (!branch) {
      router.push("/dashboard")
    }
  }, [branch, router])


  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
    
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {branchInfo.name} - Select Semester
            </h1>
            <p className="text-gray-600 mt-1">{branchInfo.fullName}</p>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesters.map((semester, index) => (
            <motion.div
              key={semester.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm"
                onClick={() => handleSemesterSelect(semester.number)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${branchInfo.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-bold text-lg">
                          {semester.number}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          Semester {semester.number}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {semester.year}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <BookOpen className="w-4 h-4" />
                      <span>{semester.subjects.length} Subjects</span>
                    </div>
                    <div className="space-y-1">
                      {semester.subjects.slice(0, 3).map((subject, idx) => (
                        <div key={idx} className="text-sm text-gray-700 truncate">
                          • {subject}
                        </div>
                      ))}
                      {semester.subjects.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{semester.subjects.length - 3} more...
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-blue-600 hover:bg-blue-50 font-semibold"
                  >
                    View Subjects →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

       
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 font-medium">
              Academic Journey Progress
            </span>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`w-8 h-2 rounded-full ${
                    i < 4
                      ? "bg-gradient-to-r " + branchInfo.color
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You're making great progress!
          </p>
        </div>
      </div>
    </div>
  )
}
