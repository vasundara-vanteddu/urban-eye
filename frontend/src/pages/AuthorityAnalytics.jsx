import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AuthorityAnalytics() {
  const navigate = useNavigate();

  const allReports =
    JSON.parse(localStorage.getItem("citizenReports")) || [];

  const totalReports = allReports.length;

  const resolved = allReports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const pending = allReports.filter(
    (r) =>
      r.status === "Submitted" ||
      r.status === "Under Review"
  ).length;

  const progress = allReports.filter(
    (r) => r.status === "In Progress"
  ).length;

  const pieData = [
    { name: "Resolved", value: resolved },
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

  const departmentCounts = {
    Road: 0,
    Drainage: 0,
    Electricity: 0,
    Sanitation: 0,
  };

  allReports.forEach((report) => {
    if (report.department?.includes("Road")) {
      departmentCounts.Road++;
    }

    if (report.department?.includes("Drainage")) {
      departmentCounts.Drainage++;
    }

    if (report.department?.includes("Electricity")) {
      departmentCounts.Electricity++;
    }

    if (report.department?.includes("Sanitation")) {
      departmentCounts.Sanitation++;
    }
  });

  const departmentData = [
    {
      department: "Road",
      complaints: departmentCounts.Road,
    },
    {
      department: "Drainage",
      complaints: departmentCounts.Drainage,
    },
    {
      department: "Electricity",
      complaints: departmentCounts.Electricity,
    },
    {
      department: "Sanitation",
      complaints: departmentCounts.Sanitation,
    },
  ];

  const monthlyData = [
    { month: "Jan", complaints: 4 },
    { month: "Feb", complaints: 8 },
    { month: "Mar", complaints: 6 },
    { month: "Apr", complaints: 11 },
    { month: "May", complaints: totalReports },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      {/* HEADER */}
      <div className="bg-white border-b px-10 py-6 flex justify-between items-center">

        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm mb-3"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            Authority Analytics
          </h1>

          <p className="text-gray-500">
            Department performance insights
          </p>
        </div>

      </div>

      <div className="p-8">

        {/* STATS */}
        <div className="grid grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Complaints
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {totalReports}
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Resolved
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              {resolved}
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <h2 className="text-4xl font-bold mt-3 text-blue-600">
              {pending}
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              In Progress
            </p>

            <h2 className="text-4xl font-bold mt-3 text-yellow-500">
              {progress}
            </h2>

          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-8 mb-8">

          {/* PIE */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-xl font-semibold mb-6">
              Complaint Status Distribution
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

          {/* BAR */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-xl font-semibold mb-6">
              Department Workload
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={departmentData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="department" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="complaints" fill="#111827" />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* MONTHLY */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Monthly Complaint Trend
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="complaints" fill="#2563eb" />

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default AuthorityAnalytics;