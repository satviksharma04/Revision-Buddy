import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing from server/.env"
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

const MODEL = "gemini-3.6-flash";


// ==========================================
// Parse Gemini JSON response
// ==========================================

const parseGeminiJSON = (output) => {

  if (!output || typeof output !== "string") {
    throw new Error(
      "Gemini returned an empty response"
    );
  }

  let cleaned = output.trim();


  // Remove markdown code fences if Gemini adds them

  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();


  // First attempt

  try {

    return JSON.parse(cleaned);

  } catch (error) {

    // Continue with fallback

  }


  // Fallback: extract JSON object

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");


  if (
    firstBrace !== -1 &&
    lastBrace !== -1 &&
    lastBrace > firstBrace
  ) {

    const possibleJSON = cleaned.slice(
      firstBrace,
      lastBrace + 1
    );

    try {

      return JSON.parse(possibleJSON);

    } catch (error) {

      // Continue to error

    }

  }


  console.error(
    "Gemini returned invalid JSON:"
  );

  console.error(output);

  throw new Error(
    "Gemini returned invalid JSON"
  );
};


// ==========================================
// Validate Revision Material
// ==========================================

const validateRevisionMaterial = (
  result,
  generate
) => {

  if (!result || typeof result !== "object") {

    throw new Error(
      "Invalid revision material format"
    );

  }


  // Summary

  if (generate.includes("summary")) {

    if (!Array.isArray(result.summary)) {

      throw new Error(
        "Invalid summary format"
      );

    }


    for (const section of result.summary) {

      if (
        !section ||
        typeof section.heading !== "string" ||
        typeof section.content !== "string"
      ) {

        throw new Error(
          "Invalid summary section format"
        );

      }

    }

  }


  // Quiz

  if (generate.includes("quiz")) {

    if (!Array.isArray(result.quiz)) {

      throw new Error(
        "Invalid quiz format"
      );

    }


    for (const question of result.quiz) {

      if (
        !question ||
        typeof question.question !== "string" ||
        typeof question.topic !== "string" ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        typeof question.correctAnswer !== "string" ||
        typeof question.explanation !== "string"
      ) {

        throw new Error(
          "Invalid quiz question format"
        );

      }

    }

  }


  // Flashcards

  if (generate.includes("flashcards")) {

    if (!Array.isArray(result.flashcards)) {

      throw new Error(
        "Invalid flashcards format"
      );

    }


    for (const card of result.flashcards) {

      if (
        !card ||
        typeof card.front !== "string" ||
        typeof card.back !== "string"
      ) {

        throw new Error(
          "Invalid flashcard format"
        );

      }

    }

  }


  return result;
};


// ==========================================
// Unified Revision Material
// ==========================================

