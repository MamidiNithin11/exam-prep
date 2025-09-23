"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RotateCcw,
  Award,
  MessageCircle,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "./ChatBox";

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-red-100 text-red-800 border-red-200"
};

const unitColors = [
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-cyan-100 text-cyan-800 border-cyan-200"
];

export default function QuestionCard({ question, index = 0, isBookmarked = false, onBookmark = () => {}, onQuestionFocus = () => {} }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\\w\/|embed\/|watch\\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2]?.length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(question.youtube_url);
  const handleChatClick = (e) => {
    e.stopPropagation();
    onQuestionFocus(question);
  };

  if (!branch || !semester || !subjectParam || !subjectCode || !question) {
    return (
      <div className="min-h-screen p-6 md:p-8 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <p className="text-gray-700">Invalid or missing question.</p>
          <Button onClick={() => router.replace("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  const enriched = {
    id: question.id,
    text: question.question,
    answer: question.answer,
    unit: 1,
    difficulty: "medium",
    repeat_count: 0,
    youtube_url: "",
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              router.push(
                `/questions?branch=${encodeURIComponent(branch)}&semester=${encodeURIComponent(String(semester))}&subject=${encodeURIComponent(subjectParam)}`
              )
            }
            className="hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <QuestionCard
          question={enriched}
          index={0}
          isBookmarked={false}
          onBookmark={() => {}}
          onQuestionFocus={() => {}}
        />
      </div>
    </div>
  );
}
