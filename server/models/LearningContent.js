import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: String,
    isCorrect: Boolean,
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    question: String,
    options: [optionSchema],
    explanation: String,
  },
  { _id: false }
);

const flashcardSchema = new mongoose.Schema(
  {
    front: String,
    back: String,
  },
  { _id: false }
);

const learningContentSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      unique: true,
    },

    summary: {
      overview: String,
      keyPoints: [String],
      importantConcepts: [String],
      revisionNotes: [String],
    },

    quiz: [quizSchema],

    flashcards: [flashcardSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "LearningContent",
  learningContentSchema
);