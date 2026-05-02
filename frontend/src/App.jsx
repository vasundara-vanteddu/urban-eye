import { BrowserRouter, Routes, Route } from "react-router-dom";

// MAIN
import Home from "./Home";
import Portal from "./pages/Portal";

// CITIZEN FLOW
import CitizenLogin from "./pages/CitizenLogin";
import CitizenDashboard from "./pages/CitizenDashboard";
import CitizenSettings from "./pages/CitizenSettings";
import CitizenComplaint from "./pages/CitizenComplaint";
import ReportIssue from "./pages/ReportIssue";
import AiDetection from "./pages/AiDetection";
import Location from "./pages/Location";
import Details from "./pages/Details";
import TrackReport from "./pages/TrackReport";

// AUTHORITY FLOW
import AuthorityLogin from "./pages/AuthorityLogin";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthoritySettings from "./pages/AuthoritySettings";
import AuthorityAnalytics from "./pages/AuthorityAnalytics";

// COMMON
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN */}
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<Portal />} />

        {/* CITIZEN FLOW */}
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/dashboard" element={<CitizenDashboard />} />
        <Route path="/citizen-settings" element={<CitizenSettings />} />
        <Route path="/citizen-complaint" element={<CitizenComplaint />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/ai-detection" element={<AiDetection />} />
        <Route path="/location" element={<Location />} />
        <Route path="/details" element={<Details />} />
        <Route path="/track-report" element={<TrackReport />} />

        {/* AUTHORITY FLOW */}
        <Route path="/authority-login" element={<AuthorityLogin />} />

        <Route
          path="/authority-dashboard"
          element={<AuthorityDashboard />}
        />

        <Route
          path="/authority-settings"
          element={<AuthoritySettings />}
        />

        <Route
          path="/authority-analytics"
          element={<AuthorityAnalytics />}
        />

        {/* COMMON */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;