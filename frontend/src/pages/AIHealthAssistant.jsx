import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const AIHealthAssistant = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm your AI Health Assistant. I can help you with health questions, provide general health information, and guide you to appropriate care. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { token, backendUrl } = useContext(AppContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const healthKeywords = [
    "health", "medical", "doctor", "symptoms", "pain", "fever", "headache",
    "stomach", "chest", "heart", "blood", "pressure", "diabetes", "cancer",
    "appointment", "medicine", "treatment", "diagnosis", "emergency"
  ];

  const isHealthRelated = (text) => {
    const lowerText = text.toLowerCase();
    return healthKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      // Check if message is health-related
      if (!isHealthRelated(input)) {
        setTimeout(() => {
          const botResponse = {
            type: "bot",
            content: "I apologize, but I can only assist with health-related questions and provide general health information. For non-medical topics, please consult appropriate professionals. How can I help you with your health concerns?",
            timestamp: new Date(),
            isWarning: true
          };
          setMessages(prev => [...prev, botResponse]);
          setIsTyping(false);
        }, 1500);
        return;
      }

      // Call AI health assistant API
      const res = await axios.post(
        `${backendUrl}/api/symptom/health-assistant`,
        { message: input.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        const botResponse = {
          type: "bot",
          content: res.data.response,
          timestamp: new Date(),
          suggestions: res.data.suggestions || [],
          shouldBookAppointment: res.data.shouldBookAppointment || false
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error(res.data.message);
      }

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        type: "bot",
        content: "I apologize, but I'm having trouble connecting right now. Please try again later or consult a healthcare professional for urgent matters.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const clearChat = () => {
    setMessages([
      {
        type: "bot",
        content: "Hello! I'm your AI Health Assistant. I can help you with health questions, provide general health information, and guide you to appropriate care. How can I assist you today?",
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400 to-cyan-600 rounded-full opacity-15 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glassmorphism Overlay */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-white/10">
        <div className="max-w-5xl mx-auto py-8 px-4">

          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="relative">
              {/* Pulsing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse" />

              <div className="relative flex items-center justify-center gap-4 mb-4">
                {/* Animated Robot Icon */}
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
                    <span className="text-4xl">🤖</span>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-50 animate-pulse" />
                </div>

                <div>
                  <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-pulse">
                    AI Health Assistant
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse" />
                </div>
              </div>

              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20 shadow-xl">
                Get instant health guidance, answer medical questions, and receive personalized health recommendations from our advanced AI assistant
              </p>
            </div>
          </div>

          {/* Main Chat Container */}
          <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl border border-white/30 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="p-8">

              {/* Enhanced Chat Container */}
              <div className="backdrop-blur-lg bg-gradient-to-br from-white/30 to-white/10 rounded-2xl p-6 mb-6 h-[500px] overflow-y-auto border border-white/20 shadow-inner relative">
                {/* Chat Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>

                {/* Messages */}
                <div className="relative space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-lg px-6 py-4 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 ${message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-blue-400/50'
                            : message.isError
                              ? 'bg-gradient-to-r from-red-500/90 to-red-600/90 text-white border border-red-400/50 backdrop-blur-sm'
                              : message.isWarning
                                ? 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-white border border-yellow-400/50 backdrop-blur-sm'
                                : 'bg-gradient-to-r from-white/90 to-white/70 text-gray-800 border border-white/50 backdrop-blur-sm'
                          }`}
                      >
                        {/* Message Header */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${message.type === 'user' ? 'bg-blue-300' : 'bg-purple-400'
                            } animate-pulse`} />
                          <span className={`text-xs font-medium ${message.type === 'user' ? 'text-blue-100' : 'text-purple-200'
                            }`}>
                            {message.type === 'user' ? 'You' : 'AI Assistant'}
                          </span>
                        </div>

                        <p className="text-sm leading-relaxed">{message.content}</p>

                        <p className={`text-xs mt-3 opacity-75 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                          {formatTime(message.timestamp)}
                        </p>

                        {/* Enhanced Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-xs font-medium text-purple-200 mb-2">💡 Suggested questions:</p>
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-left px-3 py-2 text-xs bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105 backdrop-blur-sm"
                                disabled={loading}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Enhanced Book Appointment Prompt */}
                        {message.shouldBookAppointment && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-lg animate-bounce">💡</span>
                              <p className="text-sm text-green-100 font-medium">
                                Consider booking an appointment with a specialist
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-gradient-to-r from-white/90 to-white/70 border border-white/50 px-6 py-4 rounded-3xl backdrop-blur-sm shadow-xl">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-purple-600 font-medium">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your health..."
                    className="w-full px-6 py-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200 shadow-xl transition-all duration-300"
                    disabled={loading}
                  />
                  {/* Input Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 transition-opacity duration-300 focus-within:opacity-100 -z-10" />
                </div>

                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className={`relative px-8 py-4 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 transform hover:scale-110 ${loading || !input.trim()
                      ? 'bg-gray-400/50 cursor-not-allowed backdrop-blur-sm'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/50'
                    }`}
                >
                  {/* Button Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <span className="relative z-10">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending</span>
                      </div>
                    ) : (
                      '🚀 Send'
                    )}
                  </span>
                </button>

                <button
                  onClick={clearChat}
                  className="px-6 py-4 bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-white/20"
                  title="Clear chat"
                >
                  🗑️
                </button>
              </div>

              {/* Enhanced Quick Questions */}
              <div className="mt-6">
                <p className="text-sm text-blue-100 mb-3 font-medium">⚡ Quick questions:</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "What are common cold symptoms?",
                    "How to manage blood pressure?",
                    "When to see a doctor for chest pain?",
                    "Tips for healthy diet"
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      className="px-4 py-2 text-sm bg-white/20 backdrop-blur-lg hover:bg-white/30 border border-white/30 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-white/20 text-white"
                      disabled={loading}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Enhanced Disclaimer */}
          <div className="text-center mt-8 backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl animate-pulse">⚠️</span>
              <h3 className="text-lg font-bold text-white">Important Medical Disclaimer</h3>
            </div>
            <div className="text-blue-100 text-sm space-y-1">
              <p>This AI assistant provides general health information only.</p>
              <p>For medical emergencies, please call emergency services immediately.</p>
              <p className="font-medium">Always consult healthcare professionals for personalized medical advice.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIHealthAssistant;