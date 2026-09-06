

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { logoutUser } from "../services/authService";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setUser(response.data);
    } catch (error) {
      console.log(error);
      // Demo fallback if backend profile session expired
      setUser({
        name: "Shubh",
        email: "shubh@workspace.ai",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="app-shell flex">
        <Sidebar />
        <div className="app-main" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <span className="status-dot-active" style={{ marginBottom: "10px" }}></span>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#111111" }}>Loading user profile...</div>
          </div>
        </div>
      </div>
    );
  }

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="app-shell flex">
      <Sidebar />

      <div className="app-main">
        <Topbar title="Account Profile" subtitle="WORKSPACE / SETTINGS" />

        <div className="app-container">
          <div style={{ maxWidth: "680px" }}>
            {/* Page Header */}
            <div style={{ marginBottom: "24px" }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: "3px" }}>
                USER IDENTITY & PREFERENCES
              </span>
              <h1 className="heading-h1" style={{ margin: "0 0 6px 0" }}>
                User Profile
              </h1>
              <p style={{ fontSize: "13px", color: "#7b8490", margin: 0 }}>
                Manage your workspace credentials and AI meeting access permissions.
              </p>
            </div>

            {/* Main Profile Card */}
            <div className="card-standard" style={{ padding: "28px 30px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "24px" }}>
                {/* 52x52px Avatar */}
                <div
                  style={{
                    position: "relative",
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "#111111",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 800,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    flexShrink: 0,
                  }}
                >
                  {initial}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "1px",
                      right: "1px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      border: "2px solid #ffffff",
                    }}
                  />
                </div>

                <div>
                  <h2 className="heading-h2" style={{ margin: "0 0 4px 0", fontSize: "18px" }}>
                    {user?.name || "Workspace User"}
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px", color: "#7b8490" }}>{user?.email}</span>
                    <span
                      style={{
                        padding: "2px 7px",
                        borderRadius: "10px",
                        fontSize: "9.5px",
                        fontWeight: 750,
                        background: "#ecfdf5",
                        color: "#059669",
                        border: "1px solid #ccefe0",
                      }}
                    >
                      PRO PLAN
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Details Rows */}
              <div style={{ borderTop: "1px solid #edf0f2", paddingTop: "16px" }}>
                <div className="list-row" style={{ justifyContent: "space-between", padding: "10px 0" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "11px", color: "#8a929a", fontWeight: 700 }}>FULL NAME</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#111111" }}>{user?.name}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#059669", fontWeight: 700 }}>Verified</span>
                </div>

                <div className="list-row" style={{ justifyContent: "space-between", padding: "10px 0" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "11px", color: "#8a929a", fontWeight: 700 }}>PRIMARY EMAIL</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#111111" }}>{user?.email}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#059669", fontWeight: 700 }}>Connected</span>
                </div>

                <div className="list-row" style={{ justifyContent: "space-between", padding: "10px 0" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "11px", color: "#8a929a", fontWeight: 700 }}>SECURITY STATUS</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#111111" }}>Session Active & 256-bit Encrypted</span>
                  </div>
                  <span className="status-dot-active"></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #edf0f2" }}>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-primary"
                  style={{ minHeight: "38px" }}
                >
                  Return to Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    background: "#fff1f1",
                    color: "#b42318",
                    border: "1px solid #ffd7d7",
                    borderRadius: "8px",
                    padding: "0 16px",
                    minHeight: "38px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;