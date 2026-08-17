import api from "./api";

export const uploadDocument = (formData) => {
  return api.post(
    "/documents/upload",
    formData
  );
};