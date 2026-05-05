import { useEffect, useState } from "react";

function AuthorityAnalytics() {
  const [reports, setReports] = useState([]);

  const authorityDept =
    localStorage.getItem("authorityDepartment") || "All";

  useEffect(() => {
    const allReports =
      JSON.parse(localStorage.getItem("allReports")) || {};

    let merged = [];

    Object.values(allReports).forEach((userReports) => {
      merged = [...merged, ...userReports];
    });

    // 🔥 FILTER BY DEPARTMENT
    const filtered = merged.filter(
      (r) =>
        authorityDept === "All" ||
        r.department === authorityDept
    );

    setReports(filtered);
  }, []);

  // 🔥 CATEGORY COUNT
  const categoryCount = {};
  reports.forEach((r) => {
    categoryCount[r.issueType] =
      (categoryCount[r.issueType] || 0) + 1;
  });

  // 🔥 STATUS COUNT
  const statusCount = {
    Submitted: 0,
    "Under Review": 0,
    "In Progress": 0,
    Resolved: 0,
  };

  reports.forEach((r) => {
    if (statusCount[r.status] !== undefined) {
      statusCount[r.status]++;
    }
  });

  // 🔥 MONTHLY TREND
  const monthly = {};
  reports.forEach((r) => {
    const month = new Date(r.createdAt).toLocaleString("default", {
      month: "short",
    });

    monthly[month] = (monthly[month] || 0) + 1;
  });

  // 🔥 RESOLUTION RATE
  const total = reports.length;
  const resolved = reports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const resolutionRate =
    total === 0 ? 0 : Math.round((resolved / total) * 100);

  return (
    <div className="p-8 bg-[#f4f6f8] min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        {authorityDept} Analytics
      </h1>

      <div className="grid grid-cols-2 gap-6">

        {/* CATEGORY */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Complaints by Category
          </h2>

          {Object.entries(categoryCount).map(([k, v]) => (
            <div key={k} className="flex justify-between mb-2">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>

        {/* STATUS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Status Distribution
          </h2>

          {Object.entries(statusCount).map(([k, v]) => (
            <div key={k} className="flex justify-between mb-2">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>

        {/* MONTHLY */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Monthly Trend
          </h2>

          {Object.entries(monthly).map(([k, v]) => (
            <div key={k} className="flex justify-between mb-2">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>

        {/* RESOLUTION */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="font-semibold mb-4">
            Resolution Rate
          </h2>

          <div className="text-4xl font-bold">
            {resolutionRate}%
          </div>

          <p className="text-gray-500 mt-2">
            {resolved} of {total} resolved
          </p>
        </div>

      </div>

    </div>
  );
}

export default AuthorityAnalytics;