export const generateRevisionMaterial = async (
  content,
  options = {}
) => {

  try {

    if (
      !content ||
      typeof content !== "string" ||
      !content.trim()
    ) {

      throw new Error(
        "No content provided"
      );

    }


    /*
     * Default:
     * Generate everything.
     *
     * This keeps your existing functionality
     * working even if no options are passed.
     */

    let generate = options.generate || [
      "summary",
      "quiz",
      "flashcards",
    ];


    /*
     * Make sure generate is an array.
     */

    if (!Array.isArray(generate)) {

      generate = [
        "summary",
        "quiz",
        "flashcards",
      ];

    }


    /*
     * Remove invalid values.
     */

    generate = generate.filter((item) =>
      ["summary", "quiz", "flashcards"].includes(item)
    );


    /*
     * If nothing valid was selected,
     * generate everything.
     */

    if (generate.length === 0) {

      generate = [
        "summary",
        "quiz",
        "flashcards",
      ];

    }


    const shouldGenerateSummary =
      generate.includes("summary");

    const shouldGenerateQuiz =
      generate.includes("quiz");

    const shouldGenerateFlashcards =
      generate.includes("flashcards");


    // ==========================================
    // Prompt
    // ==========================================

    let prompt = `
You are Revision Buddy, an AI educational assistant.

Create useful revision material from the study material provided below.

The user has selected the following revision material:

${generate.join(", ")}

Generate ONLY the selected material types.

`;


    // ==========================================
    // Summary instructions
    // ==========================================

    if (shouldGenerateSummary) {

      prompt += `

1. SUMMARY

Create 5 to 8 important sections.

Each section must contain:
- heading
- concise explanation

Focus on:
- important concepts
- definitions
- processes
- key facts

`;

    }


    // ==========================================
    // Quiz instructions
    // ==========================================

    if (shouldGenerateQuiz) {

      prompt += `

2. QUIZ

Create exactly 10 multiple-choice questions.

Each question must contain:

- question
- topic
- exactly 4 options
- correctAnswer
- explanation

The "topic" field should identify the specific concept
being tested.

For example:

"topic": "Process Scheduling"

Only one option should be correct.

Questions should test understanding and cover
different parts of the material.

`;

    }


    // ==========================================
    // Flashcard instructions
    // ==========================================

    if (shouldGenerateFlashcards) {

      prompt += `

3. FLASHCARDS

Create exactly 10 flashcards.

Each flashcard must contain:

- front: a clear question
- back: a concise answer

Use only information from the provided
study material.

`;

    }


    // ==========================================
    // Important rules
    // ==========================================

    prompt += `

IMPORTANT RULES:

Use only information from the provided study material.

Do not invent unrelated information.

Return ONLY valid JSON.

Do NOT use Markdown.

Do NOT wrap the JSON in \`\`\`json or \`\`\`.

Do NOT add explanations before or after the JSON.

The response must begin with { and end with }.

Only include the keys that were requested.

`;


    // ==========================================
    // JSON structure
    // ==========================================

    prompt += `

RETURN JSON IN THIS FORMAT:

{`;


    if (shouldGenerateSummary) {

      prompt += `

  "summary": [
    {
      "heading": "Topic heading",
      "content": "Explanation"
    }
  ],`;

    }


    if (shouldGenerateQuiz) {

      prompt += `

  "quiz": [
    {
      "question": "Question",
      "topic": "Topic being tested",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": "Option A",
      "explanation": "Explanation"
    }
  ],`;

    }


    if (shouldGenerateFlashcards) {

      prompt += `

  "flashcards": [
    {
      "front": "Question",
      "back": "Answer"
    }
  ]`;

    }


    /*
     * Remove a possible trailing comma from
     * the generated JSON structure in prompt.
     */

    prompt = prompt.replace(/,\s*$/, "");


    prompt += `

}

STUDY MATERIAL:
----------------

${content}
`;


    console.log(
      `Generating revision material: ${generate.join(", ")}`
    );


    // ==========================================
    // Gemini
    // ==========================================

    const interaction =
      await ai.interactions.create({

        model: MODEL,

        input: prompt,

        store: false,

      });


    const output =
      interaction.output_text;


    if (!output) {

      throw new Error(
        "Gemini returned an empty response"
      );

    }


    console.log(
      "Gemini response received."
    );


    // ==========================================
    // Parse
    // ==========================================

    const result =
      parseGeminiJSON(output);


    // ==========================================
    // Validate
    // ==========================================

    validateRevisionMaterial(
      result,
      generate
    );


    // ==========================================
    // Final checks
    // ==========================================

    if (
      shouldGenerateSummary &&
      result.summary.length < 1
    ) {

      throw new Error(
        "Gemini generated an empty summary"
      );

    }


    if (
      shouldGenerateQuiz &&
      result.quiz.length < 1
    ) {

      throw new Error(
        "Gemini generated an empty quiz"
      );

    }


    if (
      shouldGenerateFlashcards &&
      result.flashcards.length < 1
    ) {

      throw new Error(
        "Gemini generated empty flashcards"
      );

    }


    console.log(
      `Revision material generated successfully: ${generate.join(", ")}`
    );


    return result;

  } catch (error) {

    console.error(
      "Revision material generation failed:",
      error
    );

    throw error;

  }

};


// ==========================================
// Individual functions
// ==========================================

export const generateSummary = async (
  content
) => {

  const result =
    await generateRevisionMaterial(
      content,
      {
        generate: ["summary"],
      }
    );

  return result.summary;

};


export const generateQuiz = async (
  content
) => {

  const result =
    await generateRevisionMaterial(
      content,
      {
        generate: ["quiz"],
      }
    );

  return result.quiz;

};


export const generateFlashcards = async (
  content
) => {

  const result =
    await generateRevisionMaterial(
      content,
      {
        generate: ["flashcards"],
      }
    );

  return result.flashcards;

};