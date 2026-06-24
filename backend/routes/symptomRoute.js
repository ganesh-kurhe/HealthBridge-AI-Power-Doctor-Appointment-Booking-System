import express from "express";
import { predictSymptoms, getHealthAssistantResponse, getHealthRiskAssessment } from "../controllers/symptomController.js";
import authUser from "../middleware/authUser.js";

const symptomRouter = express.Router();

symptomRouter.post("/predict", authUser, predictSymptoms);
symptomRouter.post("/health-assistant", authUser, getHealthAssistantResponse);
symptomRouter.post("/health-risk-assessment", authUser, getHealthRiskAssessment);

export default symptomRouter;