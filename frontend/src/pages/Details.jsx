import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { detectPriority } from "../utils/priorityEngine";

function Details() {
  const navigate = useNavigate();

  const issue = localStorage.getItem("prediction") || "N/A";
  const confidence = localStorage.getItem("confidence") || "0";
  const location = localStorage.getItem("address") || "N/A";
  const uploadedImage = localStorage.getItem("uploadedImage");

  const [description, setDescription] = useState("");

  const formattedIssue =
    issue.charAt(0).toUpperCase() + issue.slice(1);

  // SMART PRIORITY NOW USES DESCRIPTION
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
      await axios.post("http://127.0.0.1:5000/submit-report", {
        issue: formattedIssue,
        confidence,
        priority,
        address: location,
        lat: localStorage.getItem("lat"),
        lng: localStorage.getItem("lng"),
        description,
      });
      localStorage.setItem("description", description);
      localStorage.setItem("priority", priority);
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
    <div className="min-h-screen bg-gray-100">

      <div className="flex justify-between px-10 py-4 bg-white shadow-sm">

        <button onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="font-semibold">
          Urban-Eye
        </h1>

      </div>

      <div className="flex justify-center mt-6">

        <div className="bg-white w-[700px] p-8 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-2">
            Additional Details
          </h2>

          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-[250px] object-cover rounded-xl mb-6"
            />
          )}

          <input
            defaultValue={`${formattedIssue} issue`}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <textarea
            placeholder="Example: Garbage dumped near school entrance..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg h-[120px] mb-6"
          />

          <div className="bg-gray-50 border rounded-xl p-5 mb-6">

            <h3 className="font-semibold mb-4">
              Report Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Issue</span>
              <span>{formattedIssue}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Confidence</span>
              <span>{confidence}%</span>
            </div>

            <div className="flex justify-between mb-3">

              <span>Smart Priority</span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  priority === "High"
                    ? "bg-red-100 text-red-600"
                    : priority === "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {priority}
              </span>

            </div>

            <p className="text-sm text-gray-500 mb-1">
              Location
            </p>

            <p className="text-sm leading-relaxed">
              {location}
            </p>

          </div>

          <div className="flex justify-between">

            <button onClick={() => navigate(-1)}>
              ← Back
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Submit 🚀
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Details;