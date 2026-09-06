
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    if (e) e.preventDefault();
    if (!name || !email || !password) {
      setMessage("Please fill in all fields");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      setLoading(true);
      await signupUser({ name, email, password });
      setMessage("Account Created Successfully");

      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setMessage(typeof error.response.data === "string" ? error.response.data : "Signup Failed");
      } else {
        setMessage("Signup Failed");
      }

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
          VOICE INTELLIGENCE • GET STARTED
        </span>
        <h1 className="heading-h1" style={{ margin: "4px 0 2px 0" }}>
          Create your account
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
          Unlock automated transcription and intelligent meeting notes
        </p>
      </div>

      {/* Auth Card */}
      <div className="card-auth">
        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <div style={{ marginBottom: "16px" }}>
            <label className="form-label">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-standard"
              required
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label className="form-label">
              Work Email
            </label>
            <input
              type="email"
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-standard"
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "22px" }}>
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-standard"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", minHeight: "44px", fontSize: "13px" }}
          >
            {loading ? "Creating Account..." : "Create Free Account"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#111111",
                fontWeight: 750,
                textDecoration: "none",
                marginLeft: "4px",
              }}
            >
              Sign In →
            </Link>
          </p>
        </div>
      </div>

      <p style={{ fontSize: "11px", color: "#8a929a", marginTop: "20px", textAlign: "center" }}>
        By registering, you agree to the Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

export default Signup;