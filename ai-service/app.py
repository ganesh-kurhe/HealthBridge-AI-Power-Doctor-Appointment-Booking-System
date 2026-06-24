from flask import Flask, request, jsonify
import pickle
import numpy as np
import os

app = Flask(__name__)

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load trained models
with open(os.path.join(script_dir, "vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)

with open(os.path.join(script_dir, "department_model.pkl"), "rb") as f:
    department_model = pickle.load(f)

with open(os.path.join(script_dir, "priority_model.pkl"), "rb") as f:
    priority_model = pickle.load(f)


@app.route("/")
def home():
    return "AI Symptom Checker API Running"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json or {}
        symptoms = data.get("symptoms", "").strip().lower()

        # 1. Empty input
        if not symptoms:
            return jsonify({"error": "Symptoms are required"}), 400

        # 2. Check input type
        if not isinstance(symptoms, str):
            return jsonify({"error": "Symptoms must be a text description"}), 400

        # 3. Length validation
        if len(symptoms) > 1000:
            return jsonify({"error": "Symptom description is too long"}), 400

        if len(symptoms) < 3:
            return jsonify({"error": "Please provide more detailed symptoms"}), 400

        # 4. Reject numbers / invalid input
        if any(char.isdigit() for char in symptoms):
            return jsonify({
                "error": "Please enter valid medical symptoms (not numbers)"
            }), 400

        # 5. Check for meaningful words
        words = symptoms.split()
        if len(words) < 1:
            return jsonify({
                "error": "Please describe your symptoms properly"
            }), 400

        # 6. Filter out common non-medical terms
        invalid_terms = ["test", "hello", "hi", "123", "abc", "xyz", "qwerty"]
        if any(word in invalid_terms for word in words):
            return jsonify({
                "error": "Please describe actual medical symptoms"
            }), 400

        # 7. Convert to vector
        input_vector = vectorizer.transform([symptoms])

        # 8. Reject unknown words
        if input_vector.nnz == 0:
            return jsonify({
                "error": "Unknown symptoms. Please enter valid medical terms."
            }), 400

        # 9. Prediction probabilities
        dept_probs = department_model.predict_proba(input_vector)[0]
        priority_probs = priority_model.predict_proba(input_vector)[0]

        dept_conf = float(np.max(dept_probs))

        # 10. Final predictions
        department = department_model.classes_[int(np.argmax(dept_probs))]
        priority = priority_model.classes_[int(np.argmax(priority_probs))]

        # 11. Confidence warning
        warning = None
        if dept_conf < 0.3:
            warning = "Low confidence prediction. Please consult a doctor."
        elif dept_conf < 0.5:
            warning = "Moderate confidence. Consider consulting a healthcare professional."

        return jsonify({
            "department": department,
            "priority": priority,
            "confidence": round(dept_conf, 2),
            "warning": warning
        })

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": "Internal server error. Please try again."}), 500


@app.route("/health-assistant", methods=["POST"])
def health_chat():
    try:
        data = request.json or {}
        message = data.get("message", "").strip().lower()
        user_id = data.get("userId")

        # 1. Empty message
        if not message:
            return jsonify({"error": "Message is required"}), 400

        # 2. Check message type and length
        if not isinstance(message, str):
            return jsonify({"error": "Message must be a string"}), 400

        if len(message) > 500:
            return jsonify({"error": "Message is too long"}), 400

        # 3. Basic health-related keywords for filtering
        health_keywords = [
            "health", "medical", "doctor", "symptoms", "pain", "fever", "headache",
            "stomach", "chest", "heart", "blood", "pressure", "diabetes", "cancer",
            "appointment", "medicine", "treatment", "diagnosis", "emergency",
            "diet", "exercise", "wellness", "prevention", "vaccine", "mental"
        ]

        is_health_related = any(keyword in message for keyword in health_keywords)

        if not is_health_related:
            return jsonify({
                "response": "I apologize, but I can only assist with health-related questions and provide general health information. For non-medical topics, please consult appropriate professionals.",
                "suggestions": [
                    "What are the symptoms of common cold?",
                    "How to maintain healthy blood pressure?",
                    "When should I see a doctor?"
                ]
            })

        # 4. Generate contextual response based on keywords
        response = generate_health_response(message)
        suggestions = generate_suggestions(message)
        should_book = should_recommend_appointment(message)

        return jsonify({
            "response": response,
            "suggestions": suggestions,
            "shouldBookAppointment": should_book
        })

    except Exception as e:
        print(f"Health chat error: {str(e)}")
        return jsonify({"error": "Unable to process your health question. Please try again."}), 500


def generate_health_response(message):
    """Generate contextual health response based on message content"""
    message_lower = message.lower()

    # Emergency keywords
    emergency_keywords = ["chest pain", "difficulty breathing", "severe pain", "unconscious", "bleeding heavily", "heart attack", "stroke"]
    if any(keyword in message_lower for keyword in emergency_keywords):
        return "⚠️ EMERGENCY ALERT: This sounds like a medical emergency! Please call emergency services (911) immediately or go to the nearest emergency room. Do not wait - seek immediate medical attention!"

    # High priority symptoms
    high_priority = ["severe headache", "high fever", "severe chest pain", "shortness of breath", "uncontrolled bleeding"]
    if any(symptom in message_lower for symptom in high_priority):
        return "This sounds serious and requires immediate medical attention. Please consult a healthcare professional right away or visit the emergency room if symptoms are severe."

    # Common questions
    if "common cold" in message_lower or "cold symptoms" in message_lower:
        return "Common cold symptoms include runny nose, sore throat, cough, congestion, and sometimes low-grade fever. Most colds resolve within 7-10 days with rest, fluids, and over-the-counter medications. However, if symptoms worsen or persist, consult a doctor."

    if "blood pressure" in message_lower:
        return "Normal blood pressure is typically 120/80 mmHg or lower. High blood pressure (hypertension) often has no symptoms but can lead to serious health issues. Regular monitoring, healthy diet, exercise, and medication (if prescribed) are important for management."

    if "diabetes" in message_lower:
        return "Diabetes management involves monitoring blood sugar, healthy eating, regular exercise, and taking medications as prescribed. Type 1 requires insulin, while Type 2 may be managed with lifestyle changes and oral medications. Regular check-ups are essential."

    if "headache" in message_lower:
        return "Headaches can have many causes. Most are benign but persistent or severe headaches should be evaluated by a doctor. Common triggers include stress, dehydration, lack of sleep, or eye strain. If accompanied by other symptoms, seek medical attention."

    if "diet" in message_lower or "nutrition" in message_lower:
        return "A healthy diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Stay hydrated, limit processed foods and sugars. Consider consulting a registered dietitian for personalized nutrition advice."

    if "exercise" in message_lower or "workout" in message_lower:
        return "Regular exercise (150 minutes of moderate activity per week) improves cardiovascular health, strengthens muscles, and boosts mental health. Choose activities you enjoy and consult your doctor before starting a new exercise program."

    # General response for other health questions
    return "Thank you for your health question. While I can provide general health information, please remember that I'm not a substitute for professional medical advice. For personalized guidance, please consult a qualified healthcare professional who can consider your complete medical history."


def generate_suggestions(message):
    """Generate follow-up question suggestions based on the message"""
    message_lower = message.lower()

    suggestions = []

    if "pain" in message_lower:
        suggestions.extend([
            "Where exactly is the pain located?",
            "How long have you had this pain?",
            "Is the pain constant or does it come and go?"
        ])

    if "fever" in message_lower:
        suggestions.extend([
            "What is your temperature reading?",
            "How long have you had the fever?",
            "Are you experiencing any other symptoms?"
        ])

    if "diet" in message_lower or "food" in message_lower:
        suggestions.extend([
            "What specific dietary changes are you considering?",
            "Do you have any food allergies or restrictions?",
            "Are you looking to lose, maintain, or gain weight?"
        ])

    if "exercise" in message_lower:
        suggestions.extend([
            "What type of exercise are you interested in?",
            "Do you have any existing health conditions?",
            "How much time can you dedicate to exercise weekly?"
        ])

    # Default suggestions
    if len(suggestions) == 0:
        suggestions = [
            "Can you describe your symptoms in more detail?",
            "How long have you been experiencing this?",
            "Have you noticed any triggers or patterns?"
        ]

    return suggestions[:3]  # Return max 3 suggestions


def should_recommend_appointment(message):
    """Determine if appointment booking should be recommended"""
    message_lower = message.lower()

    # Keywords that suggest need for professional consultation
    appointment_keywords = [
        "severe", "persistent", "worsening", "chronic", "unusual",
        "emergency", "urgent", "worried", "concerned", "scared",
        "pain", "bleeding", "fever", "infection", "injury"
    ]

    # Check for multiple symptoms or concerning language
    symptom_count = sum(1 for keyword in ["pain", "fever", "headache", "nausea", "dizziness", "fatigue", "weakness"] if keyword in message_lower)
    concerning_count = sum(1 for keyword in appointment_keywords if keyword in message_lower)

    return symptom_count >= 2 or concerning_count >= 2 or "severe" in message_lower or "emergency" in message_lower


@app.route("/health-risk-assessment", methods=["POST"])
def health_risk_assessment():
    try:
        data = request.json or {}
        user_profile = data.get("userProfile", {})
        user_id = data.get("userId")

        if not user_profile:
            return jsonify({"error": "User profile is required"}), 400

        # Calculate age
        age = None
        if user_profile.get("dob"):
            try:
                birth_year = int(user_profile["dob"].split("-")[0])
                current_year = 2024  # You might want to use datetime
                age = current_year - birth_year
            except:
                age = 30  # Default assumption

        # Assess health risks based on profile data
        assessment = generate_health_risk_assessment(user_profile, age)

        return jsonify(assessment)

    except Exception as e:
        print(f"Health risk assessment error: {str(e)}")
        return jsonify({"error": "Unable to generate health risk assessment"}), 500


def generate_health_risk_assessment(user_profile, age):
    """Generate comprehensive health risk assessment"""

    risk_categories = []
    recommendations = []
    preventive_actions = []
    next_steps = []

    # Age-based assessment
    if age:
        if age >= 65:
            risk_categories.append({
                "category": "Age-related Health Risks",
                "riskLevel": "High",
                "description": "At age 65+, you're at higher risk for chronic conditions like heart disease, diabetes, and osteoporosis."
            })
            recommendations.append("Schedule annual comprehensive health screening")
            recommendations.append("Consider bone density testing for osteoporosis prevention")
        elif age >= 50:
            risk_categories.append({
                "category": "Age-related Health Risks",
                "riskLevel": "Medium",
                "description": "Middle age brings increased risk for various health conditions. Regular monitoring is important."
            })
            recommendations.append("Get regular blood pressure and cholesterol checks")
        elif age >= 30:
            risk_categories.append({
                "category": "Preventive Health",
                "riskLevel": "Low",
                "description": "Focus on maintaining healthy lifestyle habits to prevent future health issues."
            })

    # Gender-based assessment
    gender = user_profile.get("gender", "").lower()
    if gender == "male":
        risk_categories.append({
            "category": "Cardiovascular Health",
            "riskLevel": "Medium",
            "description": "Men have higher risk of heart disease. Regular cardiovascular screening is recommended."
        })
        preventive_actions.append("Regular cardiovascular exercise (150 min/week)")
        preventive_actions.append("Limit sodium intake to 2300mg daily")
    elif gender == "female":
        risk_categories.append({
            "category": "Reproductive Health",
            "riskLevel": "Low",
            "description": "Regular gynecological check-ups and breast cancer screening are important preventive measures."
        })
        preventive_actions.append("Annual gynecological examination")
        preventive_actions.append("Monthly breast self-examination")

    # Lifestyle assessment (based on available data)
    if not user_profile.get("address"):
        risk_categories.append({
            "category": "Health Monitoring",
            "riskLevel": "Medium",
            "description": "Limited health data available. Complete profile for better personalized assessment."
        })
        next_steps.append("Complete your health profile with address and medical history")
        next_steps.append("Upload any existing medical reports for analysis")

    # Overall risk calculation
    high_risk_count = sum(1 for cat in risk_categories if cat["riskLevel"] == "High")
    medium_risk_count = sum(1 for cat in risk_categories if cat["riskLevel"] == "Medium")

    if high_risk_count >= 2:
        overall_risk = "High"
        overall_summary = "Your profile indicates several high-risk health factors. Immediate consultation with healthcare providers is strongly recommended."
    elif high_risk_count >= 1 or medium_risk_count >= 2:
        overall_risk = "Medium"
        overall_summary = "Your profile shows moderate health risks. Regular monitoring and lifestyle improvements are advised."
    else:
        overall_risk = "Low"
        overall_summary = "Your current profile indicates low health risks. Continue maintaining healthy lifestyle habits."

    # Add general recommendations
    recommendations.extend([
        "Maintain a balanced diet rich in fruits and vegetables",
        "Stay physically active with at least 30 minutes of exercise daily",
        "Get adequate sleep (7-9 hours per night)",
        "Stay hydrated and limit alcohol consumption",
        "Schedule regular health check-ups"
    ])

    # Preventive actions
    preventive_actions.extend([
        "Track your daily steps and activity levels",
        "Monitor your weight and BMI regularly",
        "Practice stress management techniques",
        "Stay up-to-date with vaccinations",
        "Learn CPR and basic first aid"
    ])

    # Next steps
    next_steps.extend([
        "Consult with a primary care physician for personalized advice",
        "Consider genetic testing if family history indicates risks",
        "Join a health and wellness program",
        "Keep a personal health journal"
    ])

    return {
        "overallRisk": overall_risk,
        "overallSummary": overall_summary,
        "riskCategories": risk_categories,
        "recommendations": recommendations[:5],  # Limit to 5
        "preventiveActions": preventive_actions[:6],  # Limit to 6
        "nextSteps": next_steps[:4]  # Limit to 4
    }


if __name__ == "__main__":
    app.run(debug=True, port=5000)