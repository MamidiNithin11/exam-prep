'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from 'react-markdown' 

export default function FloatingChatWidget({ question }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus()
  }, [isOpen, isMinimized])

  useEffect(() => {
    if (question && messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Hi! I'm your AI study assistant 🤖\n\nAsk me anything about this question.`,
        timestamp: new Date()
      }])
    }
  }, [question, messages.length])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          messages: [...messages, userMessage]
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      if (data.reply) {
        const assistantMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale:0, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
            exit={{ scale:0, opacity:0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
              size="icon"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale:0.8, opacity:0, y:20 }}
            animate={{ scale:1, opacity:1, y:0 }}
            exit={{ scale:0.8, opacity:0, y:20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px]"
          >
            <Card className="w-full h-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5"/>
                  <CardTitle className="text-lg font-semibold">AI Study Assistant</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20 w-8 h-8"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4"/> : <Minimize2 className="w-4 h-4"/>}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 w-8 h-8"
                  >
                    <X className="w-4 h-4"/>
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map(m => (
                        <div key={m.id} className={`flex gap-2 ${m.role==='user'?'justify-end':'justify-start'}`}>
                          {m.role==='assistant' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-white"/>
                            </div>
                          )}
                          <div className={`max-w-[280px] rounded-2xl px-4 py-2 ${m.role==='user'?'bg-gradient-to-r from-blue-500 to-purple-500 text-white':'bg-gray-100 text-gray-900'}`}>
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                            <p className={`text-xs mt-1 ${m.role==='user'?'text-blue-100':'text-gray-500'}`}>
                              {m.timestamp.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
                            </p>
                          </div>
                          {m.role==='user' && (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-gray-600"/>
                            </div>
                          )}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex gap-2 justify-start">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white"/>
                          </div>
                          <div className="bg-gray-100 rounded-2xl px-4 py-2">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-500"/>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef}/>
                    </div>
                  </ScrollArea>

                  <div className="border-t border-gray-200 p-4 flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e)=>setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about this question..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      size="icon"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
