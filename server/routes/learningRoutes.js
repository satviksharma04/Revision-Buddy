import express from "express";

import {
  generateLearningMaterial,
} from "../controllers/learningController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateLearningMaterial
);

export default router;