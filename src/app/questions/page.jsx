'use client'

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BookOpen, RotateCcw, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { questionMap, subjectMap } from "@/data/data";
import FloatingChatWidget from '@/components/chat/FloatingChatWidget';

export default function QuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const branch = searchParams.get("branch") || "";
  const semesterStr = searchParams.get("semester") || "";
  const subjectParam = searchParams.get("subject") || "";
  const semester = Number.parseInt(semesterStr, 10);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id_desc");
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Resolve subject code: accept subject name (e.g., Engineering Mathematics-I) or code (e.g., MA101)
  const subjectCode = useMemo(() => {
    if (!branch || !semester || !subjectParam) return null;
    const semBucket = questionMap[branch]?.[semester];

    if (semBucket && Object.prototype.hasOwnProperty.call(semBucket, subjectParam)) {
      return subjectParam; // already a code key
    }
    const subjects = subjectMap[branch]?.[semester] || [];
    const match = subjects.find((s) => s.name === subjectParam);
    return match?.code || null;
  }, [branch, semester, subjectParam]);

  const questions = useMemo(() => {
    if (!branch || !semester || !subjectCode) return [];
    return questionMap[branch]?.[semester]?.[subjectCode] || [];
  }, [branch, semester, subjectCode]);

  const filteredQuestions = useMemo(() => {
    let list = questions;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
    }

    if (sortBy === "id_asc") {
      list = [...list].sort((a, b) => a.id - b.id);
    } else {
      list = [...list].sort((a, b) => b.id - a.id);
    }

    return list;
  }, [questions, searchTerm, sortBy]);

  if (!branch || !semester || !subjectParam || !subjectCode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-gray-700">Missing or invalid query parameters.</p>
          <Button onClick={() => router.replace("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                router.push(
                  `/subjects?branch=${encodeURIComponent(branch)}&semester=${encodeURIComponent(String(semester))}`
                )
              }
              className="hover:bg-white/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {subjectParam} {subjectParam !== subjectCode ? `(${subjectCode})` : ""}
              </h1>
              <p className="text-gray-600 mt-1">
                {branch} - Semester {semester} • {filteredQuestions.length} Questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {questions.length} Total Questions
            </Badge>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions or answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id_desc">Newest (ID)</SelectItem>
                  <SelectItem value="id_asc">Oldest (ID)</SelectItem>
                </SelectContent>
              </Select>

              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, index) => (
                <motion.div
                  key={`${subjectCode}-${q.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <Card 
                    className={`border-none shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer transition-all hover:shadow-xl ${
                      currentQuestion?.id === q.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setCurrentQuestion(q)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-gray-900">
                        Q{q.id}. {q.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">Answer:</span> {q.answer}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Questions Found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try clearing your search." : "Questions for this subject are being added. Check back soon!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Chat Widget */}
      {currentQuestion && <FloatingChatWidget question={currentQuestion} />}
    </div>
  );
}
