import { useState } from "react";

function ComplaintModal({ report, onClose, onSave }) {
  const [status, setStatus] = useState(report?.status || "Submitted");
  const [priority, setPriority] = useState(report?.priority || "Medium");
  const [remarks, setRemarks] = useState(report?.remarks || "");
  const [proof, setProof] = useState(report?.resolvedImage || "");

  const handleSave = () => {
    const allReports =
      JSON.parse(localStorage.getItem("allReports")) || {};

    const userKey = report?.citizenEmail;

    if (!userKey || !allReports[userKey]) {
      alert("❌ Error: User data not found");
      return;
    }

    const userReports = allReports[userKey];

    const index = userReports.findIndex(
      (r) => r.complaintId === report.complaintId
    );

    if (index === -1) {
      alert("❌ Error: Report not found");
      return;
    }

    // ✅ UPDATE REPORT
    userReports[index] = {
      ...userReports[index],
      status,
      priority,
      remarks,
      resolvedImage: proof,
    };

    // ✅ SAVE BACK
    allReports[userKey] = userReports;

    localStorage.setItem(
      "allReports",
      JSON.stringify(allReports)
    );

    // 🔥 IMPORTANT: TRIGGER LIVE UPDATE
    localStorage.setItem("reportUpdated", Date.now());

    // 🔥 FORCE EVENT (instant UI update)
    window.dispatchEvent(new Event("storage"));

    console.log("✅ Updated Report:", userReports[index]);

    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* MODAL BOX */}
      <div className="bg-white w-[900px] rounded-2xl p-6 relative shadow-xl">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-gray-500 text-lg"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Complaint Details
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div>

            <img
              src={report?.image}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />

            <p className="text-sm text-gray-400">Issue Type</p>
            <p className="font-semibold mb-2">
              {report?.issueType}
            </p>

            <p className="text-sm text-gray-400">Title</p>
            <p className="font-semibold mb-2">
              {report?.title}
            </p>

            <div className="flex gap-6 text-sm text-gray-500 mb-2">
              <p>
                Submitted <br />
                <span className="text-black font-medium">
                  {report?.createdAt
                    ? new Date(report.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </p>

              <p>
                Current Status <br />
                <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                  {report?.status}
                </span>
              </p>
            </div>

            <p className="text-sm text-gray-400">Location</p>
            <p className="text-sm">{report?.address}</p>

            {/* ✅ CLEAN MAP (NO API KEY) */}
            {report?.lat && report?.lng && (
              <iframe
                title="map"
                width="100%"
                height="200"
                className="mt-4 rounded-lg"
                src={`https://maps.google.com/maps?q=${report.lat},${report.lng}&z=15&output=embed`}
              />
            )}

          </div>

          {/* RIGHT SIDE */}
          <div>

            <label className="text-sm">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            >
              <option>Submitted</option>
              <option>Under Review</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <label className="text-sm">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <label className="text-sm">Authority Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
              placeholder="Add notes or remarks about this complaint..."
            />

            <label className="text-sm">Resolution Proof Image</label>

            <div className="border border-dashed p-4 rounded-lg text-center mb-4">
              <input
                type="file"
                onChange={(e) =>
                  setProof(URL.createObjectURL(e.target.files[0]))
                }
              />
              <p className="text-xs text-gray-400 mt-2">
                Upload resolution proof
              </p>
            </div>

            <button
              onClick={handleSave}
              className="bg-black text-white w-full py-3 rounded-xl"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintModal;