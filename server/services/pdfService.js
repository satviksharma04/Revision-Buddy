import fs from "fs";
import { PDFParse } from "pdf-parse";

const extractPDFText = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
  } catch (error) {
    console.error("PDF text extraction failed:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

export default extractPDFText;