import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function AuthorityLoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 NORMAL LOGIN
  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        role: "authority"
      })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message === "Login successful") {
      navigate("/authority-dashboard");
    }
  };

  // 🔥 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      alert("Logged in as " + user.email);
      navigate("/authority-dashboard");
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[380px]">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-900 rounded-full"></div>
        </div>

        <h2 className="text-center text-xl font-semibold mb-2">
          Welcome to CivicAI
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to continue
        </p>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border py-3 rounded-lg mb-4 hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-400 text-sm mb-4">OR</div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Sign in
        </button>

        {/* LINKS */}
        <div className="flex justify-between text-sm mt-4 text-gray-500">
          <p onClick={() => navigate("/forgot-password")} className="cursor-pointer">
            Forgot password?
          </p>

          <p onClick={() => navigate("/signup")} className="cursor-pointer">
            Sign up
          </p>
        </div>

      </div>

    </div>
  );
}

export default AuthorityLoginForm;