import axios from "axios";
import userModel from "../models/userModel.js";

const predictSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    // Validate input
    if (!symptoms || typeof symptoms !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Symptoms are required and must be a valid text description",
      });
    }

    const trimmedSymptoms = symptoms.trim();
    if (trimmedSymptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a description of your symptoms",
      });
    }

    if (trimmedSymptoms.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Symptom description is too long. Please keep it under 1000 characters",
      });
    }

    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:5000";

    // Add timeout to prevent hanging requests
    const response = await axios.post(`${aiServiceUrl}/predict`, {
      symptoms: trimmedSymptoms
    }, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      ...response.data,
    });

  } catch (error) {
    console.log("AI Service Error:", error.message);

    // Handle different types of errors
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: "AI service is currently unavailable. Please try again later.",
      });
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: "AI service took too long to respond. Please try again.",
      });
    }

    if (error.response) {
      // AI service returned an error response
      const statusCode = error.response.status;
      const errorData = error.response.data;

      if (statusCode === 400 && errorData.error) {
        return res.status(400).json({
          success: false,
          message: errorData.error,
        });
      }

      return res.status(statusCode).json({
        success: false,
        message: errorData.message || "AI service error",
      });
    }

    // Generic error
    return res.status(500).json({
      success: false,
      message: "Unable to analyze symptoms at this time. Please try again later.",
    });
  }
};

const getHealthAssistantResponse = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Message is required and must be a valid text",
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message",
      });
    }

    if (trimmedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long. Please keep it under 2000 characters",
      });
    }

    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:5000";

    const response = await axios.post(`${aiServiceUrl}/health-assistant`, {
      message: trimmedMessage,
      userId: userId
    }, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      ...response.data,
    });

  } catch (error) {
    console.log("Health Assistant Error:", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: "AI service is currently unavailable. Please try again later.",
      });
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: "AI service took too long to respond. Please try again.",
      });
    }

    if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;

      return res.status(statusCode).json({
        success: false,
        message: errorData.error || "Health assistant error",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to get health assistant response. Please try again later.",
    });
  }
};

const getHealthRiskAssessment = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Get user profile from database
    const userData = await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:5000";

    const response = await axios.post(`${aiServiceUrl}/health-risk-assessment`, {
      userProfile: {
        name: userData.name,
        email: userData.email,
        dob: userData.dob,
        gender: userData.gender,
        address: userData.address,
        phone: userData.phone
      },
      userId: userId
    }, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      ...response.data,
    });

  } catch (error) {
    console.log("Health Risk Assessment Error:", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: "AI service is currently unavailable. Please try again later.",
      });
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: "AI service took too long to respond. Please try again.",
      });
    }

    if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;

      return res.status(statusCode).json({
        success: false,
        message: errorData.error || "Health risk assessment error",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to generate health risk assessment. Please try again later.",
    });
  }
};

export { predictSymptoms, getHealthAssistantResponse, getHealthRiskAssessment };