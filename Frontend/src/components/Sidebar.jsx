import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", {
        state: { message: "Logout Successful" },
      });
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      name: "Meetings",
      path: "/meetings",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 2v4M8 2v4M3 10h18" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
        </svg>
      ),
    },
    {
      name: "New Meeting",
      path: "/create-meeting",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid #edf2f7" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Brand Icon: Vibrant Indigo-Violet Gradient Squircle */}
          <div
            style={{
              width: "34px",
              height: "34px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.32)",
            }}
          >
            {/* Audio Wave Sound icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </div>

          <div style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="eyebrow" style={{ color: "#6366f1", fontWeight: 850, lineHeight: 1 }}>VOICE AI</span>
              <span
                style={{
                  fontSize: "8.5px",
                  fontWeight: 800,
                  padding: "1px 5px",
                  borderRadius: "6px",
                  background: "#eef2ff",
                  color: "#4f46e5",
                  border: "1px solid #c7d2fe",
                }}
              >
                v2.4
              </span>
            </div>
            <span
              style={{
                fontSize: "13.5px",
                fontWeight: 850,
                letterSpacing: "-0.4px",
                color: "#0f172a",
                display: "block",
                marginTop: "3px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Meeting Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ padding: "14px 10px", flex: 1 }}>
        <div className="eyebrow" style={{ padding: "0 10px 8px", color: "#94a3b8" }}>
          WORKSPACE
        </div>

        <nav className="sidebar-nav" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: "9px",
                  fontSize: "12px",
                  fontWeight: isActive ? 750 : 600,
                  color: isActive ? "#ffffff" : "#475569",
                  background: isActive ? "#0f172a" : "transparent",
                  textDecoration: "none",
                  transition: "all 140ms ease",
                  boxShadow: isActive ? "0 4px 12px rgba(15, 23, 42, 0.12)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#f1f5f9";
                    e.currentTarget.style.color = "#0f172a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#475569";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ color: isActive ? "#818cf8" : "#94a3b8", display: "flex" }}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>

                {isActive && (
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#818cf8",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer with Security Badge & Sign Out Button */}
      <div
        className="sidebar-footer"
        style={{
          padding: "14px 12px",
          borderTop: "1px solid #edf0f2",
          background: "#fafbfc",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Security Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "6px 8px",
            background: "#ffffff",
            borderRadius: "7px",
            border: "1px solid #e2e5e8",
          }}
        >
          <span className="status-dot-active"></span>
          <div>
            <span style={{ display: "block", fontSize: "7.5px", fontWeight: 800, color: "#75808c", letterSpacing: "0.1em" }}>
              SECURITY
            </span>
            <span style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#111111" }}>
              256-bit Encrypted
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "7px 10px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#b42318",
            background: "#fff1f1",
            border: "1px solid #ffd7d7",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 140ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ffe4e4";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff1f1";
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;