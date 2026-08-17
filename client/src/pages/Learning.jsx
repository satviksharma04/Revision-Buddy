import { useState } from "react";

import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { generateLearningMaterial } from "../services/learningService";


const Learning = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const topic = location.state?.topic;
  const document = location.state?.document;


  const [material, setMaterial] = useState(null);

  const [activeTab, setActiveTab] =
    useState("summary");

  const [isGenerating, setIsGenerating] =
    useState(false);


  /*
   * All three are selected by default.
   */

  const [selectedMaterial, setSelectedMaterial] =
    useState([
      "summary",
      "quiz",
      "flashcards",
    ]);


  const title =
    document?.title ||
    topic ||
    "Revision Material";


  // ==========================================
  // Toggle material option
  // ==========================================

  const toggleMaterial = (type) => {

    setSelectedMaterial((current) => {

      /*
       * If already selected, remove it.
       */

      if (current.includes(type)) {

        /*
         * Don't allow the user to deselect
         * everything.
         */

        if (current.length === 1) {

          toast.error(
            "Select at least one option."
          );

          return current;
        }


        return current.filter(
          (item) => item !== type
        );

      }


      /*
       * Otherwise add it.
       */

      return [
        ...current,
        type,
      ];

    });

  };


  // ==========================================
  // Generate
  // ==========================================

  const handleGenerate = async () => {

    if (!document?.id && !topic) {

      toast.error(
        "No learning material found."
      );

      return;
    }


    if (selectedMaterial.length === 0) {

      toast.error(
        "Select at least one option."
      );

      return;
    }


    try {

      setIsGenerating(true);


      const data = {

        ...(document?.id
          ? { documentId: document.id }
          : { topic }),

        generate: selectedMaterial,

      };


      const response =
        await generateLearningMaterial(
          data
        );


      setMaterial(
        response.data.material
      );


      /*
       * Automatically open the first
       * generated section.
       */

      if (
        selectedMaterial.includes("summary")
      ) {

        setActiveTab("summary");

      } else if (
        selectedMaterial.includes("quiz")
      ) {

        setActiveTab("quiz");

      } else {

        setActiveTab("flashcards");

      }


      toast.success(
        "Your revision material is ready."
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to generate revision material."
      );

    } finally {

      setIsGenerating(false);

    }

  };


  // ==========================================
  // No material
  // ==========================================

  if (!document && !topic) {

    return (

      <MainLayout>

        <div className="mx-auto max-w-xl py-20 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

            <BookOpen size={25} />

          </div>


          <h1 className="mt-5 text-2xl font-semibold text-gray-900">
            Nothing to revise yet
          </h1>


          <p className="mt-2 text-sm leading-6 text-gray-500">
            Upload a PDF or enter a topic to create
            your revision material.
          </p>


          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>

        </div>

      </MainLayout>

    );

  }


  return (

    <MainLayout>

      <div className="mx-auto max-w-5xl">


        {/* ======================================
            Back
        ======================================= */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >

          <ArrowLeft size={16} />

          Dashboard

        </button>


        {/* ======================================
            Header
        ======================================= */}

        <div className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {document
              ? "PDF revision"
              : "Topic revision"}
          </p>


          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h1>


          <p className="mt-2 text-sm text-gray-500">
            Choose what you want to generate for your revision.
          </p>

        </div>


        {/* ======================================
            Generation Selection
        ======================================= */}

        {!material ? (

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">


            {/* Header */}

            <div className="bg-indigo-900 px-7 py-8 text-white sm:px-9">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">

                <Sparkles size={21} />

              </div>


              <h2 className="mt-5 text-xl font-semibold">
                Build your revision set
              </h2>


              <p className="mt-2 max-w-lg text-sm leading-6 text-indigo-100">
                Pick the material you need. You can generate
                one, two or all three together.
              </p>

            </div>


            {/* Options */}

            <div className="p-7 sm:p-9">


              <p className="mb-4 text-sm font-semibold text-gray-900">
                What would you like to generate?
              </p>


              <div className="grid gap-3 sm:grid-cols-3">


                <MaterialOption
                  type="summary"
                  title="Summary"
                  description="Key ideas and important concepts."
                  icon={<BookOpen size={20} />}
                  selected={selectedMaterial.includes(
                    "summary"
                  )}
                  onClick={() =>
                    toggleMaterial("summary")
                  }
                />


                <MaterialOption
                  type="quiz"
                  title="Quiz"
                  description="10 questions to test your understanding."
                  icon={<Check size={20} />}
                  selected={selectedMaterial.includes(
                    "quiz"
                  )}
                  onClick={() =>
                    toggleMaterial("quiz")
                  }
                />


                <MaterialOption
                  type="flashcards"
                  title="Flashcards"
                  description="Quick questions for active recall."
                  icon={<Layers size={20} />}
                  selected={selectedMaterial.includes(
                    "flashcards"
                  )}
                  onClick={() =>
                    toggleMaterial("flashcards")
                  }
                />

              </div>


              {/* Selection info */}

              <div className="mt-5 flex items-center justify-between">

                <p className="text-xs text-gray-400">

                  {selectedMaterial.length === 3
                    ? "All three selected"
                    : `${selectedMaterial.length} selected`}

                </p>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedMaterial([
                      "summary",
                      "quiz",
                      "flashcards",
                    ])
                  }
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Select all
                </button>

              </div>


              {/* Generate */}

              <div className="mt-7 flex justify-end">

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {isGenerating
                    ? "Generating..."
                    : "Generate revision material"}

                </button>

              </div>

            </div>

          </div>

        ) : (

          <>


            {/* ==================================
                Tabs
            =================================== */}

            <div className="mb-6 flex overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-sm">

              {material.summary && (
                <TabButton
                  active={
                    activeTab === "summary"
                  }
                  onClick={() =>
                    setActiveTab("summary")
                  }
                  icon={<BookOpen size={16} />}
                >
                  Summary
                </TabButton>
              )}


              {material.quiz && (
                <TabButton
                  active={
                    activeTab === "quiz"
                  }
                  onClick={() =>
                    setActiveTab("quiz")
                  }
                  icon={<Check size={16} />}
                >
                  Quiz
                </TabButton>
              )}


              {material.flashcards && (
                <TabButton
                  active={
                    activeTab === "flashcards"
                  }
                  onClick={() =>
                    setActiveTab("flashcards")
                  }
                  icon={<Layers size={16} />}
                >
                  Flashcards
                </TabButton>
              )}

            </div>


            {/* ==================================
                Content
            =================================== */}

            {activeTab === "summary" &&
              material.summary && (
                <SummaryView
                  sections={material.summary}
                />
              )}


            {activeTab === "quiz" &&
              material.quiz && (
                <QuizView
                  questions={material.quiz}
                />
              )}


            {activeTab === "flashcards" &&
              material.flashcards && (
                <FlashcardView
                  cards={material.flashcards}
                />
              )}

          </>

        )}

      </div>

    </MainLayout>

  );

};


