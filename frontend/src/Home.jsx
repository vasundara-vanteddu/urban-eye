import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen text-gray-900">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-14 py-6 shadow-sm sticky top-0 bg-white z-50">

        <h1 className="text-2xl font-bold">
          Urban-Eye
        </h1>

        <div className="flex gap-10 text-gray-600 font-medium">
          <p className="cursor-pointer hover:text-black">
            Features
          </p>

          <p className="cursor-pointer hover:text-black">
            How It Works
          </p>

          <p className="cursor-pointer hover:text-black">
            Authority Portal
          </p>
        </div>

        <div className="flex gap-6 items-center">

          <button
            onClick={() => navigate("/report")}
            className="text-gray-700 hover:text-black font-medium"
          >
            Report Issue
          </button>

          <button
            onClick={() => navigate("/portal")}
            className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90"
          >
            Sign In →
          </button>

        </div>

      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-20 py-24 gap-20">

        {/* LEFT */}
        <div className="max-w-2xl">

          <p className="bg-gray-100 inline-block px-4 py-2 rounded-full text-sm mb-6">
            ✨ AI-Powered Civic Platform
          </p>

          <h1 className="text-7xl font-bold leading-[1.05]">
            Report Issues.
            <br />
            Transform Cities.
          </h1>

          <p className="text-gray-600 mt-8 text-xl leading-relaxed">
            Empower your community with AI-driven infrastructure reporting.
            Snap a photo, let AI detect the issue, and track resolution
            in real-time.
          </p>

          <div className="flex gap-5 mt-10">

            <button
              onClick={() => navigate("/report")}
              className="bg-black text-white px-8 py-4 rounded-xl text-lg hover:opacity-90"
            >
              Report an Issue →
            </button>

            <button
              onClick={() => navigate("/portal")}
              className="border px-8 py-4 rounded-xl text-lg hover:bg-gray-50"
            >
              Sign In / Login
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div>

          <img
            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
            alt="city"
            className="w-[720px] h-[460px] object-cover rounded-3xl shadow-2xl"
          />

        </div>

      </div>

      {/* FEATURES */}
      <div className="px-20 py-28 bg-gray-50">

        <h2 className="text-5xl font-bold text-center mb-5">
          Everything you need to make your city better
        </h2>

        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
          A comprehensive platform designed to streamline civic issue reporting
          and resolution with cutting-edge technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <h3 className="font-bold text-2xl mb-3">
              AI-Powered Detection
            </h3>

            <p className="text-gray-600 text-lg">
              Our advanced AI automatically identifies issues.
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <h3 className="font-bold text-2xl mb-3">
              Easy Photo Reporting
            </h3>

            <p className="text-gray-600 text-lg">
              Simply snap a photo and our system handles the rest.
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <h3 className="font-bold text-2xl mb-3">
              Precise Location Mapping
            </h3>

            <p className="text-gray-600 text-lg">
              GPS-enabled tracking ensures accurate issue location.
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <h3 className="font-bold text-2xl mb-3">
              Real-Time Notifications
            </h3>

            <p className="text-gray-600 text-lg">
              Stay updated as your report progresses.
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <h3 className="font-bold text-2xl mb-3">
              Transparent Tracking
            </h3>

            <p className="text-gray-600 text-lg">
              Monitor the full lifecycle of your complaint.
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <h3 className="font-bold text-2xl mb-3">
              Verified Resolution
            </h3>

            <p className="text-gray-600 text-lg">
              Ensure accountability with proof and updates.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;