import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

const LearningInputCard = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/upload");
  };

  const handleTopic = () => {
    navigate("/topic");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Start Learning
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload your study material or enter a topic to get started.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          onClick={handleUpload}
        >
          Upload PDF
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={handleTopic}
        >
          Enter Topic
        </Button>
      </div>
    </div>
  );
};

export default LearningInputCard;