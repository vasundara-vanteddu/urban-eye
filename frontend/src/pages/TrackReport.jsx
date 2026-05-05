import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TrackReport() {
  const location = useLocation();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  useEffect(() => {
    if (location.state?.report) {
      setReport(location.state.report);
      return;
    }

    const complaintId = localStorage.getItem("complaintId");
    const userKey = localStorage.getItem("citizenEmail");

    const allReports =
      JSON.parse(localStorage.getItem("allReports")) || {};

    const userReports = allReports[userKey] || [];

    const found = userReports.find(
      (r) => r.complaintId === complaintId
    );

    if (found) setReport(found);
  }, [location]);

  if (!report) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>Report not found ❌</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] px-10 py-6">

      {/* BACK */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 text-gray-500"
      >
        ← Back
      </button>

      <div className="grid grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">

          {/* IMAGE (FIXED ZOOM 🔥) */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

            <img
              src={report.image}
              alt="issue"
              className="w-full h-[260px] object-contain bg-black"
            />

          </div>

          {/* DETAILS CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <p className="text-xs text-gray-400 uppercase">
              {report.issueType}
            </p>

            <h2 className="text-xl font-semibold mt-1">
              {report.title}
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              {new Date(report.createdAt).toLocaleString()}
            </p>

            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {report.address}
            </p>

          </div>

          {/* MAP */}
          <div className="bg-white p-4 rounded-2xl shadow-sm">

            <h3 className="font-semibold mb-3">
              Location
            </h3>

            <iframe
              width="100%"
              height="240"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${report.lat},${report.lng}&z=15&output=embed`}
            ></iframe>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* STATUS TIMELINE */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h3 className="font-semibold mb-4">
              Status Timeline
            </h3>

            <div className="space-y-4">

              <div className={`flex items-center gap-2 ${report.status === "Submitted" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
                <span>🟢</span> Submitted
              </div>

              <div className={`flex items-center gap-2 ${report.status === "Under Review" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
                <span>🔍</span> Under Review
              </div>

              <div className={`flex items-center gap-2 ${report.status === "In Progress" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
                <span>⚙️</span> In Progress
              </div>

              <div className={`flex items-center gap-2 ${report.status === "Resolved" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
                <span>✅</span> Resolved
              </div>

            </div>

            <p className="mt-5 text-green-600 text-sm font-semibold">
              Current status
            </p>

            <p className="font-semibold">
              {report.status}
            </p>

          </div>

          {/* REFERENCE DETAILS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <p className="text-gray-400 text-sm">
              Complaint ID
            </p>

            <p className="font-semibold mb-3 text-sm">
              {report.complaintId}
            </p>

            <p className="text-gray-400 text-sm">
              Priority
            </p>

            <span className="inline-block mt-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
              {report.priority}
            </span>

          </div>

          {/* HELP */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h3 className="font-semibold mb-2">
              Need Help?
            </h3>

            <p className="text-gray-500 text-sm mb-4">
              If you have questions, support team is here.
            </p>

            <button className="w-full border py-2 rounded-lg text-sm">
              Contact Support
            </button>

          </div>

          {/* BUTTONS */}
          <div className="space-y-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/report")}
              className="w-full border py-3 rounded-xl"
            >
              Report New Issue
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TrackReport;