import { useNavigate } from "react-router-dom";

function Portal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-xl font-semibold">CivicAI</h1>

        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-black"
        >
          ← Back to Home
        </button>
      </div>

      {/* MAIN */}
      <div className="flex flex-col items-center justify-center mt-10">

        <h1 className="text-3xl font-semibold mb-2">
          Welcome to CivicAI
        </h1>

        <p className="text-gray-600 mb-10">
          Choose your portal to get started
        </p>

        <div className="flex gap-10">

          {/* CITIZEN */}
          <div
            onClick={() => navigate("/citizen-login")}
            className="bg-white p-8 rounded-2xl shadow-md w-[320px] h-[420px] text-center flex flex-col justify-between transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <div>
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-xl mb-4"></div>

              <h2 className="text-xl font-semibold mb-4">
                Citizen Portal
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                Report civic issues and track complaints.
              </p>
            </div>

            <p className="mt-6 font-medium">
              Enter as Citizen →
            </p>
          </div>

          {/* AUTHORITY ✅ FIXED */}
          <div
            onClick={() => navigate("/authority-login")}  // 🔥 THIS IS THE IMPORTANT LINE
            className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8 rounded-2xl shadow-md w-[320px] h-[420px] text-center flex flex-col justify-between transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 cursor-pointer"
          >
            <div>
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-xl mb-4"></div>

              <h2 className="text-xl font-semibold mb-4">
                Authority Portal
              </h2>

              <p className="text-gray-300 text-sm mb-6">
                Manage complaints and track progress.
              </p>
            </div>

            <p className="mt-6 font-medium">
              Enter as Authority →
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Portal;