import { useNavigate } from "react-router-dom";
import { User, Building2, Shield } from "lucide-react";

function Portal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f9fc]">

      {/* TOP */}
      <div className="flex justify-between items-center px-10 py-6">

        <h1 className="text-2xl font-bold text-gray-800">
          CivicAI
        </h1>

        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-black transition"
        >
          ← Back to Home
        </button>

      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center justify-center mt-6">

        <h1 className="text-5xl font-bold text-center text-gray-900 mb-3">

          Welcome to{" "}

          <span className="text-gray-700">
            CivicAI
          </span>

        </h1>

        <p className="text-gray-500 mb-12 text-lg">
          Choose your portal to get started
        </p>

        {/* CARDS */}
        <div className="flex gap-8 flex-wrap justify-center">

          {/* CITIZEN */}
          <div
            onClick={() => navigate("/citizen-login")}
            className="bg-white border border-gray-200 rounded-[28px] w-[340px] p-10 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >

            <div>

              {/* ICON */}
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-8 mx-auto">

                <User size={34} className="text-gray-700" />

              </div>

              {/* TITLE */}
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
                Citizen Portal
              </h2>

              {/* TEXT */}
              <p className="text-gray-500 text-center leading-8 mb-8">
                Report civic issues, track your complaints,
                and see real-time updates in your neighborhood.
              </p>

              {/* BULLETS */}
              <div className="space-y-3 text-gray-600 text-sm">

                <p>• Report infrastructure issues</p>
                <p>• AI-powered detection</p>
                <p>• Track complaint status</p>
                <p>• Get resolution updates</p>

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-10 text-center">

              <button className="font-semibold text-gray-800 hover:text-black">
                Enter as Citizen →
              </button>

            </div>

          </div>

          {/* AUTHORITY */}
          <div
            onClick={() => navigate("/authority-login")}
            className="relative overflow-hidden bg-gradient-to-br from-[#0b1736] to-[#182849] text-white rounded-[28px] w-[340px] p-10 shadow-xl hover:scale-[1.02] hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >

            {/* GLOW EFFECT */}
            <div className="absolute bottom-[-40px] right-[-30px] w-[140px] h-[140px] bg-white/5 rounded-full blur-xl"></div>

            <div>

              {/* ICON */}
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">

                <Building2 size={34} className="text-white" />

              </div>

              {/* TITLE */}
              <h2 className="text-3xl font-bold text-center mb-4">
                Authority Portal
              </h2>

              {/* TEXT */}
              <p className="text-gray-300 text-center leading-8 mb-8">
                Manage complaints, assign departments,
                and monitor city-wide analytics.
              </p>

              {/* BULLETS */}
              <div className="space-y-3 text-sm text-gray-200">

                <p>• Manage all complaints</p>
                <p>• Update complaint status</p>
                <p>• Department analytics</p>
                <p>• Resolution tracking</p>

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-10 text-center">

              <button className="font-semibold text-white">
                Enter as Authority →
              </button>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-2 text-gray-400 mt-10 text-sm">

          <Shield size={16} />

          <p>
            Secure, role-based access for all users
          </p>

        </div>

      </div>

    </div>
  );
}

export default Portal;