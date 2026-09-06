


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Topbar({ title = "Dashboard", subtitle = "WORKSPACE / OVERVIEW" }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const res = await api.get("/profile");
        if (isMounted && res.data?.name) {
          setUserName(res.data.name);
          localStorage.setItem("userName", res.data.name);
          if (res.data.email) localStorage.setItem("userEmail", res.data.email);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = userName || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

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
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

        {/* User Profile Button with User's Name Only */}
        <button
          onClick={() => navigate("/profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            padding: "3px 12px 3px 4px",
            borderRadius: "24px",
            cursor: "pointer",
            transition: "all 140ms ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#6366f1";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(99, 102, 241, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.03)";
          }}
          title={`Profile (${displayName})`}
        >
          {/* Avatar Circle with Initial & Active Dot */}
          <div
            style={{
              position: "relative",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0f172a 0%, #312e81 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11.5px",
              fontWeight: 800,
              boxShadow: "0 2px 6px rgba(79, 70, 229, 0.2)",
            }}
          >
            {userInitial}
            <span
              style={{
                position: "absolute",
                bottom: "-1px",
                right: "-1px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                border: "1.5px solid #ffffff",
              }}
            />
          </div>

          {/* User Name Only */}
          <span
            style={{
              fontSize: "12px",
              fontWeight: 750,
              color: "#0f172a",
              letterSpacing: "-0.01em",
              maxWidth: "130px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {displayName}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;