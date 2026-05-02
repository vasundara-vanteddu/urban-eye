import { useLocation, useNavigate } from "react-router-dom";

function CitizenComplaint() {
  const navigate = useNavigate();
  const location = useLocation();

  const passedReport = location.state?.report;

  const allReports =
    JSON.parse(localStorage.getItem("citizenReports")) || [];

  const report = allReports.find(
    (r) => r.complaintId === passedReport?.complaintId
  );

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No complaint found</h2>
      </div>
    );
  }

  const timelineSteps = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved"
  ];

  const currentStep = timelineSteps.indexOf(report.status);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      {/* HEADER */}
      <div className="bg-white border-b px-8 py-5 flex items-center justify-between">

        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium"
        >
          ← Back
        </button>

        <h1 className="font-semibold text-lg">
          Complaint Details
        </h1>

        <div></div>

      </div>

      <div className="max-w-7xl mx-auto py-8 grid grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="col-span-2 space-y-6">

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

            <img
              src={report.image}
              alt="issue"
              className="w-full h-[420px] object-cover"
            />

            <div className="p-8">

              <div className="flex justify-between items-start mb-6">

                <div>
                  <p className="text-sm text-gray-400 uppercase">
                    {report.issueType}
                  </p>

                  <h2 className="text-4xl font-bold">
                    {report.issueType}
                  </h2>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    report.status === "Resolved"
                      ? "bg-green-100 text-green-600"
                      : report.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : report.status === "Under Review"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {report.status}
                </span>

              </div>

              <p className="text-gray-500 mb-8">
                {report.description || "No description available"}
              </p>

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <p className="text-gray-400 text-sm">
                    Complaint ID
                  </p>

                  <p className="font-semibold">
                    {report.complaintId}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Priority
                  </p>

                  <p className="font-semibold">
                    {report.priority}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Location
                  </p>

                  <p className="font-semibold">
                    {report.address}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Confidence
                  </p>

                  <p className="font-semibold">
                    {report.confidence}%
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Report Created
                  </p>

                  <p className="font-semibold">
                    {formatDate(report.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Last Updated
                  </p>

                  <p className="font-semibold">
                    {formatDate(report.updatedAt)}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* AUTHORITY REMARKS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-semibold mb-5">
              Authority Remarks
            </h2>

            <div className="bg-gray-50 rounded-2xl p-6">

              <p className="text-gray-600">
                {report.remarks
                  ? report.remarks
                  : "No authority remarks added yet"}
              </p>

            </div>

          </div>

          {/* RESOLUTION PROOF */}
          {report.resolutionProof && (
            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <h2 className="text-2xl font-semibold mb-5">
                Resolution Proof
              </h2>

              <img
                src={report.resolutionProof}
                alt="proof"
                className="w-full rounded-2xl object-cover"
              />

            </div>
          )}

        </div>

        {/* RIGHT */}
        <div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-semibold mb-8">
              Status Timeline
            </h2>

            <div className="space-y-8">

              {timelineSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >

                  <div
                    className={`w-4 h-4 rounded-full mt-1 ${
                      index <= currentStep
                        ? "bg-black"
                        : "bg-gray-300"
                    }`}
                  ></div>

                  <div>
                    <h3 className="font-medium">
                      {step}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {step === "Submitted" &&
                        "Complaint submitted successfully"}

                      {step === "Under Review" &&
                        "Authority reviewing issue"}

                      {step === "In Progress" &&
                        "Issue currently being resolved"}

                      {step === "Resolved" &&
                        "Complaint completed successfully"}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CitizenComplaint;