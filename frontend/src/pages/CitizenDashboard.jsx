import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bell, User, Search } from "lucide-react";

function CitizenDashboard() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [userReports, setUserReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const username =
    localStorage.getItem("citizenUsername") || "Citizen User";

  const email =
    localStorage.getItem("citizenEmail") || "citizen@gmail.com";

  const citizenEmail = localStorage.getItem("citizenEmail");

  useEffect(() => {
    const loadReports = () => {
      const allReports =
        JSON.parse(localStorage.getItem("citizenReports")) || [];

      const filteredReports = allReports.filter(
        (report) => report.citizenEmail === citizenEmail
      );

      setUserReports(filteredReports);
    };

    loadReports();

    const interval = setInterval(loadReports, 1500);

    return () => clearInterval(interval);
  }, [citizenEmail]);

  const filteredReports = userReports.filter((report) => {
    const matchesSearch =
      report.issueType
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      report.address
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      report.complaintId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalReports = userReports.length;

  const pendingReports = userReports.filter(
    (r) =>
      r.status === "Submitted" ||
      r.status === "Under Review"
  ).length;

  const progressReports = userReports.filter(
    (r) => r.status === "In Progress"
  ).length;

  const resolvedReports = userReports.filter(
    (r) => r.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">

        <h1 className="text-lg font-semibold">
          CivicAI
        </h1>

        <div className="flex items-center gap-5 relative">

          <Bell className="text-gray-500" size={20} />

          <div className="relative">

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={18} />
              </div>

              <span className="font-medium">
                {username}
              </span>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden">

                <div className="p-4 border-b">

                  <h3 className="font-semibold">
                    {username}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {email}
                  </p>

                </div>

                <button
                  onClick={() => navigate("/citizen-settings")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50"
                >
                  Account Settings
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("citizenUsername");
                    localStorage.removeItem("citizenEmail");
                    navigate("/citizen-login");
                  }}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                >
                  Log out
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* HEADER */}
      <div className="px-8 mt-6">

        <h2 className="text-3xl font-bold mb-1">
          Welcome back 👋
        </h2>

        <p className="text-gray-500">
          Track and manage your civic issues
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 px-8 mt-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">
            Total Reports
          </p>

          <h2 className="text-3xl font-bold">
            {totalReports}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <h2 className="text-3xl font-bold">
            {pendingReports}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">
            In Progress
          </p>

          <h2 className="text-3xl font-bold">
            {progressReports}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">
            Resolved
          </p>

          <h2 className="text-3xl font-bold">
            {resolvedReports}
          </h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="px-8 mt-8 flex gap-4">

        <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 flex-1 shadow-sm">

          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="bg-white px-5 rounded-2xl shadow-sm"
        >
          <option>All</option>
          <option>Submitted</option>
          <option>Under Review</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

      </div>

      {/* REPORTS */}
      <div className="px-8 mt-8">

        <div className="flex justify-between items-center mb-5">

          <h3 className="text-xl font-semibold">
            Your Reports
          </h3>

          <button
            onClick={() => navigate("/report")}
            className="bg-black text-white px-5 py-3 rounded-xl"
          >
            + Report New Issue
          </button>

        </div>

        {filteredReports.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center text-gray-500">

            <p className="text-lg mb-2">
              No matching reports found
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">

            {filteredReports.map((report, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/citizen-complaint", {
                    state: { report }
                  })
                }
                className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition"
              >

                <img
                  src={report.image}
                  alt="issue"
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between mb-3">

                    <div>
                      <p className="text-xs text-gray-400 uppercase">
                        {report.issueType}
                      </p>

                      <h3 className="font-semibold">
                        {report.issueType}
                      </h3>
                    </div>

                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      {report.status}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mb-3">
                    {report.address}
                  </p>

                  <p className="text-xs text-gray-400">
                    {report.complaintId}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default CitizenDashboard;