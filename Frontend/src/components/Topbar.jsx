


import { useNavigate } from "react-router-dom";

function Topbar({ title = "Dashboard", subtitle = "WORKSPACE / OVERVIEW" }) {
  const navigate = useNavigate();

  return (
    <header className="app-topbar">
      {/* Left: Breadcrumbs / Title */}
      <div>
        <span className="eyebrow" style={{ display: "block", marginBottom: "2px" }}>
          {subtitle}
        </span>
        <h2 className="heading-h2" style={{ margin: 0, fontSize: "17px" }}>
          {title}
        </h2>
      </div>

      {/* Right: Actions & User Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Status Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "#ecfdf5",
            border: "1px solid #ccefe0",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#059669",
          }}
        >
          <span className="status-dot-active"></span>
          <span>AI Engine Ready</span>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => navigate("/create-meeting")}
          className="btn-primary"
          style={{ minHeight: "36px", padding: "0 14px", fontSize: "11.5px" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Meeting
        </button>

        {/* User Avatar */}
        <button
          onClick={() => navigate("/profile")}
          style={{
            position: "relative",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0f172a 0%, #312e81 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 800,
            border: "2px solid #ffffff",
            boxShadow: "0 2px 8px rgba(79, 70, 229, 0.25)",
            cursor: "pointer",
          }}
          title="View Profile"
        >
          AI
          <span
            style={{
              position: "absolute",
              bottom: "-1px",
              right: "-1px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              border: "1.5px solid #ffffff",
            }}
          />
        </button>
      </div>
    </header>
  );
}

export default Topbar;