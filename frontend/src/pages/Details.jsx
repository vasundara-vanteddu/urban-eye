import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { detectPriority } from "../utils/priorityEngine";
import { Check, FileText, ArrowLeft, Send } from "lucide-react";

function Details() {
  const navigate = useNavigate();

  const issue = localStorage.getItem("prediction") || "N/A";
  const confidence = localStorage.getItem("confidence") || "0";
  const location = localStorage.getItem("address") || "N/A";
  const uploadedImage = localStorage.getItem("uploadedImage");

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState(`${issue} issue`);

  const formattedIssue =
    issue.charAt(0).toUpperCase() + issue.slice(1);

  const priority = detectPriority(
    issue,
    location,
    description
  );

  const getDepartment = () => {
    if (
      formattedIssue === "Pothole" ||
      formattedIssue === "Road Damage"
    ) {
      return "Road Department";
    }

    if (
      formattedIssue === "Drainage Problem" ||
      formattedIssue === "Water Leak"
    ) {
      return "Drainage Department";
    }

    if (
      formattedIssue === "Streetlight Issue" ||
      formattedIssue === "Traffic Signal"
    ) {
      return "Electricity Department";
    }

    if (
      formattedIssue === "Garbage Collection" ||
      formattedIssue === "Garbage"
    ) {
      return "Sanitation Department";
    }

    return "General";
  };

  const saveReportLocally = () => {
    const existingReports =
      JSON.parse(localStorage.getItem("citizenReports")) || [];

    const newReport = {
      title,
      issueType: formattedIssue,
      confidence: confidence.toString().replace("%", ""),
      priority,
      address: location,
      description,
      image: uploadedImage || "",
      status: "Submitted",
      citizenEmail: localStorage.getItem("citizenEmail"),
      department: getDepartment(),
      complaintId:
        "CMP" + Math.floor(Math.random() * 1000000),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      remarks: "",
      resolutionProof: "",
    };

    existingReports.push(newReport);

    localStorage.setItem(
      "citizenReports",
      JSON.stringify(existingReports)
    );
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://urban-eye-srks.onrender.com/submit-report", {
        title,
        issue: formattedIssue,
        confidence,
        priority,
        address: location,
        description,
        lat: localStorage.getItem("lat"),
        lng: localStorage.getItem("lng"),
      });

      localStorage.setItem("description", description);
      localStorage.setItem("priority", priority);
      localStorage.setItem("title", title);

      saveReportLocally();

      alert("Report Submitted Successfully 🚀");

      navigate("/track-report");

    } catch (error) {
      console.error(error);

      saveReportLocally();

      alert("Report Saved Locally 🚀");

      navigate("/track-report");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">

      {/* STEP PROGRESS */}
      <div className="flex justify-center pt-10">

        <div className="flex items-center gap-6">

          {/* STEP */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
              <Check size={20} />
            </div>
            <p className="text-sm mt-2">Upload</p>
          </div>

          <div className="w-24 h-[2px] bg-green-400"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
              <Check size={20} />
            </div>
            <p className="text-sm mt-2">AI Detection</p>
          </div>

          <div className="w-24 h-[2px] bg-green-400"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
              <Check size={20} />
            </div>
            <p className="text-sm mt-2">Location</p>
          </div>

          <div className="w-24 h-[2px] bg-green-400"></div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white">
              <FileText size={20} />
            </div>
            <p className="text-sm mt-2">Details</p>
          </div>

        </div>

      </div>

      {/* CARD */}
      <div className="flex justify-center mt-10 pb-12">

        <div className="bg-white w-[760px] rounded-3xl shadow-sm border border-gray-200 p-8">

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Additional Details
          </h1>

          <p className="text-gray-500 mb-8">
            Add any additional information (optional)
          </p>

          {/* TITLE */}
          <div className="mb-6">

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* DESCRIPTION */}
          <div className="mb-8">

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              placeholder="Provide more details about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 h-[130px] resize-none outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* SUMMARY */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-6 mb-8">

            <h3 className="font-semibold text-lg mb-6">
              Report Summary
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Issue Type
                </p>

                <p className="font-semibold">
                  {formattedIssue}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  AI Confidence
                </p>

                <p className="font-semibold">
                  {confidence}%
                </p>
              </div>

            </div>

            <div className="mb-5">

              <p className="text-sm text-gray-500 mb-2">
                Smart Priority
              </p>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  priority === "High"
                    ? "bg-red-100 text-red-600"
                    : priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {priority}
              </span>

            </div>

            <div>

              <p className="text-sm text-gray-500 mb-2">
                Location
              </p>

              <p className="leading-relaxed text-gray-700">
                {location}
              </p>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-between items-center border-t pt-6">

            <button
              onClick={() => navigate(-1)}
              className="border border-gray-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
            >
              <Send size={18} />
              Submit Report
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Details;