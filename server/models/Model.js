import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    cards: {
      type: [
        {
          front: {
            type: String,
            required: true,
          },

          back: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Flashcard = mongoose.model(
  "Flashcard",
  flashcardSchema
);

export default Flashcard;