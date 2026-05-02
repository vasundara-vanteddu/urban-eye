import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  RefreshCw,
  BarChart3,
  Settings
} from "lucide-react";
import ComplaintModal from "../components/ComplaintModal";

function AuthorityDashboard() {
  const navigate = useNavigate();

  const authorityDepartment = localStorage.getItem("authorityDepartment");

  const [activeTab, setActiveTab] = useState("complaints");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const departmentMapping = {
    "Road Department": ["Pothole", "Road Damage"],
    "Drainage Department": ["Drainage Problem", "Water Leak"],
    "Electricity Department": ["Streetlight Issue", "Traffic Signal"],
    "Sanitation Department": [
      "Garbage Collection",
      "Garbage",
      "Waste",
      "Trash"
    ]
  };

  const allReports =
    JSON.parse(localStorage.getItem("citizenReports")) || [];

  const filteredReports = allReports.filter((report) => {
    const allowedIssues =
      departmentMapping[authorityDepartment] || [];

    return allowedIssues.some(
      (issue) =>
        report.issueType?.toLowerCase() === issue.toLowerCase()
    );
  });

  const displayedReports =
    statusFilter === "All Status"
      ? filteredReports
      : filteredReports.filter(
          (report) => report.status === statusFilter
        );

  const resolvedCount = filteredReports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const progressPercent =
    filteredReports.length === 0
      ? 0
      : Math.round((resolvedCount / filteredReports.length) * 100);

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      {/* HEADER */}
      <div className="bg-white border-b px-10 py-5 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <div className="bg-[#0B1736] text-white rounded-xl w-10 h-10 flex items-center justify-center font-bold">
            C
          </div>

          <div>
            <h1 className="font-bold text-xl text-[#0B1736]">
              CivicAI
            </h1>
            <p className="text-xs text-gray-400">
              Authority
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/authority-analytics")}
            className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90"
          >
            Analytics
          </button>

          <button
            onClick={() => navigate("/authority-settings")}
            className="border px-5 py-2 rounded-xl hover:bg-gray-50 flex items-center gap-2"
          >
            <Settings size={18} />
            Settings
          </button>

          <Bell className="text-gray-500" size={20} />

          <div className="relative group cursor-pointer">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>

              <span className="text-sm font-medium">
                Authority User
              </span>
            </div>

            {/* DROPDOWN */}
            <div className="absolute right-0 top-14 w-[240px] bg-white rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">

              <div className="p-4 border-b">
                <h3 className="font-semibold">
                  Authority User
                </h3>

                <p className="text-sm text-gray-400">
                  authority@dept.gov
                </p>
              </div>

              <button
                onClick={() => navigate("/authority-settings")}
                className="w-full text-left px-4 py-4 hover:bg-gray-50 border-b"
              >
                Account Settings
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("authorityDepartment");
                  navigate("/authority-login");
                }}
                className="w-full text-left px-4 py-4 text-red-500 hover:bg-red-50"
              >
                Log out
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="px-10 py-8">

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-[#0B1736] mb-2">
            Authority Dashboard
          </h1>

          <p className="text-gray-500 text-lg">
            Logged in as {authorityDepartment}
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-5 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-6 border">
            <p className="text-gray-500 text-sm">Total Complaints</p>
            <h2 className="text-4xl font-bold mt-3">
              {filteredReports.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border">
            <p className="text-gray-500 text-sm">New</p>
            <h2 className="text-4xl font-bold mt-3">
              {filteredReports.filter(r => r.status === "Submitted").length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border">
            <p className="text-gray-500 text-sm">In Progress</p>
            <h2 className="text-4xl font-bold mt-3">
              {filteredReports.filter(r => r.status === "In Progress").length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border">
            <p className="text-gray-500 text-sm">Resolved</p>
            <h2 className="text-4xl font-bold mt-3">
              {resolvedCount}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border">
            <p className="text-gray-500 text-sm">Critical</p>
            <h2 className="text-4xl font-bold mt-3">
              {filteredReports.filter(r => r.priority === "High").length}
            </h2>
          </div>

        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6">

          <button
            onClick={() => setActiveTab("complaints")}
            className={`px-5 py-2 rounded-xl border ${
              activeTab === "complaints"
                ? "bg-white shadow"
                : "bg-gray-100"
            }`}
          >
            Complaints
          </button>

          <button
            onClick={() => navigate("/authority-analytics")}
            className="px-5 py-2 rounded-xl border flex items-center gap-2 bg-gray-100 hover:bg-white"
          >
            <BarChart3 size={18} />
            Analytics
          </button>

        </div>

        {/* COMPLAINTS */}
        <div className="bg-white rounded-3xl border overflow-hidden">

          <div className="p-6 flex justify-between items-center border-b">

            <div className="relative w-[400px]">
              <Search
                className="absolute left-4 top-3 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search complaints..."
                className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none"
              />
            </div>

            <div className="flex gap-3">

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-xl px-5 py-3"
              >
                <option>All Status</option>
                <option>Submitted</option>
                <option>Under Review</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

              <button className="border rounded-xl px-5 py-3 flex gap-2 items-center">
                <RefreshCw size={16} />
                Refresh
              </button>

            </div>

          </div>

          <div className="grid grid-cols-6 px-6 py-4 bg-gray-50 border-b text-gray-500 text-sm font-medium">
            <div>Issue Type</div>
            <div>Location</div>
            <div>Confidence</div>
            <div>Status</div>
            <div>Priority</div>
            <div>Complaint ID</div>
          </div>

          {displayedReports.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No reports found
            </div>
          ) : (
            displayedReports.map((report, index) => (
              <div
                key={index}
                onClick={() => setSelectedComplaint(report)}
                className="grid grid-cols-6 items-center px-6 py-5 border-b cursor-pointer hover:bg-gray-50 transition"
              >

                <div className="flex gap-3 items-center">

                  <img
                    src={
                      report.image &&
                      report.image !== "null" &&
                      report.image !== ""
                        ? report.image
                        : "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?q=80&w=400"
                    }
                    alt="issue"
                    className="w-16 h-16 rounded-xl object-cover border"
                  />

                  <div>
                    <p className="font-semibold">
                      {report.issueType}
                    </p>

                    <p className="text-sm text-gray-400">
                      {report.description || "No description"}
                    </p>
                  </div>

                </div>

                <div className="truncate text-sm">
                  {report.address}
                </div>

                <div>{report.confidence}%</div>

                <div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {report.status}
                  </span>
                </div>

                <div>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {report.priority}
                  </span>
                </div>

                <div>{report.complaintId}</div>

              </div>
            ))
          )}

        </div>

      </div>

      {/* MODAL */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}

    </div>
  );
}

export default AuthorityDashboard;