import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthorityLogin() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!department || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // SAVE AUTHORITY INFO
    localStorage.setItem("authorityDepartment", department);
    localStorage.setItem("authorityEmail", email);

    navigate("/authority-dashboard");
  };

  return (
    <div className="min-h-screen flex font-sans">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-white px-14 py-12 flex flex-col justify-center">

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 bg-[#0B1736] rounded-lg flex items-center justify-center text-white font-bold">
            📍
          </div>
          <h1 className="font-semibold text-lg">CivicAI</h1>
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-2">
          Authority Portal
        </h2>

        <p className="text-gray-500 mb-6">
          Secure access for government officials and departments
        </p>

        {/* ALERT BOX */}
        <div className="bg-gray-100 p-4 rounded-xl mb-6 text-sm flex gap-3 items-start">
          <div className="text-lg">🛡️</div>
          <div>
            <p className="font-medium">
              Authorized Personnel Only
            </p>
            <p className="text-gray-500 text-xs">
              This portal is restricted to verified officials
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* DEPARTMENT */}
          <div>
            <label className="text-sm text-gray-500">
              Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border p-4 rounded-xl mt-1 outline-none"
            >
              <option value="">Select your department</option>
              <option>Road Department</option>
              <option>Drainage Department</option>
              <option>Electricity Department</option>
              <option>Sanitation Department</option>
            </select>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-500">
              Official email address
            </label>

            <input
              type="email"
              placeholder="official@department.gov"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-4 rounded-xl mt-1 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex justify-between text-sm text-gray-500">
              <label>Password</label>
              <span className="text-blue-500 cursor-pointer text-xs">
                Reset password?
              </span>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-4 rounded-xl mt-1 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#0B1736] text-white py-4 rounded-xl text-lg font-medium hover:opacity-90 transition"
          >
            Access Dashboard →
          </button>

        </div>

        {/* DEMO BUTTON */}
        <div className="mt-6 border border-dashed p-4 rounded-xl text-center">

          <p className="text-sm text-gray-500 mb-2">
            Quick Access (Demo)
          </p>

          <button
            onClick={() => navigate("/authority-dashboard")}
            className="border px-6 py-3 rounded-xl hover:bg-gray-50"
          >
            Login & Go to Authority Dashboard →
          </button>

        </div>

        {/* BACK */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 text-gray-400 text-sm"
        >
          ← Back to Home
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-[#0B1736] to-[#1E3A8A] text-white flex items-center justify-center">

        <div className="max-w-md px-10">

          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Authority Control Center
          </h1>

          <p className="text-gray-300 mb-10 leading-7">
            Manage and resolve civic issues efficiently with AI-powered insights and real-time tracking.
          </p>

          <div className="space-y-6 text-gray-200">

            <div className="flex gap-3 items-start">
              <span className="text-lg">🛡️</span>
              <div>
                <p className="font-medium">Secure Dashboard</p>
                <p className="text-sm text-gray-400">
                  Enterprise-grade security for sensitive data
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-lg">⚡</span>
              <div>
                <p className="font-medium">Real-time Updates</p>
                <p className="text-sm text-gray-400">
                  Instant notifications on new reports
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-lg">👥</span>
              <div>
                <p className="font-medium">Team Management</p>
                <p className="text-sm text-gray-400">
                  Coordinate across departments seamlessly
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthorityLogin;