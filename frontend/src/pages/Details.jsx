import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Details() {
  const navigate = useNavigate();

  const userKey =
    localStorage.getItem("citizenEmail") || "guest";

  const issue = localStorage.getItem("prediction");
  const confidence = localStorage.getItem("confidence");
  const address = localStorage.getItem("address");
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");

  const uploadedImage =
    sessionStorage.getItem("uploadedImage");

  const [title, setTitle] = useState(`${issue} issue`);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  // 🔥 STEP 1: AUTO DETECT DEPARTMENT
  const getDepartment = (issue) => {
    const i = issue?.toLowerCase() || "";

    if (i.includes("garbage")) return "Sanitation";
    if (i.includes("pothole") || i.includes("road")) return "Road";
    if (i.includes("drain")) return "Drainage";
    if (i.includes("light")) return "Electricity";

    return "General";
  };

  const handleSubmit = () => {
    const complaintId = `CMP-${Date.now()}`;

    const newReport = {
      complaintId,
      title,
      description,
      issueType: issue,
      confidence,
      address,
      lat,
      lng,
      image: uploadedImage,
      status: "Submitted",
      priority,
      remarks: "",
      resolvedImage: "",
      createdAt: new Date().toISOString(),
      citizenEmail: userKey,

      // 🔥 NEW FIELD (VERY IMPORTANT)
      department: getDepartment(issue),
    };

    let allReports =
      JSON.parse(localStorage.getItem("allReports")) || {};

    if (!allReports[userKey]) {
      allReports[userKey] = [];
    }

    allReports[userKey].push(newReport);

    localStorage.setItem(
      "allReports",
      JSON.stringify(allReports)
    );

    localStorage.setItem("complaintId", complaintId);

    console.log("✅ Saved:", allReports);

    // 🔥 GO TO SUMMARY PAGE
    navigate("/track-report");
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] py-10">

      <div className="max-w-[900px] mx-auto bg-white rounded-3xl shadow-sm p-10">

        <h1 className="text-4xl font-bold mb-2">
          Additional Details
        </h1>

        <p className="text-gray-500 mb-8">
          Add any additional information (optional)
        </p>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Priority Level
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="bg-gray-50 border rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">
            Report Summary
          </h2>

          <p><b>Issue:</b> {issue}</p>
          <p><b>Confidence:</b> {confidence}</p>
          <p><b>Location:</b> {address}</p>
          <p><b>Priority:</b> {priority}</p>

          {/* 🔥 SHOW DEPARTMENT */}
          <p><b>Department:</b> {getDepartment(issue)}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/location")}
            className="border px-6 py-3 rounded-xl"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-8 py-3 rounded-xl"
          >
            Submit Report
          </button>
        </div>

      </div>

    </div>
  );
}

export default Details;