import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = send email, 2 = reset password

  // STEP 1 → SEND EMAIL
  const handleSendEmail = async () => {
    const res = await fetch("https://urban-eye-srks.onrender.com/send-reset-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message === "Reset link sent to email") {
      setStep(2);
    }
  };

  // STEP 2 → RESET PASSWORD
  const handleResetPassword = async () => {
    const res = await fetch("https://urban-eye-srks.onrender.com/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message === "Password reset successful") {
      navigate("/citizen-login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[360px]">

        <p
          onClick={() => navigate("/citizen-login")}
          className="text-sm text-gray-500 mb-4 cursor-pointer"
        >
          ← Back
        </p>

        <h2 className="text-xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendEmail}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Send Reset Link
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border p-3 rounded-lg mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;