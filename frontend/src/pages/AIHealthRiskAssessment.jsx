import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const AIHealthRiskAssessment = () => {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const { token, backendUrl } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setUserProfile(data.userData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const runAssessment = async () => {
    if (!token) {
      setError("Please login to access health risk assessment");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAssessment(null);

      const { data } = await axios.post(
        `${backendUrl}/api/symptom/health-risk-assessment`,
        { userId: localStorage.getItem('userId') },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        setAssessment(data);
      } else {
        setError(data.message || "Assessment failed");
      }
    } catch (err) {
      console.error("Assessment error:", err);
      setError(err.response?.data?.message || "Unable to generate assessment");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case "high": return "🚨";
      case "medium": return "⚠️";
      case "low": return "✅";
      default: return "ℹ️";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900">
        {/* Floating Medical Icons */}
        <div className="absolute inset-0">
          {["🫀", "🧠", "🫁", "🦴", "💉", "🔬", "🫀", "⚕️"].map((icon, i) => (
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
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400 to-blue-600 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full opacity-15 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glassmorphism Overlay */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-white/10">
        <div className="max-w-6xl mx-auto py-8 px-4">

          {/* Enhanced Header */}
          <div className="text-center mb-10">
            <div className="relative">
              {/* Pulsing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-xl animate-pulse" />

              <div className="relative flex items-center justify-center gap-4 mb-4">
                {/* Animated Health Icon */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                    <span className="text-5xl">📊</span>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-3xl blur-lg opacity-50 animate-pulse" />
                </div>

                <div>
                  <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-violet-100 to-indigo-100 bg-clip-text text-transparent animate-pulse">
                    Health Risk Assessment
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full mt-2 animate-pulse" />
                </div>
              </div>

              <p className="text-xl text-violet-100 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20 shadow-xl">
                Get personalized health risk insights based on your profile. Our AI analyzes your health data to provide comprehensive risk assessment and preventive recommendations.
              </p>
            </div>
          </div>

          {/* Main Container */}
          <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl border border-white/30 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="p-8 md:p-10">

              {/* Profile Summary */}
              {userProfile && (
                <div className="mb-8 backdrop-blur-lg bg-white/20 p-6 rounded-2xl border border-white/30 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-3 text-3xl animate-pulse">👤</span>
                    Your Profile Summary
                  </h2>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="backdrop-blur-lg bg-white/10 p-4 rounded-xl border border-white/20">
                      <span className="font-medium text-violet-100 block text-sm">Age</span>
                      <span className="text-2xl font-bold text-white">
                        {userProfile.dob ? new Date().getFullYear() - new Date(userProfile.dob).getFullYear() : "N/A"}
                      </span>
                    </div>
                    <div className="backdrop-blur-lg bg-white/10 p-4 rounded-xl border border-white/20">
                      <span className="font-medium text-violet-100 block text-sm">Gender</span>
                      <span className="text-2xl font-bold text-white capitalize">
                        {userProfile.gender || "N/A"}
                      </span>
                    </div>
                    <div className="backdrop-blur-lg bg-white/10 p-4 rounded-xl border border-white/20">
                      <span className="font-medium text-violet-100 block text-sm">Location</span>
                      <span className="text-2xl font-bold text-white">
                        {userProfile.address ? "✓" : "N/A"}
                      </span>
                    </div>
                    <div className="backdrop-blur-lg bg-white/10 p-4 rounded-xl border border-white/20">
                      <span className="font-medium text-violet-100 block text-sm">Status</span>
                      <span className="text-2xl font-bold text-white">✓</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Assessment Button */}
              <div className="text-center mb-8">
                <button
                  onClick={runAssessment}
                  disabled={loading}
                  className={`relative px-10 py-5 rounded-2xl font-bold text-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 ${loading
                      ? 'bg-gray-400/50 cursor-not-allowed backdrop-blur-sm'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/50'
                    } text-white`}
                >
                  {/* Button Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <span className="relative z-10">
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span>Analyzing Your Health Profile...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="text-3xl mr-3">🔍</span>
                        <span>Run Health Risk Assessment</span>
                      </div>
                    )}
                  </span>
                </button>
                <p className="text-violet-100 mt-3 font-medium">
                  Comprehensive analysis based on your personal health data
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-8 backdrop-blur-lg bg-red-500/20 border border-red-400/50 rounded-2xl p-6 shadow-xl animate-fade-in">
                  <div className="flex items-center">
                    <span className="text-red-400 text-3xl mr-4 animate-bounce">❌</span>
                    <p className="text-red-100 font-bold text-lg">{error}</p>
                  </div>
                </div>
              )}

              {/* Assessment Results */}
              {assessment && (
                <div className="space-y-8 animate-fade-in">

                  {/* Overall Risk Summary */}
                  <div className={`relative rounded-3xl p-8 shadow-2xl border border-white/30 transform hover:scale-105 transition-all duration-300 ${assessment.overallRisk === "High" ? "bg-gradient-to-br from-red-600/40 to-red-700/40" :
                      assessment.overallRisk === "Medium" ? "bg-gradient-to-br from-yellow-600/40 to-orange-700/40" :
                        "bg-gradient-to-br from-green-600/40 to-emerald-700/40"
                    }`}>
                    <div className="absolute inset-0 rounded-3xl backdrop-blur-xl" />
                    <div className="relative">
                      <div className="text-center mb-4 flex items-center justify-center gap-4">
                        <span className="text-6xl animate-bounce">
                          {assessment.overallRisk === "High" ? "🚨" : assessment.overallRisk === "Medium" ? "⚠️" : "✅"}
                        </span>
                        <div>
                          <h2 className="text-4xl font-black text-white">Overall Risk Level</h2>
                          <p className="text-3xl font-bold text-white mt-2">{assessment.overallRisk}</p>
                        </div>
                      </div>
                      <p className="text-lg text-white/90 leading-relaxed">{assessment.overallSummary}</p>
                    </div>
                  </div>

                  {/* Risk Categories */}
                  {assessment.riskCategories && assessment.riskCategories.length > 0 && (
                    <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 border border-white/30">
                      <h3 className="text-3xl font-black text-white mb-6 flex items-center">
                        <span className="text-4xl mr-4 animate-pulse">⚡</span>
                        Risk Categories
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {assessment.riskCategories.map((category, index) => (
                          <div key={index} className={`backdrop-blur-lg bg-white/10 p-6 rounded-2xl border border-white/30 transform hover:scale-105 transition-all duration-300 shadow-xl ${getRiskColor(category.riskLevel)}`}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-xl">{category.category}</h4>
                              <span className="text-3xl">{getRiskIcon(category.riskLevel)}</span>
                            </div>
                            <p className="text-white/90 leading-relaxed">{category.description}</p>
                            <div className="mt-4 inline-block px-4 py-2 rounded-xl font-bold text-sm backdrop-blur-lg bg-white/20 border border-white/30">
                              {category.riskLevel} Risk
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {assessment.recommendations && assessment.recommendations.length > 0 && (
                    <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 border border-white/30">
                      <h3 className="text-3xl font-black text-white mb-6 flex items-center">
                        <span className="text-4xl mr-4 animate-pulse">💡</span>
                        Health Recommendations
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {assessment.recommendations.map((rec, index) => (
                          <div key={index} className="backdrop-blur-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 p-6 rounded-2xl border border-white/30 transform hover:scale-105 transition-all duration-300 shadow-xl">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{index + 1}</span>
                              </div>
                              <p className="text-white font-medium">{rec}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preventive Actions */}
                  {assessment.preventiveActions && assessment.preventiveActions.length > 0 && (
                    <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 border border-white/30">
                      <h3 className="text-3xl font-black text-white mb-6 flex items-center">
                        <span className="text-4xl mr-4 animate-pulse">🛡️</span>
                        Preventive Actions
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {assessment.preventiveActions.map((action, index) => (
                          <div key={index} className="backdrop-blur-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-white/30 transform hover:scale-105 transition-all duration-300 shadow-xl">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mt-1">
                                <span className="text-white text-lg">✓</span>
                              </div>
                              <p className="text-white font-medium">{action}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  {assessment.nextSteps && assessment.nextSteps.length > 0 && (
                    <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 border border-white/30">
                      <h3 className="text-3xl font-black text-white mb-6 flex items-center">
                        <span className="text-4xl mr-4 animate-pulse">📋</span>
                        Recommended Next Steps
                      </h3>
                      <div className="space-y-4">
                        {assessment.nextSteps.map((step, index) => (
                          <div key={index} className="backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-2xl border border-white/30 transform hover:scale-105 transition-all duration-300 shadow-xl">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center font-bold text-white text-lg">
                                {index + 1}
                              </div>
                              <p className="text-white font-medium text-lg">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div className="backdrop-blur-xl bg-yellow-500/20 border border-yellow-400/50 rounded-3xl p-6 shadow-2xl">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <span className="text-5xl animate-bounce">⚠️</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-yellow-100 mb-2">Important Medical Disclaimer</h3>
                        <p className="text-yellow-100 leading-relaxed">
                          This AI-powered health risk assessment is for informational purposes only and should not replace professional medical advice,
                          diagnosis, or treatment. Always consult with qualified healthcare providers for personalized medical recommendations.
                          The assessment is based on general health data and may not account for all individual factors.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Info Section */}
              {!assessment && !loading && (
                <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 border border-white/30">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">How It Works</h3>
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                      <div className="text-center transform hover:scale-110 transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <span className="text-4xl">📊</span>
                        </div>
                        <h4 className="font-bold text-white mb-2 text-lg">Profile Analysis</h4>
                        <p className="text-white/80">AI analyzes your age, gender, and health profile data</p>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <span className="text-4xl">🔬</span>
                        </div>
                        <h4 className="font-bold text-white mb-2 text-lg">Risk Assessment</h4>
                        <p className="text-white/80">Identifies potential health risks and provides personalized insights</p>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <span className="text-4xl">✅</span>
                        </div>
                        <h4 className="font-bold text-white mb-2 text-lg">Action Plan</h4>
                        <p className="text-white/80">Provides recommendations and preventive measures for better health</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default AIHealthRiskAssessment;