// =================================================
// Material Option
// =================================================

const MaterialOption = ({
  type,
  title,
  description,
  icon,
  selected,
  onClick,
}) => {

  return (

    <button
      type="button"
      onClick={onClick}
      className={`
        relative
        rounded-xl
        border
        p-5
        text-left
        transition
        ${
          selected
            ? "border-indigo-300 bg-indigo-50"
            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
        }
      `}
    >

      {/* Check */}

      <div
        className={`
          absolute
          right-4
          top-4
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          border
          ${
            selected
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-300 bg-white"
          }
        `}
      >

        {selected && (
          <Check size={12} />
        )}

      </div>


      {/* Icon */}

      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          ${
            selected
              ? "bg-white text-indigo-600"
              : "bg-gray-50 text-gray-500"
          }
        `}
      >

        {icon}

      </div>


      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        {title}
      </h3>


      <p className="mt-1 pr-5 text-xs leading-5 text-gray-500">
        {description}
      </p>

    </button>

  );

};


// =================================================
// Tab Button
// =================================================

const TabButton = ({
  active,
  onClick,
  icon,
  children,
}) => {

  return (

    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        flex-1
        items-center
        justify-center
        gap-2
        rounded-lg
        px-3
        py-3
        text-sm
        font-semibold
        transition
        ${
          active
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
    >

      {icon}

      {children}

    </button>

  );

};


// =================================================
// Summary View
// =================================================

const SummaryView = ({ sections }) => {

  if (!sections?.length) {

    return (
      <EmptyState text="No summary was generated." />
    );

  }


  return (

    <div className="space-y-4">

      {sections.map((section, index) => (

        <article
          key={index}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7"
        >

          <div className="flex gap-4">

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
              {String(index + 1).padStart(2, "0")}
            </span>


            <div>

              <h2 className="text-base font-semibold text-gray-900">
                {section.heading}
              </h2>


              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                {section.content}
              </p>

            </div>

          </div>

        </article>

      ))}

    </div>

  );

};


// =================================================
// Quiz View
// =================================================

const QuizView = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);

  if (!questions?.length) {
    return (
      <EmptyState text="No quiz questions were generated." />
    );
  }

  const question = questions[current];

  const handleSelect = (option) => {
    if (selected !== null) {
      return;
    }

    setSelected(option);

    if (option === question.correctAnswer) {
      setScore((value) => value + 1);
    } else {
      setWrongQuestions((current) => [
        ...current,
        question,
      ]);
    }
  };

  const handleNext = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setWrongQuestions([]);
    setFinished(false);
  };

  // ==========================================
  // Result
  // ==========================================

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    /*
     * Count how many times each topic
     * appeared in the wrong answers.
     */

    const topicCounts = {};

    wrongQuestions.forEach((question) => {
      const topic =
        question.topic || "This topic";

      topicCounts[topic] =
        (topicCounts[topic] || 0) + 1;
    });

    const revisionTopics = Object.entries(
      topicCounts
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);


    let resultMessage;

    if (percentage === 100) {
      resultMessage =
        "Excellent work. You have a strong understanding of this material.";
    } else if (percentage >= 80) {
      resultMessage =
        "Great job. A little revision should help you strengthen the remaining areas.";
    } else if (percentage >= 60) {
      resultMessage =
        "Good attempt. Review the topics below before trying the quiz again.";
    } else {
      resultMessage =
        "A bit more revision will help. Focus on the areas below and try again.";
    }


    return (
      <div className="mx-auto max-w-2xl">

        {/* ==================================
            Result Header
        =================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Trophy size={22} />
          </div>


          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-gray-400">
            Quiz complete
          </p>


          <h2 className="mt-2 text-2xl font-semibold text-gray-900">
            {score} / {questions.length}
          </h2>


          <div className="mt-2 text-4xl font-bold tracking-tight text-indigo-600">
            {percentage}%
          </div>


          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500">
            {resultMessage}
          </p>


          {/* Result counts */}

          <div className="mx-auto mt-7 grid max-w-sm grid-cols-2 overflow-hidden rounded-xl border border-gray-200">

            <div className="border-r border-gray-200 px-4 py-4">

              <p className="text-xl font-semibold text-green-600">
                {score}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Correct
              </p>

            </div>


            <div className="px-4 py-4">

              <p className="text-xl font-semibold text-red-500">
                {questions.length - score}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Incorrect
              </p>

            </div>

          </div>

        </div>


        {/* ==================================
            Revision Suggestions
        =================================== */}

        {revisionTopics.length > 0 && (

          <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <BookOpen size={17} />
              </div>


              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  What to revise
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  These topics appeared in your incorrect answers.
                </p>

              </div>

            </div>


            <div className="mt-5 space-y-3">

              {revisionTopics.map(
                ([topic, count], index) => (

                  <div
                    key={`${topic}-${index}`}
                    className="rounded-xl bg-gray-50 px-4 py-3"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <p className="text-sm font-medium text-gray-800">
                        {topic}
                      </p>


                      <span className="shrink-0 text-xs text-gray-400">
                        {count}{" "}
                        {count === 1
                          ? "mistake"
                          : "mistakes"}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}


        {/* ==================================
            Actions
        =================================== */}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={restart}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >

            <RotateCcw size={16} />

            Retry quiz

          </button>

        </div>

      </div>
    );
  }


  // ==========================================
  // Quiz Question
  // ==========================================

  return (
    <div>

      {/* Progress */}

      <div className="mb-5 flex items-center justify-between">

        <span className="text-sm font-medium text-gray-500">
          Question {current + 1} of{" "}
          {questions.length}
        </span>


        <span className="text-sm font-semibold text-indigo-600">
          {score} correct
        </span>

      </div>


      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{
            width: `${(
              ((current + 1) /
                questions.length) *
              100
            )}%`,
          }}
        />

      </div>


      {/* Question */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

        <h2 className="text-lg font-semibold leading-7 text-gray-900 sm:text-xl">
          {question.question}
        </h2>


        {/* Options */}

        <div className="mt-7 space-y-3">

          {question.options.map(
            (option, index) => {

              const correct =
                selected &&
                option ===
                  question.correctAnswer;

              const wrong =
                selected === option &&
                option !==
                  question.correctAnswer;


              return (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleSelect(option)
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-xl
                    border
                    p-4
                    text-left
                    text-sm
                    transition
                    ${
                      correct
                        ? "border-green-300 bg-green-50 text-green-800"
                        : wrong
                        ? "border-red-300 bg-red-50 text-red-800"
                        : "border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/30"
                    }
                  `}
                >

                  <span
                    className={`
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-xs
                      font-semibold
                      ${
                        correct
                          ? "bg-green-100"
                          : wrong
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }
                    `}
                  >
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>


                  <span>
                    {option}
                  </span>

                </button>
              );
            }
          )}

        </div>


        {/* Explanation */}

        {selected && (

          <div className="mt-6 rounded-xl bg-gray-50 p-4">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Explanation
            </p>


            <p className="mt-2 text-sm leading-6 text-gray-600">
              {question.explanation}
            </p>

          </div>

        )}


        {/* Next */}

        <div className="mt-7 flex justify-end">

          <button
            type="button"
            disabled={!selected}
            onClick={handleNext}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >

            {current === questions.length - 1
              ? "Finish"
              : "Next"}

            <ChevronRight size={16} />

          </button>

        </div>

      </div>

    </div>
  );
};


