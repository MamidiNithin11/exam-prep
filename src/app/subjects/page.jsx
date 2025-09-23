'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export default function Subjects() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    const branchParam = searchParams.get("branch");
    const semesterParam = searchParams.get("semester");

    if (branchParam && semesterParam) {
      setBranch(branchParam);
      setSemester(semesterParam);
    } else {
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  const getSubjectsForSemester = (branchId, semesterNum) => {
    const subjectMap = {
      "AI/ML": {
        1: [
          { name: "Engineering Mathematics-I", code: "MA101", questions: 45 },
          { name: "Engineering Physics", code: "PH101", questions: 38 },
          { name: "Engineering Chemistry", code: "CH101", questions: 42 },
          { name: "Programming in C", code: "CS101", questions: 52 },
          { name: "Engineering Graphics", code: "EG101", questions: 25 }
        ],
        2: [
          { name: "Engineering Mathematics-II", code: "MA102", questions: 48 },
          { name: "Engineering Physics-II", code: "PH102", questions: 40 },
          { name: "Data Structures", code: "CS102", questions: 65 },
          { name: "Digital Logic Design", code: "EC102", questions: 44 },
          { name: "Environmental Science", code: "EV102", questions: 28 }
        ],
        3: [
          { name: "Engineering Mathematics-III", code: "MA201", questions: 50 },
          { name: "Discrete Mathematics", code: "MA202", questions: 55 },
          { name: "Computer Organization", code: "CS201", questions: 62 },
          { name: "Database Management", code: "CS202", questions: 70 },
          { name: "Object Oriented Programming", code: "CS203", questions: 58 }
        ],
        4: [
          { name: "Theory of Computation", code: "CS204", questions: 68 },
          { name: "Computer Networks", code: "CS205", questions: 72 },
          { name: "Operating Systems", code: "CS206", questions: 65 },
          { name: "Software Engineering", code: "CS207", questions: 60 },
          { name: "Microprocessors", code: "EC204", questions: 45 }
        ],
        5: [
          { name: "Machine Learning", code: "AI301", questions: 85 },
          { name: "Artificial Intelligence", code: "AI302", questions: 78 },
          { name: "Data Mining", code: "AI303", questions: 70 },
          { name: "Neural Networks", code: "AI304", questions: 65 },
          { name: "Computer Vision", code: "AI305", questions: 58 }
        ],
        6: [
          { name: "Deep Learning", code: "AI306", questions: 82 },
          { name: "Natural Language Processing", code: "AI307", questions: 75 },
          { name: "Robotics", code: "AI308", questions: 68 },
          { name: "Pattern Recognition", code: "AI309", questions: 62 },
          { name: "Information Security", code: "CS306", questions: 55 }
        ],
        7: [
          { name: "Advanced Machine Learning", code: "AI401", questions: 90 },
          { name: "Distributed AI", code: "AI402", questions: 72 },
          { name: "AI Ethics", code: "AI403", questions: 45 },
          { name: "Research Methodology", code: "RM401", questions: 38 },
          { name: "Project Work I", code: "PW401", questions: 25 }
        ],
        8: [
          { name: "Industry Internship", code: "IN401", questions: 30 },
          { name: "Major Project", code: "MP401", questions: 20 },
          { name: "Entrepreneurship", code: "EN401", questions: 35 },
          { name: "Professional Ethics", code: "PE401", questions: 28 },
          { name: "Seminar", code: "SM401", questions: 15 }
        ]
      },
      "CSE": {
        1: [
          { name: "Engineering Mathematics-I", code: "MA101", questions: 45 },
          { name: "Engineering Physics", code: "PH101", questions: 38 },
          { name: "Engineering Chemistry", code: "CH101", questions: 42 },
          { name: "Programming in C", code: "CS101", questions: 52 },
          { name: "Engineering Graphics", code: "EG101", questions: 25 }
        ],
        2: [
          { name: "Engineering Mathematics-II", code: "MA102", questions: 48 },
          { name: "Engineering Physics-II", code: "PH102", questions: 40 },
          { name: "Data Structures", code: "CS102", questions: 65 },
          { name: "Digital Logic Design", code: "EC102", questions: 44 },
          { name: "Environmental Science", code: "EV102", questions: 28 }
        ]
      },
      "ECE": {
        1: [
          { name: "Engineering Mathematics-I", code: "MA101", questions: 45 },
          { name: "Engineering Physics", code: "PH101", questions: 38 },
          { name: "Engineering Chemistry", code: "CH101", questions: 42 },
          { name: "Basic Electrical Engineering", code: "EE101", questions: 48 },
          { name: "Engineering Graphics", code: "EG101", questions: 25 }
        ]
      },
      "EEE": {
        1: [
          { name: "Engineering Mathematics-I", code: "MA101", questions: 45 },
          { name: "Engineering Physics", code: "PH101", questions: 38 },
          { name: "Engineering Chemistry", code: "CH101", questions: 42 },
          { name: "Circuit Theory", code: "EE101", questions: 55 },
          { name: "Engineering Graphics", code: "EG101", questions: 25 }
        ]
      }
    };

    return subjectMap[branchId]?.[semesterNum] || [];
  };

  const subjects = getSubjectsForSemester(branch, parseInt(semester, 10));

  const handleSubjectSelect = (subjectName) => {
    router.push(`/questions?branch=${encodeURIComponent(branch)}&semester=${encodeURIComponent(semester)}&subject=${encodeURIComponent(subjectName)}`);
  };

  const getBranchInfo = (branchId) => {
    const branchMap = {
      "AI/ML": { name: "AI/ML", fullName: "Artificial Intelligence & Machine Learning", color: "from-purple-500 to-pink-500" },
      "CSE": { name: "CSE", fullName: "Computer Science Engineering", color: "from-blue-500 to-cyan-500" },
      "ECE": { name: "ECE", fullName: "Electronics & Communication Engineering", color: "from-green-500 to-emerald-500" },
      "EEE": { name: "EEE", fullName: "Electrical & Electronics Engineering", color: "from-orange-500 to-red-500" }
    };
    return branchMap[branchId] || branchMap["CSE"];
  };

  const branchInfo = getBranchInfo(branch);

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push(`/semesters?branch=${encodeURIComponent(branch)}`)}
            className="hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {branchInfo.name} - Semester {semester} Subjects
            </h1>
            <p className="text-gray-600 mt-1">Choose a subject to explore important questions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{subjects.length}</p>
                  <p className="text-sm text-gray-600">Total Subjects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {subjects.reduce((sum, subject) => sum + subject.questions, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">High</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm"
                  onClick={() => handleSubjectSelect(subject.name)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                          {subject.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {subject.code}
                        </Badge>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Questions Available</span>
                        </div>
                        <span className="font-bold text-blue-600">{subject.questions}</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${branchInfo.color} h-2 rounded-full`}
                          style={{ width: `${Math.min((subject.questions / 100) * 100, 100)}%` }}
                        />
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full text-blue-600 hover:bg-blue-50 font-semibold"
                      >
                        Start Studying →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Subjects Available</h3>
            <p className="text-gray-500">Subjects for this semester are being added. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}