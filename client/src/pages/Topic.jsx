import { ArrowLeft, Type } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

const Topic = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    const value = topic.trim();

    if (!value) {
      toast.error("Please enter a topic.");
      return;
    }

    if (value.length < 3) {
      toast.error("Please enter a more specific topic.");
      return;
    }

    navigate("/learning", {
      state: {
        topic: value,
      },
    });
  };

  return (
    <MainLayout>

      <div className="mx-auto max-w-3xl">

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-7 flex items-center gap-2 text-sm font-medium text-[#858397] transition hover:text-[#25233a]"
        >
          <ArrowLeft size={16} />
          Dashboard
        </button>


        <div className="mb-7">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e7] text-[#ea580c]">
            <Type size={21} />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-[#25233a] sm:text-3xl">
            What do you want to revise?
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#858397]">
            Enter a subject, concept or question.
            Revision Buddy will turn it into useful
            revision material.
          </p>

        </div>


        <div className="rounded-2xl border border-[#e4e3eb] bg-white p-6 shadow-sm sm:p-7">

          <label
            htmlFor="topic"
            className="text-sm font-semibold text-[#25233a]"
          >
            Topic
          </label>

          <textarea
            id="topic"
            value={topic}
            onChange={(event) =>
              setTopic(event.target.value)
            }
            placeholder="e.g. Process Scheduling in Operating Systems"
            rows={7}
            className="
              mt-3
              w-full
              resize-none
              rounded-xl
              border
              border-[#dedde6]
              bg-[#fcfcfd]
              px-4
              py-4
              text-sm
              leading-6
              text-[#25233a]
              outline-none
              transition
              placeholder:text-[#aaa8b6]
              focus:border-[#a5a1e8]
              focus:ring-4
              focus:ring-[#eeedff]
            "
          />

          <div className="mt-3 flex items-center justify-between">

            <p className="text-xs text-[#aaa8b6]">
              Be specific for more focused results.
            </p>

            <span className="text-xs text-[#aaa8b6]">
              {topic.length} characters
            </span>

          </div>


          <div className="mt-6 flex justify-end">

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
            >
              Continue
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Topic;