import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    sourceType: {
      type: String,
      enum: ["PDF", "TOPIC"],
      required: true,
    },

    originalName: {
      type: String,
      default: null,
    },

    content: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model(
  "Document",
  documentSchema
);

export default Document;