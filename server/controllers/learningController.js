import Document from "../models/Document.js";

import {
  generateRevisionMaterial,
} from "../services/aiService.js";


// ==========================================
// Generate Learning Material
// ==========================================

export const generateLearningMaterial = async (
  req,
  res,
  next
) => {

  try {

    const {
      documentId,
      topic,
      generate,
    } = req.body;


    // ==========================================
    // Validate input
    // ==========================================

    if (!documentId && !topic) {

      res.status(400);

      throw new Error(
        "Document or topic is required"
      );

    }


    // ==========================================
    // Determine selected material
    // ==========================================

    let selectedMaterial =
      Array.isArray(generate)
        ? generate
        : [
            "summary",
            "quiz",
            "flashcards",
          ];


    /*
     * Only allow these three values.
     */

    selectedMaterial =
      selectedMaterial.filter((item) =>
        [
          "summary",
          "quiz",
          "flashcards",
        ].includes(item)
      );


    /*
     * If nothing valid was selected,
     * generate everything.
     *
     * This also keeps compatibility with
     * older frontend requests.
     */

    if (selectedMaterial.length === 0) {

      selectedMaterial = [
        "summary",
        "quiz",
        "flashcards",
      ];

    }


    // ==========================================
    // Get content
    // ==========================================

    let content = "";


    // ------------------------------------------
    // PDF / Document
    // ------------------------------------------

    if (documentId) {

      const document =
        await Document.findById(documentId);


      if (!document) {

        res.status(404);

        throw new Error(
          "Document not found"
        );

      }


      if (
        !document.extractedText ||
        !document.extractedText.trim()
      ) {

        res.status(400);

        throw new Error(
          "No text could be extracted from this document"
        );

      }


      content =
        document.extractedText;

    }


    // ------------------------------------------
    // Topic
    // ------------------------------------------

    if (topic) {

      content = topic.trim();

    }


    if (!content) {

      res.status(400);

      throw new Error(
        "No content available for generation"
      );

    }


    // ==========================================
    // Generate using Gemini
    // ==========================================

    console.log(
      "Generating:",
      selectedMaterial.join(", ")
    );


    const material =
      await generateRevisionMaterial(
        content,
        {
          generate: selectedMaterial,
        }
      );


    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({

      success: true,

      material,

      generated: selectedMaterial,

    });

  } catch (error) {

    console.error(
      "Learning material generation error:",
      error
    );

    next(error);

  }

};