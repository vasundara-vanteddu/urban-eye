import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("https://urban-eye-srks.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        role: "citizen"   // 🔥 IMPORTANT
      })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message === "User created successfully") {
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
          Create your account
        </h2>

        <input
          type="email"
          placeholder="you@example.com"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Create account
        </button>

      </div>
    </div>
  );
}

export default Signup;