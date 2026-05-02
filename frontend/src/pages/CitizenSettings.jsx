import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Calendar } from "lucide-react";

function CitizenSettings() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("citizenUsername") || "Citizen User";

  const email =
    localStorage.getItem("citizenEmail") || "citizen@gmail.com";

  const joinedDate =
    localStorage.getItem("joinedDate") ||
    new Date().toLocaleDateString();

  const allReports =
    JSON.parse(localStorage.getItem("citizenReports")) || [];

  const citizenEmail = localStorage.getItem("citizenEmail");

  const userReports = allReports.filter(
    (report) => report.citizenEmail === citizenEmail
  );

  const totalReports = userReports.length;

  const resolvedReports = userReports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const pendingReports = userReports.filter(
    (r) =>
      r.status === "Submitted" ||
      r.status === "Under Review"
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("citizenUsername");
    localStorage.removeItem("citizenEmail");

    navigate("/citizen-login");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      {/* HEADER */}
      <div className="bg-white border-b px-10 py-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold">
          Citizen Profile
        </h1>

        <p className="text-gray-500">
          View your profile and activity
        </p>

      </div>

      <div className="max-w-7xl mx-auto py-10 grid grid-cols-3 gap-8">

        {/* LEFT PROFILE */}
        <div className="bg-white rounded-3xl shadow-sm p-8 h-fit">

          <div className="flex flex-col items-center text-center">

            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-5">
              <User size={38} />
            </div>

            <h2 className="text-2xl font-bold">
              {username}
            </h2>

            <p className="text-gray-500 mt-1">
              {email}
            </p>

            <div className="mt-6 space-y-4 w-full">

              <div className="bg-gray-50 rounded-2xl p-4 text-left">

                <div className="flex items-center gap-3">

                  <Mail size={18} />

                  <div>
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="font-medium">
                      {email}
                    </p>
                  </div>

                </div>

              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-left">

                <div className="flex items-center gap-3">

                  <Calendar size={18} />

                  <div>
                    <p className="text-xs text-gray-400">
                      Joined
                    </p>

                    <p className="font-medium">
                      {joinedDate}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="mt-8 w-full border border-red-300 text-red-600 py-3 rounded-2xl font-medium hover:bg-red-50"
            >
              <div className="flex justify-center items-center gap-2">
                <LogOut size={18} />
                Logout
              </div>
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="col-span-2 space-y-8">

          {/* STATS */}
          <div className="grid grid-cols-3 gap-5">

            <div className="bg-white rounded-3xl shadow-sm p-6">

              <p className="text-sm text-gray-500">
                Total Reports
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalReports}
              </h2>

            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6">

              <p className="text-sm text-gray-500">
                Resolved
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {resolvedReports}
              </h2>

            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6">

              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {pendingReports}
              </h2>

            </div>

          </div>

          {/* HISTORY */}
          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Complaint History
            </h2>

            {userReports.length === 0 ? (
              <p className="text-gray-500">
                No complaints submitted yet.
              </p>
            ) : (
              <div className="space-y-4">

                {userReports.map((report, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-5 flex justify-between items-center"
                  >

                    <div>

                      <p className="font-semibold">
                        {report.issueType}
                      </p>

                      <p className="text-sm text-gray-500">
                        {report.address}
                      </p>

                    </div>

                    <div className="text-right">

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
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

                      <p className="text-xs text-gray-400 mt-2">
                        {report.complaintId}
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default CitizenSettings;