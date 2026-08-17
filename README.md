# Revision Buddy 📚

> An AI-powered study companion that transforms study material into concise summaries, quizzes, and flashcards.

**Revision Buddy** is a full-stack MERN application designed to make revision faster and more effective. Users can enter a topic or upload a PDF, choose the type of revision material they need, and generate it using Google's Gemini API.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected application routes

### 📄 PDF-Based Revision
- Upload study PDFs
- Extract text from uploaded documents
- Generate revision material directly from the extracted content

### 🧠 AI-Powered Learning
- Generate concise **summaries**
- Generate **10-question quizzes**
- Generate **10 flashcards**
- Generate any combination of Summary, Quiz, and Flashcards
- Uses Google Gemini API for content generation

### 📝 Quiz Mode
- Multiple-choice questions with four options
- Randomized answer positions
- Instant answer feedback
- Explanations for answers
- Score and percentage calculation
- Retry quiz functionality
- Identifies topics that need further revision

### 🎯 Revision Suggestions
After completing a quiz, Revision Buddy analyzes incorrect answers and highlights the topics that should be revised again.

### 🗂️ Topic-Based Revision
Generate revision material directly from a topic without uploading a document.

### 👤 Simple Profile
- View basic user information
- Lightweight profile experience without unnecessary complexity

### 📱 Responsive Interface
- Clean and minimal UI
- Responsive across desktop and mobile devices
- Simple learning-focused experience

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

### AI & Document Processing

- Google Gemini API
- PDF text extraction

---

## 🏗️ Application Architecture

```text
                           Revision Buddy
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
          React Frontend                Express Backend
                 │                             │
                 │                         REST API
                 │                             │
                 │              ┌──────────────┴──────────────┐
                 │              │                             │
                 │          MongoDB                     Gemini API
                 │              │                             │
                 │              │                      AI Generation
                 │              │                             │
                 └──────────────┴─────────────────────────────┘
                                │
                         Revision Material
                                │
                    ┌───────────┼───────────┐
                    ↓           ↓           ↓
                 Summary      Quiz      Flashcards

---

### 👨‍💻 Author

**Satvik Sharma**

B.Tech — Electrical Engineering
National Institute of Technology, Hamirpur
