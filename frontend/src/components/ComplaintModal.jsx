import { useState } from "react";

function ComplaintModal({ complaint, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState(
    complaint.status || "Submitted"
  );

  const [remarks, setRemarks] = useState(
    complaint.authorityRemark || ""
  );

  const [proofImage, setProofImage] = useState(
    complaint.resolutionProof || ""
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProofImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    const allReports =
      JSON.parse(localStorage.getItem("citizenReports")) || [];

    const updatedReports = allReports.map((report) => {
      if (report.complaintId === complaint.complaintId) {
        return {
          ...report,
          status: selectedStatus,
          authorityRemark: remarks,
          resolutionProof: proofImage,
          updatedAt: new Date().toLocaleString(),
        };
      }

      return report;
    });

    localStorage.setItem(
      "citizenReports",
      JSON.stringify(updatedReports)
    );

    alert("Complaint Updated Successfully");

    onClose();

    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[900px] rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-8 py-6 border-b">

          <div>
            <p className="text-sm text-gray-400">
              Complaint Details
            </p>

            <h2 className="text-2xl font-bold">
              {complaint.issueType}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-2">

          {/* LEFT */}
          <div className="p-8 border-r">

            <img
              src={complaint.image}
              alt="issue"
              className="w-full h-[320px] object-cover rounded-2xl mb-6"
            />

            <div className="space-y-4">

              <div>
                <p className="text-gray-400 text-sm">
                  Complaint ID
                </p>

                <p className="font-semibold">
                  {complaint.complaintId}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Address
                </p>

                <p>{complaint.address}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Description
                </p>

                <p>{complaint.description}</p>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="p-8 space-y-6">

            <div>

              <label className="block mb-2 font-medium">
                Update Status
              </label>

              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Submitted</option>
                <option>Under Review</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Authority Remarks
              </label>

              <textarea
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
                className="w-full border rounded-xl p-4 h-32"
                placeholder="Add authority remarks..."
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Resolution Proof
              </label>

              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full"
              />

              {proofImage && (
                <img
                  src={proofImage}
                  alt="proof"
                  className="mt-4 w-full h-48 object-cover rounded-xl"
                />
              )}

            </div>

            <button
              onClick={handleSaveChanges}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold"
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