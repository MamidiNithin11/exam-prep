"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

export default function ChatBox({ question }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about this question." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: `You are an assistant that helps students understand a specific exam question.` },
          { role: "system", content: `Context question: ${question?.question || question?.text || "No question provided"}\nAnswer: ${question?.answer || ""}` },
          ...messages,
          userMsg
        ],
        max_tokens: 800
      };

      const res = await fetch("/api/openrouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ??
        (data?.error ? `Error: ${data.error}` : "No response from model");
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Error connecting to AI. Please check your API key configuration." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(v => !v)}
        title="AI Helper"
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 w-80 bg-white border rounded-lg shadow-lg z-50 flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center bg-purple-600 text-white px-3 py-2">
              <span className="font-medium">AI Helper</span>
              <button onClick={() => setIsOpen(false)}><X className="w-4 h-4" /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-auto p-3 space-y-2 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-full p-2 rounded-md ${m.role === "user" ? "bg-blue-50 text-blue-800 self-end ml-auto" : "bg-gray-100 text-gray-800"}`}
                >
                  {m.content}
                </div>
              ))}
              {loading && <div className="text-gray-500 text-sm">Typing...</div>}
            </div>

            <div className="flex items-center gap-2 p-2 border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask your doubt..."
                className="flex-1 p-2 text-sm outline-none"
              />
              <button onClick={sendMessage} className="p-2 text-purple-600 hover:text-purple-800">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}