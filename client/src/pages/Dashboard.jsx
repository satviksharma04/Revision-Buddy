import {
  ArrowRight,
  FileText,
  Layers,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {

  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName =
    user?.name?.split(" ")[0] || "there";


  return (

    <MainLayout>

      <div className="mx-auto max-w-6xl">

        {/* =========================================
            Welcome
        ========================================== */}

        <section className="mb-10">

          <p className="text-sm font-medium text-indigo-600">
            Welcome back
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                Hey, {firstName}.
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                What are you revising today?
              </p>

            </div>

          </div>

        </section>


        {/* =========================================
            Main actions
        ========================================== */}

        <section className="grid gap-5 md:grid-cols-2">


          {/* PDF */}

          <button
            type="button"
            onClick={() => navigate("/upload")}
            className="
              group
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              text-left
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-indigo-200
              hover:shadow-md
              sm:p-7
            "
          >

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileText size={21} />
              </div>

              <ArrowRight
                size={18}
                className="
                  text-gray-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-indigo-600
                "
              />

            </div>


            <h2 className="mt-6 text-lg font-semibold text-gray-900">
              Upload a PDF
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Have lecture notes, a textbook chapter or study
              material? Upload it and turn it into revision material.
            </p>


            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600">
              Upload your material
              <ArrowRight size={15} />
            </div>

          </button>


          {/* Topic */}

          <button
            type="button"
            onClick={() => navigate("/topic")}
            className="
              group
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              text-left
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-orange-200
              hover:shadow-md
              sm:p-7
            "
          >

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <BookOpen size={21} />
              </div>

              <ArrowRight
                size={18}
                className="
                  text-gray-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-orange-600
                "
              />

            </div>


            <h2 className="mt-6 text-lg font-semibold text-gray-900">
              Enter a topic
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Don't have a PDF? Enter any topic you're studying
              and create a focused revision set.
            </p>


            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600">
              Start with a topic
              <ArrowRight size={15} />
            </div>

          </button>

        </section>


        {/* =========================================
            Simple explanation
        ========================================== */}

        <section className="mt-10">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-gray-900">
              How Revision Buddy works
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Three simple steps. That's it.
            </p>

          </div>


          <div className="grid gap-4 sm:grid-cols-3">


            {/* Step 1 */}

            <StepCard
              number="01"
              icon={<FileText size={18} />}
              title="Add your material"
              description="Upload a PDF or enter the topic you want to study."
            />


            {/* Step 2 */}

            <StepCard
              number="02"
              icon={<Sparkles size={18} />}
              title="Let AI prepare it"
              description="Gemini turns your material into concise revision content."
            />


            {/* Step 3 */}

            <StepCard
              number="03"
              icon={<Layers size={18} />}
              title="Revise"
              description="Read the summary, test yourself and use flashcards."
            />

          </div>

        </section>


        {/* =========================================
            Bottom note
        ========================================== */}

        <section className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-6 py-5 sm:flex sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-indigo-900">
              Ready for a quick revision session?
            </p>

            <p className="mt-1 text-xs leading-5 text-indigo-700">
              Pick a topic and let Revision Buddy do the preparation.
            </p>

          </div>


          <button
            type="button"
            onClick={() => navigate("/topic")}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 sm:mt-0"
          >
            Start revising
            <ArrowRight size={15} />
          </button>

        </section>

      </div>

    </MainLayout>

  );
};


/* =========================================
   Step Card
========================================= */

const StepCard = ({
  number,
  icon,
  title,
  description,
}) => {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
          {icon}
        </div>

        <span className="text-xs font-bold text-gray-300">
          {number}
        </span>

      </div>


      <h3 className="mt-5 text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-gray-500">
        {description}
      </p>

    </div>

  );
};


export default Dashboard;