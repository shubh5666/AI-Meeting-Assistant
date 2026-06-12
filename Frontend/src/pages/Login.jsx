import { useState,useEffect} from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  if (location.state?.message) {
    setMessage(location.state.message);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }
}, [location]);

const handleLogin = async () => {
  try {
    await loginUser({
      email,
      password,
    });

    setMessage("Login Successful");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (error) {
    console.error(error);
    setMessage("Login Failed");
  }
};

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          AI Meeting Assistant
        </h1>

        <p className="text-zinc-400 mt-3 text-xl">
          Welcome Back
        </p>
      </div>

   {message && (
  <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
    {message}
  </div>
)}

      <div className="max-w-2xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-10">
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
          onClick={handleLogin}
          className="w-full py-4 rounded-xl font-bold text-xl text-white bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-600"
        >
          Login
        </button>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-zinc-400">
            New User?{" "}
            <Link to="/signup" className="text-violet-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;