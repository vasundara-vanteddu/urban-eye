import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AiDetection() {
  const navigate = useNavigate();

  const prediction =
    localStorage.getItem("prediction") || "Pothole Detected";

  const confidence =
    localStorage.getItem("confidence") || "96%";

  // AUTO SELECT ISSUE TYPE BASED ON AI RESULT
  const getDefaultIssueType = () => {
    const text = prediction.toLowerCase();

    if (text.includes("pothole")) return "Pothole";
    if (text.includes("streetlight")) return "Streetlight Issue";
    if (text.includes("garbage")) return "Garbage Collection";
    if (text.includes("water")) return "Water Leak";
    if (text.includes("road")) return "Road Damage";
    if (text.includes("drainage")) return "Drainage Problem";
    if (text.includes("graffiti")) return "Graffiti";
    if (text.includes("sidewalk")) return "Broken Sidewalk";
    if (text.includes("traffic")) return "Traffic Signal";

    return "Other";
  };

  const [issueType, setIssueType] = useState(getDefaultIssueType());

  const confidenceNumber = parseInt(confidence);

  const priorityLevel =
    confidenceNumber >= 90
      ? "High"
      : confidenceNumber >= 70
      ? "Medium"
      : "Low";

  const handleContinue = () => {
    localStorage.setItem("issueType", issueType);
    navigate("/location");
  };

  const handleBack = () => {
    navigate("/report");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* STEP BAR */}
      <div className="flex justify-center gap-12 mb-8 text-sm">
        <span className="text-green-600 font-semibold">✔ Upload</span>
        <span className="font-semibold">✨ AI Detection</span>
        <span className="text-gray-400">Location</span>
        <span className="text-gray-400">Details</span>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-10">

        <h1 className="text-4xl font-bold mb-2">
          AI Analysis
        </h1>

        <p className="text-gray-500 mb-8">
          Our AI has analyzed your image
        </p>

        {/* RESULT BOX */}
        <div className="border rounded-3xl p-8 mb-8">

          <div className="mb-6">
            <p className="text-gray-500 mb-2">
              Detected Issue
            </p>

            <h2 className="text-3xl font-bold">
              {prediction}
            </h2>
          </div>

          {/* CONFIDENCE */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">
                Confidence Score
              </p>

              <p className="text-green-600 font-semibold">
                {confidence}
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{
                  width: `${confidenceNumber}%`,
                }}
              ></div>
            </div>
          </div>

          {/* PRIORITY */}
          <div>
            <p className="text-gray-500 mb-2">
              Priority Level
            </p>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              {priorityLevel}
            </span>
          </div>
        </div>

        {/* ISSUE TYPE */}
        <div className="mb-8">
          <label className="block mb-3 font-medium">
            Issue Type
          </label>

          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full border p-4 rounded-xl"
          >
            <option>Pothole</option>
            <option>Streetlight Issue</option>
            <option>Garbage Collection</option>
            <option>Water Leak</option>
            <option>Road Damage</option>
            <option>Drainage Problem</option>
            <option>Graffiti</option>
            <option>Broken Sidewalk</option>
            <option>Traffic Signal</option>
            <option>Other</option>
          </select>

          <p className="text-gray-500 text-sm mt-3">
            You can change this if the AI detection is incorrect
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between">

          <button
            onClick={handleBack}
            className="border px-8 py-3 rounded-xl hover:bg-gray-50"
          >
            ← Back
          </button>

          <button
            onClick={handleContinue}
            className="bg-black text-white px-8 py-3 rounded-xl"
          >
            Continue →
          </button>

        </div>
      </div>
    </div>
  );
}

export default AiDetection;