import { useNavigate } from "react-router-dom";
import { User, Shield, LogOut, Mail } from "lucide-react";

function AuthoritySettings() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("authorityUsername") || "Authority User";

  const email =
    localStorage.getItem("authorityEmail") || "authority@gmail.com";

  const handleLogout = () => {
    localStorage.removeItem("authorityDepartment");
    localStorage.removeItem("authorityUsername");
    localStorage.removeItem("authorityEmail");

    navigate("/authority-login");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      {/* TOP NAVBAR */}
      <div className="bg-white border-b px-10 py-5 flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-[#0B1736]">
            Account Settings
          </h1>

          <p className="text-gray-500">
            Manage your profile and preferences
          </p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto mt-10 space-y-8">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">

          <div className="flex items-center gap-5 mb-8">

            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
              <User size={35} className="text-gray-500" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                {username}
              </h2>

              <p className="text-gray-500">
                {email}
              </p>

              <span className="bg-[#0B1736] text-white text-xs px-3 py-1 rounded-full">
                Authority
              </span>
            </div>

          </div>

          <div className="space-y-5">

            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Full Name
              </label>

              <div className="border rounded-xl p-4 flex items-center gap-3">
                <User size={18} className="text-gray-400" />
                <span>{username}</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Email Address
              </label>

              <div className="border rounded-xl p-4 flex items-center gap-3 bg-gray-50">
                <Mail size={18} className="text-gray-400" />
                <span>{email}</span>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Email cannot be changed
              </p>
            </div>

            <button className="w-full bg-[#0B1736] text-white py-4 rounded-2xl font-semibold">
              Save Changes
            </button>

          </div>

        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-gray-100 p-3 rounded-xl">
              <Shield size={22} />
            </div>

            <h2 className="text-2xl font-semibold">
              Security
            </h2>

          </div>

          <div className="border rounded-2xl p-6 bg-gray-50">

            <h3 className="font-semibold">
              Password Management
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Password is managed through the authentication provider
            </p>

          </div>

        </div>

        {/* LOGOUT */}
        <div className="bg-white rounded-3xl shadow-sm border border-red-200 p-8">

          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Sign Out
          </h2>

          <p className="text-gray-500 mb-6">
            You will be redirected to the authority login page.
          </p>

          <button
            onClick={handleLogout}
            className="w-full border border-red-300 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-50 flex justify-center items-center gap-2"
          >
            <LogOut size={18} />
            Sign Out
          </button>

        </div>

      </div>

    </div>
  );
}

export default AuthoritySettings;