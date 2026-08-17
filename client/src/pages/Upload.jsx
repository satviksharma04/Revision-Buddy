import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  UploadCloud,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import { uploadDocument } from "../services/documentService";

const Upload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("PDF must be smaller than 10 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF first.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response =
        await uploadDocument(formData);

      const uploadedDocument =
        response.data.document;

      toast.success("PDF uploaded successfully.");

      navigate("/learning", {
        state: {
          document: uploadedDocument,
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to upload PDF."
      );
    } finally {
      setIsUploading(false);
    }
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

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeedff] text-[#4f46e5]">
            <FileText size={21} />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-[#25233a] sm:text-3xl">
            Upload your study material
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#858397]">
            Upload a PDF and Revision Buddy will create
            a summary, quiz and flashcards from it.
          </p>

        </div>


        <div className="rounded-2xl border border-[#e4e3eb] bg-white p-6 shadow-sm sm:p-7">

          <label
            htmlFor="pdf"
            className={`
              flex
              min-h-[260px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-xl
              border-2
              border-dashed
              p-8
              text-center
              transition
              ${
                file
                  ? "border-green-300 bg-green-50/40"
                  : "border-[#d9d8e1] bg-[#fcfcfd] hover:border-[#a5a1e8] hover:bg-[#faf9ff]"
              }
            `}
          >

            {file ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={23} />
                </div>

                <h2 className="mt-4 text-sm font-semibold text-[#25233a]">
                  {file.name}
                </h2>

                <p className="mt-1 text-xs text-[#858397]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <span className="mt-4 text-xs font-semibold text-[#4f46e5]">
                  Choose another file
                </span>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eeedff] text-[#4f46e5]">
                  <UploadCloud size={23} />
                </div>

                <h2 className="mt-4 text-sm font-semibold text-[#25233a]">
                  Choose a PDF file
                </h2>

                <p className="mt-1 text-xs text-[#858397]">
                  Click here to browse your files
                </p>

                <span className="mt-4 text-xs font-medium text-[#aaa8b6]">
                  PDF · Maximum 10 MB
                </span>
              </>
            )}

            <input
              id="pdf"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>


          <div className="mt-6 flex justify-end">

            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isUploading
                ? "Uploading..."
                : "Upload and continue"}
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Upload;