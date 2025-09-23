"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Radio, Zap, ArrowRight, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { branches } from "@/data/data";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();
  const [user] = useState({ full_name: "Student" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get("jwt_token");
      if (!token) {
        router.replace("/login");
        return;
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, [router]);

  const handleBranchSelect = (branchId) => {
    router.push(`/semesters?branch=${branchId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome back,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {user.full_name}!
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose your engineering branch to access curated questions, detailed answers, and video tutorials for exam success.
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1000+</p>
                <p className="text-gray-600">Questions Available</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-gray-600">Engineering Branches</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Branch Selection */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Branch</h2>
          <p className="text-gray-600 mb-8">
            Select your engineering specialization to get started with targeted exam preparation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`border-2 ${branch.borderColor} ${branch.bgColor} hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden`}
                  onClick={() => handleBranchSelect(branch.id)}
                >
                  <CardHeader className="pb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${branch.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {branch.icon === "Brain" && <Brain className="w-8 h-8 text-white" />}
                        {branch.icon === "Cpu" && <Cpu className="w-8 h-8 text-white" />}
                        {branch.icon === "Radio" && <Radio className="w-8 h-8 text-white" />}
                        {branch.icon === "Zap" && <Zap className="w-8 h-8 text-white" />}
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          {branch.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 font-medium">{branch.fullName}</p>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-6 h-6 ${branch.textColor} group-hover:translate-x-2 transition-transform duration-300`}
                    />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 mb-4 leading-relaxed">{branch.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className={`${branch.bgColor} ${branch.textColor} font-medium px-3 py-1`}
                      >
                        8 Semesters Available
                      </Badge>
                      <Button
                        variant="ghost"
                        className={`${branch.textColor} hover:bg-white/50 font-semibold`}
                      >
                        Explore →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