// =================================================
// Flashcard View
// =================================================

const FlashcardView = ({ cards }) => {

  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);


  if (!cards?.length) {

    return (
      <EmptyState text="No flashcards were generated." />
    );

  }


  const card = cards[current];


  const next = () => {

    setFlipped(false);

    setCurrent(
      (value) =>
        (value + 1) % cards.length
    );

  };


  const previous = () => {

    setFlipped(false);

    setCurrent(
      (value) =>
        (value - 1 + cards.length) %
        cards.length
    );

  };


  return (

    <div className="mx-auto max-w-2xl">

      <div className="mb-5 flex items-center justify-between">

        <span className="text-sm font-medium text-gray-500">
          Card {current + 1} of{" "}
          {cards.length}
        </span>


        <span className="text-xs text-gray-400">
          Click the card to flip
        </span>

      </div>


      <button
        type="button"
        onClick={() =>
          setFlipped(
            (value) => !value
          )
        }
        className="
          group
          min-h-[330px]
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-8
          text-center
          shadow-sm
          transition
          hover:border-indigo-200
          sm:p-12
        "
      >

        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          <Layers size={19} />

        </div>


        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-gray-400">

          {flipped
            ? "Answer"
            : "Question"}

        </p>


        <p className="mx-auto mt-7 max-w-lg text-xl font-semibold leading-8 text-gray-900 sm:text-2xl">

          {flipped
            ? card.back
            : card.front}

        </p>


        <p className="mt-10 text-xs text-gray-400">

          Click to{" "}
          {flipped
            ? "see question"
            : "reveal answer"}

        </p>

      </button>


      <div className="mt-5 flex items-center justify-center gap-3">

        <button
          type="button"
          onClick={previous}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
        >

          <ChevronLeft size={18} />

        </button>


        <button
          type="button"
          onClick={next}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >

          Next card

          <ChevronRight size={16} />

        </button>

      </div>

    </div>

  );

};


// =================================================
// Empty State
// =================================================

const EmptyState = ({ text }) => {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">

      {text}

    </div>

  );

};


export default Learning;