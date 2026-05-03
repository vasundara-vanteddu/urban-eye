import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function CitizenLogin() {
  const [mode, setMode] = useState("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  // SAVE USER DATA
  const saveCitizenData = (userEmail, username) => {
    localStorage.setItem("citizenEmail", userEmail);
    localStorage.setItem("citizenUsername", username);

    // SAVE JOIN DATE FIRST TIME ONLY
    if (!localStorage.getItem("joinedDate")) {
      localStorage.setItem(
        "joinedDate",
        new Date().toLocaleDateString()
      );
    }
  };

  // ---------------- EMAIL LOGIN ----------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("https://urban-eye-srks.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: "citizen",
        }),
      });

      const data = await res.json();

      alert(data.message);

      if (data.message === "Login successful") {
        const username = email.split("@")[0];

        saveCitizenData(email, username);

        navigate("/dashboard");
      }

    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const userEmail = result.user.email;
      const username =
        result.user.displayName ||
        userEmail.split("@")[0];

      saveCitizenData(userEmail, username);

      alert("Logged in as " + userEmail);

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  };

  // ---------------- SEND OTP ----------------
  const handleSendOtp = async () => {
    if (!phone) {
      alert("Enter phone number first");
      return;
    }

    try {
      const res = await fetch("https://urban-eye-srks.onrender.com/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      alert(data.message);

      if (data.success === true) {
        setOtpSent(true);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP first");
      return;
    }

    if (otp.length === 4) {
      const generatedEmail = `${phone}@citizen.com`;

      saveCitizenData(generatedEmail, "Citizen User");

      alert("OTP Verified Successfully");

      navigate("/dashboard");

    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[360px]">

        <h2 className="text-center text-xl font-semibold mb-4">
          Citizen Login
        </h2>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border py-3 rounded-lg mb-4 hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-400 mb-4">
          OR
        </div>

        {/* SWITCH */}
        <div className="flex justify-center gap-6 mb-4">

          <button
            onClick={() => {
              setMode("email");
              setOtpSent(false);
            }}
            className={mode === "email" ? "font-bold" : ""}
          >
            Email
          </button>

          <button
            onClick={() => {
              setMode("phone");
              setOtpSent(false);
            }}
            className={mode === "phone" ? "font-bold" : ""}
          >
            Phone
          </button>

        </div>

        {/* EMAIL LOGIN */}
        {mode === "email" ? (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 mb-3 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 mb-3 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-3 mb-3 rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border p-3 mb-3 rounded-lg mt-3"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-black text-white py-3 rounded-lg"
                >
                  Verify OTP
                </button>
              </>
            )}

          </>
        )}

      </div>

    </div>
  );
}

export default CitizenLogin;