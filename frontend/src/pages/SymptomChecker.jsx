import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();
  const { token, backendUrl } = useContext(AppContext);

  // Real-time validation
  useEffect(() => {
    const errors = [];

    if (symptoms.trim()) {
      // Check for numbers
      if (/\d/.test(symptoms)) {
        errors.push("Please avoid using numbers in your symptom description");
      }

      // Check minimum length
      if (symptoms.trim().length < 3) {
        errors.push("Please provide more detailed symptoms (at least 3 characters)");
      }

      // Check for meaningful words
      const words = symptoms.trim().split(/\s+/);
      if (words.length < 1) {
        errors.push("Please enter at least one symptom");
      }

      // Check for common non-medical terms that might indicate invalid input
      const invalidTerms = ["test", "hello", "hi", "123", "abc"];
      const hasInvalidTerm = words.some(word =>
        invalidTerms.includes(word.toLowerCase())
      );
      if (hasInvalidTerm) {
        errors.push("Please describe actual medical symptoms");
      }
    }

    setValidationErrors(errors);
  }, [symptoms]);

  const validateInput = () => {
    const trimmed = symptoms.trim();

    if (!trimmed) {
      setError("Please enter your symptoms");
      return false;
    }

    if (trimmed.length < 3) {
      setError("Please provide more detailed symptoms");
      return false;
    }

    if (/\d/.test(trimmed)) {
      setError("Please enter valid medical symptoms without numbers");
      return false;
    }

    const words = trimmed.split(/\s+/);
    if (words.length < 1) {
      setError("Please describe your symptoms properly");
      return false;
    }

    return true;
  };

  const handleCheck = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setIsAnalyzing(true);

      const res = await axios.post(
        `${backendUrl}/api/symptom/predict`,
        { symptoms: symptoms.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setResult(res.data);
      } else {
        setError(res.data.message || "Prediction failed");
      }
    } catch (err) {
      console.error("Prediction error:", err);
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to analyze symptoms. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setTimeout(() => setIsAnalyzing(false), 1000);
    }
  };

  const handleBook = () => {
    if (token) {
      // Pass the priority from AI analysis to the doctors page
      navigate("/doctors", {
        state: {
          priority: result?.priority || "Low",
          department: result?.department,
          fromSymptomChecker: true
        }
      });
    } else {
      alert("Please login first to book an appointment");
      navigate("/login");
    }
  };

  const clearAll = () => {
    setSymptoms("");
    setResult(null);
    setError("");
    setValidationErrors([]);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.7) return "text-green-600";
    if (confidence >= 0.4) return "text-yellow-600";
    return "text-red-600";
  };

  const wordCount = symptoms.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = symptoms.length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        {/* Floating Medical Icons */}
        <div className="absolute inset-0">
          {["🩺", "💊", "🏥", "⚕️", "🩹", "🧬", "🔬", "📋"].map((icon, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-10 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-400 to-emerald-600 rounded-full opacity-15 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glassmorphism Overlay */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-white/10">
        <div className="max-w-5xl mx-auto py-8 px-4">

          {/* Enhanced Header */}
          <div className="text-center mb-10">
            <div className="relative">
              {/* Pulsing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-xl animate-pulse" />

              <div className="relative flex items-center justify-center gap-4 mb-4">
                {/* Animated Medical Icon */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                    <span className="text-5xl">🩺</span>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-lg opacity-50 animate-pulse" />
                </div>

                <div>
                  <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent animate-pulse">
                    AI Symptom Checker
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 animate-pulse" />
                </div>
              </div>

              <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20 shadow-xl">
                Describe your symptoms and get an AI-powered analysis to help you understand which medical department to consult
              </p>
            </div>
          </div>

          {/* Main Container */}
          <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl border border-white/30 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="p-8 md:p-10">

              {/* Enhanced Input Section */}
              <div className="mb-10">
                <label className="block text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-3">📝</span>
                  Describe Your Symptoms
                </label>

                <div className="relative">
                  <textarea
                    rows="8"
                    className={`w-full border-2 p-6 rounded-2xl text-lg resize-none transition-all duration-300 backdrop-blur-lg ${validationErrors.length > 0
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/20"
                        : "border-white/30 focus:border-emerald-400 focus:ring-emerald-200 bg-white/10"
                      } focus:ring-4 focus:outline-none text-white placeholder-emerald-200 shadow-2xl`}
                    placeholder="Example: I have chest pain and shortness of breath..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    maxLength={500}
                  />

                  {/* Enhanced Character/Word Counter */}
                  <div className="absolute bottom-4 right-4 backdrop-blur-lg bg-black/20 rounded-xl px-3 py-1 border border-white/20">
                    <span className="text-sm text-emerald-100 font-medium">
                      {charCount}/500 • {wordCount} words
                    </span>
                  </div>

                  {/* Input Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl blur-lg opacity-0 transition-opacity duration-300 focus-within:opacity-100 -z-10" />
                </div>

                {/* Enhanced Real-time Validation */}
                {validationErrors.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {validationErrors.map((error, index) => (
                      <div key={index} className="flex items-center backdrop-blur-lg bg-red-500/20 border border-red-400/50 rounded-xl p-3 animate-fade-in">
                        <span className="text-red-400 text-xl mr-3 animate-bounce">⚠️</span>
                        <p className="text-red-100 font-medium">{error}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Enhanced Tips */}
                <div className="mt-6 backdrop-blur-lg bg-emerald-500/20 rounded-2xl p-6 border border-emerald-400/30 shadow-xl">
                  <h4 className="font-bold text-emerald-100 mb-3 flex items-center text-lg">
                    <span className="mr-2 animate-pulse">💡</span>
                    Tips for better results:
                  </h4>
                  <ul className="text-emerald-100 space-y-2">
                    <li className="flex items-start">
                      <span className="text-emerald-300 mr-2 mt-1">•</span>
                      <span>Be specific about your symptoms (e.g., "sharp chest pain" vs "pain")</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-300 mr-2 mt-1">•</span>
                      <span>Mention duration and severity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-300 mr-2 mt-1">•</span>
                      <span>Include any associated symptoms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-300 mr-2 mt-1">•</span>
                      <span>Avoid medical jargon unless you're sure</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <button
                  onClick={handleCheck}
                  disabled={loading || validationErrors.length > 0}
                  className={`relative flex-1 py-4 px-8 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-110 ${loading || validationErrors.length > 0
                      ? 'bg-gray-400/50 cursor-not-allowed backdrop-blur-sm'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/50'
                    } text-white`}
                >
                  {/* Button Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span>Analyzing Symptoms...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🔍</span>
                        <span>Analyze Symptoms</span>
                      </div>
                    )}
                  </span>
                </button>

                <button
                  onClick={clearAll}
                  className="px-8 py-4 backdrop-blur-lg bg-white/20 border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-white/20"
                >
                  🗑️ Clear All
                </button>
              </div>

              {/* Enhanced Error Display */}
              {error && (
                <div className="mb-8 backdrop-blur-lg bg-red-500/20 border border-red-400/50 rounded-2xl p-6 shadow-xl animate-fade-in">
                  <div className="flex items-center">
                    <span className="text-red-400 text-3xl mr-4 animate-bounce">❌</span>
                    <p className="text-red-100 font-bold text-lg">{error}</p>
                  </div>
                </div>
              )}

              {/* Enhanced Results Section */}
              {result && (
                <div className="border-t border-white/30 pt-10">
                  <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-8 rounded-3xl border border-emerald-400/30 shadow-2xl">

                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-4 animate-bounce">🩺</span>
                      <h2 className="text-3xl font-black text-white">Analysis Results</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                      {/* Enhanced Department */}
                      <div className="backdrop-blur-lg bg-white/20 p-6 rounded-2xl shadow-xl border border-white/30 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <span className="text-3xl mr-3 animate-pulse">🏥</span>
                          <h3 className="font-bold text-white text-xl">Recommended Department</h3>
                        </div>
                        <p className="text-3xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                          {result.department}
                        </p>
                      </div>

                      {/* Enhanced Priority */}
                      <div className={`backdrop-blur-lg bg-white/20 p-6 rounded-2xl shadow-xl border border-white/30 transform hover:scale-105 transition-all duration-300 ${getPriorityColor(result.priority)}`}>
                        <div className="flex items-center mb-4">
                          <span className="text-3xl mr-3 animate-bounce">
                            {result.priority === "High" ? "🚨" : result.priority === "Medium" ? "⚠️" : "ℹ️"}
                          </span>
                          <h3 className="font-bold text-xl">Priority Level</h3>
                        </div>
                        <p className="text-3xl font-black">{result.priority}</p>
                      </div>

                    </div>

                    {/* Enhanced Confidence */}
                    <div className="mt-8 backdrop-blur-lg bg-white/20 p-6 rounded-2xl shadow-xl border border-white/30">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-white text-xl flex items-center">
                          <span className="mr-2">🎯</span>
                          AI Confidence Level
                        </span>
                        <span className={`font-black text-2xl ${getConfidenceColor(result.confidence)}`}>
                          {(result.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-300/50 rounded-full h-4 backdrop-blur-sm">
                          <div
                            className={`h-4 rounded-full transition-all duration-1000 ease-out ${result.confidence >= 0.7 ? "bg-gradient-to-r from-green-400 to-green-600" :
                                result.confidence >= 0.4 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
                                  "bg-gradient-to-r from-red-400 to-red-600"
                              } shadow-lg`}
                            style={{ width: `${result.confidence * 100}%` }}
                          />
                        </div>
                        {/* Animated confidence indicator */}
                        <div
                          className="absolute top-0 w-1 bg-white rounded-full shadow-lg animate-pulse"
                          style={{ left: `${result.confidence * 100}%`, transform: 'translateX(-50%)', height: '16px', marginTop: '-2px' }}
                        />
                      </div>
                    </div>

                    {/* Enhanced Warning */}
                    {result.warning && (
                      <div className="mt-6 backdrop-blur-lg bg-yellow-500/20 border border-yellow-400/50 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-start">
                          <span className="text-yellow-400 text-3xl mr-4 animate-bounce">⚠️</span>
                          <div>
                            <p className="font-bold text-yellow-100 mb-2 text-lg">Important Medical Notice</p>
                            <p className="text-yellow-100 leading-relaxed">{result.warning}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Action Button */}
                    <div className="mt-8 text-center">
                      <button
                        onClick={handleBook}
                        className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300"
                      >
                        {/* Button Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center">
                          <span className="text-2xl mr-3">📅</span>
                          Book Appointment Now
                        </span>
                      </button>
                      <p className="text-emerald-100 mt-3 font-medium">
                        {token ? "Find and book with the right specialist" : "Login required to book appointments"}
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Enhanced Footer Note */}
          <div className="text-center mt-10 backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-3xl animate-pulse">⚠️</span>
              <h3 className="text-xl font-bold text-white">Medical Disclaimer</h3>
            </div>
            <div className="text-emerald-100 text-sm space-y-2">
              <p className="font-medium">This is an AI-assisted tool for informational purposes only.</p>
              <p>Please consult a healthcare professional for proper medical advice and diagnosis.</p>
              <p className="text-emerald-200">Your health and safety are our top priority.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SymptomChecker;