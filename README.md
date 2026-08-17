# Revision Buddy 📚

> AI-powered study companion that turns your study material into concise summaries, quizzes, and flashcards.

Revision Buddy is a full-stack MERN application that helps students revise more effectively using Google's Gemini API.

Users can either enter a topic or upload a PDF and choose what they want to generate — **Summary, Quiz, Flashcards, or all three**.

---

## ✨ Features

- 🔐 **User Authentication**
  - Register and login with JWT-based authentication
  - Password hashing using bcrypt

- 📄 **PDF Learning Material**
  - Upload study PDFs
  - Extract text from uploaded documents
  - Generate revision material from the extracted content

- 🧠 **AI-Powered Revision**
  - Generate concise summaries
  - Generate 10-question multiple-choice quizzes
  - Generate 10 flashcards
  - Generate any combination of the three

- 📝 **Quiz Mode**
  - Multiple-choice questions
  - Instant answer feedback
  - Explanations for answers
  - Randomized answer options
  - Score and percentage calculation
  - Retry quiz option

- 🎯 **Revision Suggestions**
  - Identifies topics associated with incorrect answers
  - Shows areas that need further revision

- 🗂️ **Topic-Based Revision**
  - Generate revision material directly from a topic without uploading a PDF

- 👤 **Simple Profile**
  - Displays basic user information

- 📱 **Responsive UI**
  - Clean and minimal interface
  - Works across desktop and mobile screens

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Vite
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer

### AI & Processing

- Google Gemini API
- PDF text extraction

---

## 🏗️ Application Architecture

```text
                    Revision Buddy
                          │
             ┌────────────┴────────────┐
             │                         │
        React Frontend            Express Backend
             │                         │
             │                    REST API
             │                         │
             │              ┌──────────┴──────────┐
             │              │                     │
             │          MongoDB              Gemini API
             │              │                     │
             │              │              AI Generation
             │              │                     │
             └──────────────┴─────────────────────┘
                            │
                    Revision Material
                            │
              ┌─────────────┼─────────────┐
              ↓             ↓             ↓
           Summary         Quiz       Flashcards
