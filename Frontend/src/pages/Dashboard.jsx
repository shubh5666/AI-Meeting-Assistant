import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {
  getMeetings,
  deleteMeeting,
} from "../services/meetingService";

function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const data = await getMeetings();
      setMeetings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setMeetings([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeeting(id);
      setMessage("Meeting deleted successfully");
      fetchMeetings();
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage("Delete failed");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="app-shell flex">
      {/* Toast Notice */}
      {message && (
        <div className="toast-notice">
          <span className="status-dot-active"></span>
          <span>{message}</span>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="app-main">
        <Topbar title="Meeting Intelligence" subtitle="WORKSPACE / OVERVIEW" />

        <div className="app-container">
          {/* Dashboard Two-Column Grid */}
          <div className="dashboard-grid">
            {/* Left Primary Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Hero Assistant Card */}
              <div
                className="card-hero"
                style={{
                  padding: "26px 28px",
                  minHeight: "184px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {/* Audio waveform animated bars */}
                      <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "14px" }}>
                        <span className="sound-bar" style={{ animationDelay: "0s" }}></span>
                        <span className="sound-bar" style={{ animationDelay: "0.2s" }}></span>
                        <span className="sound-bar" style={{ animationDelay: "0.4s" }}></span>
                        <span className="sound-bar" style={{ animationDelay: "0.1s" }}></span>
                      </div>
                      <span className="eyebrow-dark" style={{ color: "#a5b4fc" }}>
                        VOICE INTELLIGENCE ENGINE • ACTIVE
                      </span>
                    </div>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "3px 10px",
                        borderRadius: "12px",
                        fontSize: "9.5px",
                        fontWeight: 750,
                        background: "rgba(99, 102, 241, 0.15)",
                        border: "1px solid rgba(129, 140, 248, 0.3)",
                        color: "#c7d2fe",
                      }}
                    >
                      <span className="status-dot-active" style={{ width: "5px", height: "5px" }}></span>
                      Whisper v3 Turbo + GPT-4o
                    </span>
                  </div>

                  <h1
                    style={{
                      fontSize: "25px",
                      fontWeight: 850,
                      letterSpacing: "-1.1px",
                      lineHeight: 1.2,
                      color: "#ffffff",
                      margin: "0 0 8px 0",
                    }}
                  >
                    Intelligent Meeting Assistant
                  </h1>

                  <p
                    style={{
                      fontSize: "12.5px",
                      color: "#94a3b8",
                      margin: 0,
                      maxWidth: "550px",
                      lineHeight: 1.55,
                    }}
                  >
                    High-accuracy speech-to-text, real-time summaries, actionable decision logs, and follow-ups powered by advanced audio models.
                  </p>
                </div>

                {/* Hero Actions */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "22px" }}>
                  <button
                    onClick={() => navigate("/create-meeting")}
                    style={{
                      background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                      color: "#0f172a",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "8px 16px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      transition: "transform 140ms ease, box-shadow 140ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 6px 18px rgba(99, 102, 241, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Meeting
                  </button>

                  <button
                    onClick={() => navigate("/meetings")}
                    className="btn-dark-secondary"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    Browse Meeting Archive
                  </button>
                </div>
              </div>

              {/* Stat Cards Grid (2-Column Grid) */}
              <div className="stat-cards-grid">
                {/* Total Meetings */}
                <div className="card-standard" style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span className="eyebrow" style={{ color: "#64748b" }}>TOTAL SESSIONS</span>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "#eef2ff",
                        color: "#4f46e5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(79, 70, 229, 0.12)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="22" />
                      </svg>
                    </div>
                  </div>
                  <div className="metric-number">{meetings.length}</div>
                  <span style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", display: "block" }}>
                    Audio logs transcribed
                  </span>
                </div>

                {/* AI Intelligence Status */}
                <div className="card-standard" style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span className="eyebrow" style={{ color: "#64748b" }}>AI ACCURACY</span>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "#ecfdf5",
                        color: "#059669",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.12)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="metric-number" style={{ color: "#059669" }}>99.4%</div>
                  <span style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", display: "block" }}>
                    Word Error Rate (WER) minimal
                  </span>
                </div>
              </div>

              {/* Recent Meetings Card & List Rows */}
              <div className="card-standard" style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #edf0f2",
                  }}
                >
                  <div>
                    <span className="eyebrow">SESSION DIRECTORY</span>
                    <h2 className="heading-h2" style={{ margin: "2px 0 0 0" }}>
                      Recent Meetings
                    </h2>
                  </div>

                  <Link
                    to="/meetings"
                    className="btn-secondary"
                    style={{ textDecoration: "none", fontSize: "10.5px" }}
                  >
                    View All ({meetings.length})
                  </Link>
                </div>

                {/* Meetings List Rows */}
                {meetings.length === 0 ? (
                  <div style={{ padding: "40px 20px", textAlign: "center" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "#f0f2f4",
                        margin: "0 auto 12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7b8490",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <h3 className="heading-h3" style={{ margin: "0 0 4px 0" }}>No meetings recorded yet</h3>
                    <p style={{ fontSize: "12px", color: "#7b8490", margin: "0 0 16px 0" }}>
                      Create your first meeting to upload audio and generate AI summaries.
                    </p>
                    <button
                      onClick={() => navigate("/create-meeting")}
                      className="btn-primary"
                      style={{ minHeight: "36px" }}
                    >
                      + Create First Meeting
                    </button>
                  </div>
                ) : (
                  <div>
                    {meetings.slice(0, 5).map((meeting) => (
                      <div key={meeting._id} className="list-row" style={{ justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                          <div
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              background: "#f5f6f7",
                              border: "1px solid #e0e3e6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#111111",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                              <line x1="12" y1="19" x2="12" y2="22" />
                            </svg>
                          </div>

                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <h4
                                style={{
                                  margin: 0,
                                  fontSize: "13px",
                                  fontWeight: 750,
                                  color: "#111111",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {meeting.title}
                              </h4>
                              <span
                                style={{
                                  fontSize: "9px",
                                  fontWeight: 700,
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  background: "#ecfdf5",
                                  color: "#059669",
                                  border: "1px solid #ccefe0",
                                }}
                              >
                                SYNCED
                              </span>
                            </div>
                            <p
                              style={{
                                margin: "2px 0 0 0",
                                fontSize: "11.5px",
                                color: "#7b8490",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {meeting.description || "Audio transcription & AI insights ready"}
                            </p>
                          </div>
                        </div>

                        {/* Row Actions */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                          <span style={{ fontSize: "11px", color: "#8a929a" }}>
                            {meeting.createdAt
                              ? new Date(meeting.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                              : "Recent"}
                          </span>

                          <Link
                            to={`/meetings/${meeting._id}`}
                            className="btn-secondary"
                            style={{ textDecoration: "none", fontSize: "10px", padding: "4px 10px", minHeight: "28px" }}
                          >
                            Open →
                          </Link>

                          <button
                            onClick={() => handleDelete(meeting._id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#b42318",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                              padding: "4px 8px",
                              borderRadius: "6px",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff1f1")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Column (Fixed 222px) */}
            <div className="side-column-cards">
              {/* Quick Actions Card */}
              <div className="card-standard" style={{ padding: "18px" }}>
                <span className="eyebrow" style={{ display: "block", marginBottom: "4px" }}>
                  QUICK LAUNCH
                </span>
                <h3 className="heading-h3" style={{ margin: "0 0 14px 0" }}>
                  Shortcuts
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button
                    onClick={() => navigate("/create-meeting")}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "flex-start", padding: "0 12px", minHeight: "38px" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Meeting
                  </button>

                  <button
                    onClick={() => navigate("/meetings")}
                    className="btn-secondary"
                    style={{ width: "100%", justifyContent: "flex-start", padding: "0 12px", minHeight: "36px" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    All Meetings
                  </button>

                  <button
                    onClick={() => navigate("/profile")}
                    className="btn-secondary"
                    style={{ width: "100%", justifyContent: "flex-start", padding: "0 12px", minHeight: "36px" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Settings & Profile
                  </button>
                </div>
              </div>

              {/* AI Engine Status Card */}
              <div className="card-standard" style={{ padding: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span className="eyebrow" style={{ color: "#6366f1" }}>AUDIO ENGINE</span>
                  <span className="status-dot-active"></span>
                </div>

                <h3 className="heading-h3" style={{ margin: "0 0 10px 0" }}>
                  Whisper & LLM Core
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11.5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                    <span>Speech-to-Text</span>
                    <span style={{ color: "#4f46e5", fontWeight: 700 }}>Whisper v3 Turbo</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                    <span>Synthesis LLM</span>
                    <span style={{ color: "#0f172a", fontWeight: 700 }}>GPT-4o Mini</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                    <span>Stream Latency</span>
                    <span style={{ color: "#059669", fontWeight: 700 }}>~850ms</span>
                  </div>
                </div>
              </div>

              {/* Security & Cloud Sync Card */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid var(--border-default)",
                  borderRadius: "13px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "7px",
                      background: "#eef2ff",
                      color: "#4f46e5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "11.5px", fontWeight: 750, color: "#0f172a" }}>
                    Audio Privacy Guard
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "11px", color: "#64748b", lineHeight: 1.45 }}>
                  Audio waveforms and generated notes are zero-retention encrypted and strictly locked to your workspace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;