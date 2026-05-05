import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintModal from "../components/ComplaintModal";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie,
  LineChart, Line
} from "recharts";

function AuthorityDashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState("complaints");

  const department = localStorage.getItem("authorityDepartment");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const allReports =
      JSON.parse(localStorage.getItem("allReports")) || {};

    let merged = [];

    Object.values(allReports).forEach((userReports) => {
      merged = [...merged, ...userReports];
    });

    const filtered = merged.filter((r) => {
      const type = r.issueType?.toLowerCase() || "";

      if (department === "Road Department") {
        return type.includes("pothole") || type.includes("road");
      }
      if (department === "Sanitation Department") {
        return type.includes("garbage") || type.includes("waste");
      }
      if (department === "Drainage Department") {
        return type.includes("drain");
      }
      return true;
    });

    setReports(filtered.reverse());
  };

  const handleLogout = () => {
    localStorage.removeItem("authorityDepartment");
    localStorage.removeItem("authorityEmail");
    navigate("/authority-login");
  };

  // ================= ANALYTICS =================

  const categoryMap = {};
  reports.forEach(r => {
    const key = r.issueType || "Other";
    categoryMap[key] = (categoryMap[key] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  const statusMap = {
    Submitted: 0,
    "Under Review": 0,
    "In Progress": 0,
    Resolved: 0
  };

  reports.forEach(r => {
    if (statusMap[r.status] !== undefined) {
      statusMap[r.status]++;
    }
  });

  const statusData = Object.keys(statusMap).map(key => ({
    name: key,
    value: statusMap[key]
  }));

  const monthMap = {};
  reports.forEach(r => {
    const date = new Date(r.createdAt);
    const month = date.toLocaleString("default", { month: "short" });

    monthMap[month] = (monthMap[month] || 0) + 1;
  });

  const monthlyData = Object.keys(monthMap).map(key => ({
    name: key,
    value: monthMap[key]
  }));

  const resolved = reports.filter(r => r.status === "Resolved").length;
  const resolutionRate =
    reports.length > 0
      ? Math.round((resolved / reports.length) * 100)
      : 0;

  // ============================================

  return (
    <div className="min-h-screen bg-[#f4f6f8]">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5 bg-white border-b">

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-black text-white rounded-lg flex items-center justify-center">
            📍
          </div>
          <h1 className="font-semibold text-lg">CivicAI</h1>
          <span className="text-sm text-gray-400">Authority</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-sm text-gray-500">
            {localStorage.getItem("authorityEmail")}
          </span>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

      </div>

      <div className="p-10">

        <h1 className="text-3xl font-bold mb-2">
          Authority Dashboard
        </h1>

        <p className="text-gray-500 mb-6">
          Manage and resolve civic complaints efficiently
        </p>

        {/* STATS */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          <Card title="Total Complaints" value={reports.length} />
          <Card title="New" value={reports.filter(r => r.status === "Submitted").length} />
          <Card title="In Progress" value={reports.filter(r => r.status === "In Progress").length} />
          <Card title="Resolved" value={reports.filter(r => r.status === "Resolved").length} />
          <Card title="Critical" value={reports.filter(r => r.priority === "High").length} />
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("complaints")}
            className={`px-4 py-2 rounded-lg border ${
              activeTab === "complaints"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Complaints
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-lg border ${
              activeTab === "analytics"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* ================= COMPLAINTS ================= */}
        {activeTab === "complaints" && (
          <div className="bg-white rounded-xl p-6 shadow-sm">

            <table className="w-full text-sm">

              <thead>
                <tr className="text-gray-400 text-left">
                  <th>Image</th>
                  <th>Issue Type</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r) => (
                  <tr key={r.complaintId} className="border-t">

                    <td>
                      <img
                        src={r.image}
                        className="w-14 h-10 rounded object-cover"
                      />
                    </td>

                    <td>
                      <p className="font-medium">{r.issueType}</p>
                      <p className="text-xs text-gray-400">
                        {r.title}
                      </p>
                    </td>

                    <td className="text-gray-500 text-xs">
                      {r.address?.slice(0, 30)}...
                    </td>

                    <td>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                        {r.status}
                      </span>
                    </td>

                    <td>
                      <span className="bg-yellow-200 px-2 py-1 rounded-full text-xs">
                        {r.priority}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => setSelectedReport(r)}
                        className="text-xl"
                      >
                        ⋯
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

        {/* ================= ANALYTICS ================= */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="mb-4 font-semibold">Complaints by Category</h3>
              <BarChart width={400} height={250} data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="mb-4 font-semibold">Status Distribution</h3>
              <PieChart width={300} height={250}>
                <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={80} />
                <Tooltip />
              </PieChart>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="mb-4 font-semibold">Monthly Trend</h3>
              <LineChart width={400} height={250} data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" />
              </LineChart>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="mb-4 font-semibold">Resolution Rate</h3>
              <h1 className="text-4xl font-bold">{resolutionRate}%</h1>
              <p className="text-gray-500 mt-2">
                {resolved} of {reports.length} resolved
              </p>
            </div>

          </div>
        )}

      </div>

      {/* MODAL */}
      {selectedReport && (
        <ComplaintModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onSave={loadReports}
        />
      )}

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

export default AuthorityDashboard;