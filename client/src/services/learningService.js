import api from "./api";

export const generateLearningMaterial = (data) => {
  return api.post(
    "/learning/generate",
    data
  );
};