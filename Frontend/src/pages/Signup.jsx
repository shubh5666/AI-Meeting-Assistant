
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signupUser({
        name,
        email,
        password,
      });

      setMessage("Signup Successful");

      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error);

      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Signup Failed");
      }

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">

      {message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          AI Meeting Assistant
        </h1>

        <p className="text-zinc-400 mt-3 text-xl">
          Create your account
        </p>
      </div>

      <div className="max-w-2xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-10">

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-800 text-white px-5 py-4 rounded-xl border border-zinc-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-800 text-white px-5 py-4 rounded-xl border border-zinc-700"
          />
        </div>

        <div className="mb-8">
          <label className="block text-white font-semibold mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800 text-white px-5 py-4 rounded-xl border border-zinc-700"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full py-4 rounded-xl font-bold text-xl text-white bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-600"
        >
          Sign Up
        </button>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-400"
            >
              Login
            </Link>
          </p>
        </div>

      </div>

      <p className="text-zinc-500 mt-8 text-center">
        By signing up, you agree to our Terms of Service
      </p>

    </div>
  );
}

export default Signup;