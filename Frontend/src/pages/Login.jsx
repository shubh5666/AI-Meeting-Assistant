import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => {
        setMessage("");
      }, 2500);
    }
  }, [location]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter email and password");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      setLoading(true);
      await loginUser({ email, password });
      setMessage("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error(error);
      setMessage("Login failed. Please check credentials.");
      setTimeout(() => {
        setMessage("");
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-app)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      {/* Toast Notice */}
      {message && (
        <div className="toast-notice">
          <span className="status-dot-active"></span>
          <span>{message}</span>
        </div>
      )}

      {/* Brand Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        {/* Brand Icon: Indigo-Violet Gradient with Audio Wave */}
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            borderRadius: "12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            marginBottom: "14px",
            boxShadow: "0 6px 18px rgba(79, 70, 229, 0.35)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </div>

        <span className="eyebrow" style={{ display: "block", color: "#6366f1" }}>
          VOICE INTELLIGENCE • SECURE AUTH
        </span>
        <h1 className="heading-h1" style={{ margin: "4px 0 2px 0" }}>
          Welcome back
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
          Sign in to your AI meeting workspace
        </p>
      </div>

      {/* Auth Card (max-width: 470px, 40px padding, 20px radius) */}
      <div className="card-auth">
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div style={{ marginBottom: "18px" }}>
            <label className="form-label">
              Work Email
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-standard"
              required
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
              <label className="form-label" style={{ margin: 0 }}>
                Password
              </label>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", cursor: "pointer" }}>
                Forgot?
              </span>
            </div>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-standard"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", minHeight: "44px", fontSize: "13px" }}
          >
            {loading ? "Signing in..." : "Sign in to Account"}
          </button>
        </form>

        {/* Card Footer Divider */}
        <div
          style={{
            borderTop: "1px solid #edf0f2",
            marginTop: "24px",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              style={{
                color: "#111111",
                fontWeight: 750,
                textDecoration: "none",
                marginLeft: "4px",
              }}
            >
              Create Account →
            </Link>
          </p>
        </div>
      </div>

      {/* Security note */}
      <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span className="status-dot-active" style={{ width: "5px", height: "5px" }}></span>
        <span style={{ fontSize: "11px", color: "#8a929a" }}>
          Protected by end-to-end meeting encryption
        </span>
      </div>
    </div>
  );
}

export default Login;