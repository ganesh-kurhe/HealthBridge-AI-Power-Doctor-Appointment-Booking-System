import axios from "axios";

const healthAssistantChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.body.userId; // From auth middleware

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Message is required and must be a string",
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message",
      });
    }

    if (trimmedMessage.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Message is too long. Please keep it under 500 characters",
      });
    }

    // Call AI Health Assistant service
    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:5000";

    const response = await axios.post(`${aiServiceUrl}/health-chat`, {
      message: trimmedMessage,
      userId: userId
    }, {
      timeout: 15000, // 15 second timeout for chat
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      response: response.data.response,
      suggestions: response.data.suggestions || [],
      shouldBookAppointment: response.data.shouldBookAppointment || false
    });

  } catch (error) {
    console.log("AI Health Assistant Error:", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: "AI Health Assistant is currently unavailable. Please try again later.",
      });
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: "AI Health Assistant took too long to respond. Please try again.",
      });
    }

    if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;

      return res.status(statusCode).json({
        success: false,
        message: errorData.message || "AI Health Assistant error",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to connect to AI Health Assistant. Please try again later.",
    });
  }
};

const healthRiskAssessment = async (req, res) => {
  try {
    const { userProfile } = req.body;
    const userId = req.body.userId; // From auth middleware

    if (!userProfile) {
      return res.status(400).json({
        success: false,
        message: "User profile data is required",
      });
    }

    // Call AI Health Risk Assessment service
    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:5000";

    const response = await axios.post(`${aiServiceUrl}/health-risk-assessment`, {
      userProfile,
      userId
    }, {
      timeout: 20000, // 20 second timeout for assessment
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      assessment: response.data
    });

  } catch (error) {
    console.log("AI Health Risk Assessment Error:", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: "AI Health Risk Assessment is currently unavailable. Please try again later.",
      });
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: "AI Health Risk Assessment took too long to respond. Please try again.",
      });
    }

    if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;

      return res.status(statusCode).json({
        success: false,
        message: errorData.message || "AI Health Risk Assessment error",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to generate health risk assessment. Please try again later.",
    });
  }
};

export { healthAssistantChat, healthRiskAssessment };