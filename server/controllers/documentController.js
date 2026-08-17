import fs from "fs";

import Document from "../models/Document.js";
import extractPDFText from "../services/pdfService.js";

export const uploadDocument = async (
  req,
  res,
  next
) => {
  let filePath = null;

  try {
    if (!req.file) {
      res.status(400);

      throw new Error(
        "Please upload a PDF file"
      );
    }

    filePath = req.file.path;

    const extractedText =
      await extractPDFText(filePath);

    if (!extractedText.trim()) {
      res.status(400);

      throw new Error(
        "Could not extract text from this PDF"
      );
    }

    const title =
      req.body.title ||
      req.file.originalname
        .replace(/\.pdf$/i, "");

    const document =
      await Document.create({
        title,

        sourceType: "PDF",

        originalName:
          req.file.originalname,

        content: extractedText,

        uploadedBy: req.user._id,
      });

    res.status(201).json({
      success: true,

      message:
        "PDF uploaded successfully",

      document: {
        id: document._id,
        title: document.title,
        sourceType: document.sourceType,
        originalName:
          document.originalName,
        createdAt:
          document.createdAt,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (
      filePath &&
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
    }
  }
};