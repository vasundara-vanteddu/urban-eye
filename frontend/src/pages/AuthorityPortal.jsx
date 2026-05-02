import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthorityPortal() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!department || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/authority-login", {
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

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authorityDepartment", department);
        localStorage.setItem("authorityEmail", email);

        alert(data.message);

        navigate("/authority-dashboard");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-white flex items-center justify-center px-20">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#0B1736] flex items-center justify-center text-white text-xl">
              📍
            </div>

            <h1 className="text-xl font-bold text-[#0B1736]">
              CivicAI
            </h1>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-[#0B1736] mb-3">
            Authority Portal
          </h1>

          <p className="text-gray-500 mb-8">
            Secure access for government officials and departments
          </p>

          {/* NOTICE BOX */}
          <div className="border rounded-2xl p-4 mb-6 bg-gray-50 flex items-center gap-4">
            <div className="bg-gray-200 w-12 h-12 rounded-xl flex items-center justify-center">
              🏢
            </div>

            <div>
              <p className="font-semibold text-sm">
                Authorized Personnel Only
              </p>

              <p className="text-gray-500 text-xs">
                This portal is restricted to verified officials
              </p>
            </div>
          </div>

          {/* DEPARTMENT */}
          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded-xl p-4 outline-none"
            >
              <option value="">Select your department</option>
              <option>Road Department</option>
              <option>Drainage Department</option>
              <option>Electricity Department</option>
              <option>Sanitation Department</option>
            </select>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Official Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="official@department.gov"
              className="w-full border rounded-xl p-4 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-[#0B1736]"
              >
                Reset password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border rounded-xl p-4 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                👁️
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#0B1736] text-white py-4 rounded-xl font-semibold hover:opacity-95 transition"
          >
            Access Dashboard →
          </button>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="mt-8 text-gray-500 text-sm"
          >
            ← Back to Home
          </button>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-[#0B1736] to-[#142A5C] flex items-center justify-center px-20 text-white">

        <div className="max-w-md">

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Authority Control Center
          </h1>

          <p className="text-gray-300 mb-10 text-lg">
            Manage and resolve civic issues efficiently with AI-powered insights and real-time tracking.
          </p>

          <div className="space-y-6">

            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                🛡️
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Secure Dashboard
                </h3>

                <p className="text-gray-300 text-sm">
                  Enterprise-grade security for sensitive data
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                ⚡
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Real-time Updates
                </h3>

                <p className="text-gray-300 text-sm">
                  Instant notifications on new reports
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                👥
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Team Management
                </h3>

                <p className="text-gray-300 text-sm">
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

export default AuthorityPortal;