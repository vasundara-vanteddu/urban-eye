import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { detectPriority } from "../utils/priorityEngine";

function ReportSuccess() {
  const navigate = useNavigate();

  const complaintId =
    localStorage.getItem("complaintId") ||
    "69da69c2e04095c8a909a3aa";

  const uploadedImage =
    localStorage.getItem("uploadedImage");

  const prediction =
    localStorage.getItem("prediction") || "Pothole";

  const address =
    localStorage.getItem("address") || "Hyderabad";

  const description =
    localStorage.getItem("description") || "";

  const lat =
    parseFloat(localStorage.getItem("lat")) || 17.385;

  const lng =
    parseFloat(localStorage.getItem("lng")) || 78.4867;

  // SMART PRIORITY RECALCULATION
  const priority = detectPriority(
    prediction,
    address,
    description
  );

  // COPY ID
  const copyId = () => {
    navigator.clipboard.writeText(complaintId);
    alert("Complaint ID Copied!");
  };

  // REPORT AGAIN
  const handleReportAnother = () => {
    localStorage.removeItem("uploadedImage");
    localStorage.removeItem("prediction");
    localStorage.removeItem("confidence");
    localStorage.removeItem("address");
    localStorage.removeItem("priority");
    localStorage.removeItem("complaintId");
    localStorage.removeItem("description");

    navigate("/report");
  };

  const getPriorityStyle = () => {
    if (priority === "High") {
      return "bg-red-100 text-red-600";
    }

    if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-10 py-4 bg-white border-b">

        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600"
        >
          ← Back
        </button>

        <button
          onClick={copyId}
          className="border px-4 py-2 rounded-lg bg-white"
        >
          📋 Copy ID
        </button>

      </div>

      {/* MAIN */}
      <div className="max-w-[1200px] mx-auto mt-8 grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="col-span-2 space-y-6">

          {/* IMAGE */}
          <div className="bg-white rounded-2xl overflow-hidden shadow">

            <img
              src={
                uploadedImage
                  ? uploadedImage
                  : "https://images.hindustantimes.com/img/2022/07/13/1600x900/potholes_1657695209474_1657695218920_1657695218920.jpg"
              }
              alt="issue"
              className="w-full h-[320px] object-cover"
            />

          </div>

          {/* DETAILS */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <p className="text-sm text-gray-400 uppercase mb-2">
              {prediction}
            </p>

            <h1 className="text-3xl font-bold mb-3">
              Report Submitted Successfully
            </h1>

            <p className="text-gray-500 mb-3">
              {new Date().toLocaleString()}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {address}
            </p>

          </div>

          {/* MAP */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="font-semibold mb-4">
              Location
            </h2>

            <div className="h-[300px] rounded-xl overflow-hidden">

              <MapContainer
                center={[lat, lng]}
                zoom={15}
                className="h-full w-full"
              >

                <TileLayer
                  attribution="© OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[lat, lng]} />

              </MapContainer>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* STATUS */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="font-semibold mb-5">
              Status Timeline
            </h2>

            <div className="space-y-4">

              <p className="text-green-600 font-semibold">
                ● Submitted
              </p>

              <p className="text-gray-400">
                ○ Under Review
              </p>

              <p className="text-gray-400">
                ○ In Progress
              </p>

              <p className="text-gray-400">
                ○ Resolved
              </p>

            </div>

          </div>

          {/* REFERENCE */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="font-semibold mb-4">
              Reference Details
            </h2>

            <p className="text-sm text-gray-400">
              Complaint ID
            </p>

            <p className="font-semibold mb-4 break-all">
              {complaintId}
            </p>

            <p className="text-sm text-gray-400 mb-2">
              Smart Priority
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityStyle()}`}
            >
              {priority}
            </span>

            <button
              onClick={handleReportAnother}
              className="w-full mt-6 border border-black text-black py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              Report Another Issue
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ReportSuccess;