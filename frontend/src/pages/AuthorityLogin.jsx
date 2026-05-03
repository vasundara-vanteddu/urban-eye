import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthorityLogin() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!department || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://urban-eye-srks.onrender.com/authority-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authorityEmail", email);
        localStorage.setItem("authorityDepartment", department);

        alert(data.message);
        localStorage.setItem("authorityDepartment", department);
navigate("/authority-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-white px-12 py-10">
        <h1 className="text-xl font-semibold mb-6">CivicAI</h1>

        <h2 className="text-2xl font-semibold mb-2">
          Authority Portal
        </h2>

        <p className="text-gray-500 mb-6">
          Secure access for government officials and departments
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm">
          🔒 Authorized Personnel Only
          <br />
          <span className="text-gray-500">
            This portal is restricted to verified officials
          </span>
        </div>

        <div className="space-y-4">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select your department</option>
            <option>Road Department</option>
            <option>Drainage Department</option>
            <option>Electricity Department</option>
            <option>Sanitation Department</option>
          </select>

          <input
            type="email"
            placeholder="official@department.gov"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex justify-between text-sm text-gray-500">
            <span>Password</span>
            <span className="cursor-pointer">Reset password?</span>
          </div>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Access Dashboard →
          </button>
        </div>

        <p
          onClick={() => navigate("/portal")}
          className="text-sm text-gray-400 mt-6 cursor-pointer"
        >
          ← Back to Home
        </p>
      </div>

      <div className="w-1/2 bg-gradient-to-br from-gray-900 to-blue-900 text-white flex items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-3xl font-semibold mb-4">
            Authority Control Center
          </h2>

          <p className="text-gray-300 mb-6">
            Manage and resolve civic issues efficiently with AI-powered insights and real-time tracking.
          </p>

          <ul className="space-y-4 text-gray-300">
            <li>🛡 Secure Dashboard</li>
            <li>⚡ Real-time Updates</li>
            <li>👥 Team Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthorityLogin;