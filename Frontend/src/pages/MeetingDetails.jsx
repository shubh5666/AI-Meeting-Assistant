import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {
  getMeetingById,
  uploadAudio,
} from "../services/meetingService";
import {
  generateTranscript,
  generateSummary,
  generateActionItems,
  generateDecisions,
  generateFollowUps,
} from "../services/aiService";

function MeetingDetails() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    fetchMeeting();
  }, [id]);

  const fetchMeeting = async () => {
    try {
      const data = await getMeetingById(id);
      setMeeting(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleUpload = async () => {
    if (!audio) {
      showToast("Please select an audio file first");
      return;
    }
    try {
      setActionLoading("upload");
      await uploadAudio(id, audio);
      showToast("Audio uploaded successfully");
      setAudio(null);
      fetchMeeting();
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "Upload failed");
      showToast(errMsg);
    } finally {
      setActionLoading("");
    }
  };

  const handleTranscript = async () => {
    try {
      setActionLoading("transcript");
      await generateTranscript(id);
      showToast("Transcript generated successfully");
      fetchMeeting();
    } catch (error) {
      console.log(error);
      showToast("Transcript generation failed");
    } finally {
      setActionLoading("");
    }
  };

  const handleSummary = async () => {
    try {
      setActionLoading("summary");
      await generateSummary(id);
      showToast("Summary generated successfully");
      fetchMeeting();
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "Summary generation failed");
      showToast(errMsg);
    } finally {
      setActionLoading("");
    }
  };

  const handleActionItems = async () => {
    try {
      setActionLoading("actionItems");
      await generateActionItems(id);
      showToast("Action items generated successfully");
      fetchMeeting();
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "Action items generation failed");
      showToast(errMsg);
    } finally {
      setActionLoading("");
    }
  };

  const handleDecisions = async () => {
    try {
      setActionLoading("decisions");
      await generateDecisions(id);
      showToast("Decisions generated successfully");
      fetchMeeting();
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "Decision extraction failed");
      showToast(errMsg);
    } finally {
      setActionLoading("");
    }
  };

  const handleFollowUps = async () => {
    try {
      setActionLoading("followUps");
      await generateFollowUps(id);
      showToast("Follow-ups generated successfully");
      fetchMeeting();
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "Follow-up generation failed");
      showToast(errMsg);
    } finally {
      setActionLoading("");
    }
  };

  if (!meeting) {
    return (
      <div className="app-shell flex">
        <Sidebar />
        <div className="app-main" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <span className="status-dot-active" style={{ marginBottom: "12px" }}></span>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#111111" }}>Loading meeting session...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell flex">
      {message && (
        <div className="toast-notice">
          <span className="status-dot-active"></span>
          <span>{message}</span>
        </div>
      )}

      <Sidebar />

      <div className="app-main">
        <Topbar title="Meeting Details" subtitle="SESSION DEEP-DIVE" />

        <div className="app-container">
          {/* Back Navigation Breadcrumb */}
          <div style={{ marginBottom: "18px" }}>
            <Link
              to="/meetings"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#7b8490",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              ← Back to Meetings
            </Link>
          </div>

          {/* Session Overview Card */}
          <div className="card-standard" style={{ padding: "24px 26px", marginBottom: "18px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ maxWidth: "700px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span className="eyebrow">
                    SESSION ID #{meeting._id ? meeting._id.slice(-6).toUpperCase() : "SYNC"}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#059669",
                      background: "#ecfdf5",
                      border: "1px solid #ccefe0",
                    }}
                  >
                    <span className="status-dot-active" style={{ width: "5px", height: "5px" }}></span>
                    Active Workspace
                  </span>
                </div>

                <h1 className="heading-h1" style={{ margin: "0 0 8px 0", fontSize: "24px" }}>
                  {meeting.title}
                </h1>

                <p style={{ fontSize: "13px", color: "#68727d", margin: 0, lineHeight: 1.5 }}>
                  {meeting.description || "No specific meeting description provided."}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "#8a929a", display: "block" }}>Created On</span>
                <span style={{ fontSize: "12px", fontWeight: 750, color: "#111111" }}>
                  {meeting.createdAt
                    ? new Date(meeting.createdAt).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recent"}
                </span>
              </div>
            </div>
          </div>

          {/* Two-Column Detail Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "16px" }}>
            {/* Left Column: Audio & Transcript */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Audio Upload Card */}
              <div className="card-standard" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div>
                    <span className="eyebrow">INPUT SOURCE</span>
                    <h2 className="heading-h2" style={{ margin: "2px 0 0 0" }}>
                      Audio Recording
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#f0f2f4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#111111",
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                  </div>
                </div>

                {meeting.audioFile && (
                  <div
                    style={{
                      background: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span className="status-dot-active" style={{ width: "6px", height: "6px" }}></span>
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#059669" }}>
                      Audio File Attached ({meeting.audioFile.split(/[\/\\]/).pop()})
                    </span>
                  </div>
                )}

                <div
                  onClick={() => document.getElementById("audio-upload-input")?.click()}
                  style={{
                    border: "1px dashed #cbd5e1",
                    borderRadius: "10px",
                    padding: "18px 14px",
                    textAlign: "center",
                    background: audio ? "#f0fdf4" : "#f8fafc",
                    marginBottom: "14px",
                    cursor: "pointer",
                    transition: "all 140ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
                >
                  <input
                    type="file"
                    accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
                    id="audio-upload-input"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAudio(e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={audio ? "#059669" : "#6366f1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>

                    <span style={{ fontSize: "12px", fontWeight: 750, color: "#0f172a" }}>
                      {audio ? audio.name : "Click to select or change audio file"}
                    </span>

                    <span style={{ fontSize: "11px", color: "#64748b" }}>
                      {audio
                        ? `${(audio.size / (1024 * 1024)).toFixed(2)} MB ready to upload`
                        : "Supports MP3, WAV, M4A, AAC, OGG up to 100MB"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={actionLoading === "upload" || !audio}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    opacity: !audio && actionLoading !== "upload" ? 0.65 : 1,
                  }}
                >
                  {actionLoading === "upload" ? "Uploading audio..." : "Upload Audio File"}
                </button>
              </div>

              {/* Transcript Card */}
              <div className="card-standard" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div>
                    <span className="eyebrow">AUTOMATED SPEECH RECOGNITION</span>
                    <h2 className="heading-h2" style={{ margin: "2px 0 0 0" }}>
                      Transcript
                    </h2>
                  </div>

                  <button
                    onClick={handleTranscript}
                    disabled={actionLoading === "transcript"}
                    className="btn-secondary"
                  >
                    {actionLoading === "transcript" ? "Generating..." : "Generate Transcript"}
                  </button>
                </div>

                <div
                  style={{
                    background: "#fafbfc",
                    border: "1px solid #edf0f2",
                    borderRadius: "9px",
                    padding: "14px",
                    minHeight: "130px",
                    maxHeight: "340px",
                    overflowY: "auto",
                    fontSize: "12.5px",
                    lineHeight: 1.55,
                    color: meeting.transcript ? "#24292e" : "#8a929a",
                  }}
                >
                  {meeting.transcript || "No transcript generated yet. Upload audio and click 'Generate Transcript'."}
                </div>
              </div>

              {/* Summary Card */}
              <div className="card-standard" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div>
                    <span className="eyebrow">AI SYNTHESIS</span>
                    <h2 className="heading-h2" style={{ margin: "2px 0 0 0" }}>
                      Executive Summary
                    </h2>
                  </div>

                  <button
                    onClick={handleSummary}
                    disabled={actionLoading === "summary"}
                    className="btn-secondary"
                  >
                    {actionLoading === "summary" ? "Generating..." : "Generate Summary"}
                  </button>
                </div>

                <div
                  style={{
                    background: "#fafbfc",
                    border: "1px solid #edf0f2",
                    borderRadius: "9px",
                    padding: "14px",
                    minHeight: "100px",
                    fontSize: "12.5px",
                    lineHeight: 1.55,
                    color: meeting.summary ? "#24292e" : "#8a929a",
                  }}
                >
                  {meeting.summary || "No summary generated yet. Click 'Generate Summary' once transcript is ready."}
                </div>
              </div>
            </div>

            {/* Right Column: Action Items, Decisions, Follow-Ups */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Action Items Card */}
              <div className="card-standard" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div>
                    <span className="eyebrow">EXECUTION PLAN</span>
                    <h2 className="heading-h2" style={{ margin: "2px 0 0 0" }}>
                      Action Items
                    </h2>
                  </div>

                  <button
                    onClick={handleActionItems}
                    disabled={actionLoading === "actionItems"}
                    className="btn-secondary"
                  >
                    {actionLoading === "actionItems" ? "Extracting..." : "Extract Actions"}
                  </button>
                </div>

                <div
                  style={{
                    background: "#fafbfc",
                    border: "1px solid #edf0f2",
                    borderRadius: "9px",
                    padding: "14px",
                    minHeight: "110px",
                  }}
                >
                  {meeting.actionItems && meeting.actionItems.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {meeting.actionItems.map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12.5px" }}>
                          <span
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "4px",
                              background: "#ecfdf5",
                              border: "1px solid #ccefe0",
                              color: "#059669",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "10px",
                              fontWeight: 800,
                              flexShrink: 0,
                              marginTop: "2px",
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ color: "#24292e" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span style={{ fontSize: "12px", color: "#8a929a" }}>
                      No action items extracted yet.
                    </span>
                  )}
                </div>
              </div>

              {/* Decisions Card */}
              <div className="card-standard" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div>
                    <span className="eyebrow">STRATEGIC ALIGNMENT</span>
                    <h2 className="heading-h2" style={{ margin: "2px 0 0 0" }}>
                      Key Decisions
                    </h2>
                  </div>

                  <button
                    onClick={handleDecisions}
                    disabled={actionLoading === "decisions"}
                    className="btn-secondary"
                  >
                    {actionLoading === "decisions" ? "Extracting..." : "Log Decisions"}
                  </button>
                </div>

                <div
                  style={{
                    background: "#fafbfc",
                    border: "1px solid #edf0f2",
                    borderRadius: "9px",
                    padding: "14px",
                    minHeight: "100px",
                  }}
                >
                  {meeting.decisions && meeting.decisions.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {meeting.decisions.map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12.5px" }}>
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              background: "#111111",
                              marginTop: "6px",
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ color: "#24292e" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span style={{ fontSize: "12px", color: "#8a929a" }}>
                      No strategic decisions recorded yet.
                    </span>
                  )}
                </div>
              </div>

              {/* Follow Ups Card */}
              <div className="card-standard" style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div>
                    <span className="eyebrow">NEXT STEPS</span>
                    <h2 className="heading-h2" style={{ margin: "2px 0 0 0" }}>
                      Follow-Ups & Schedules
                    </h2>
                  </div>

                  <button
                    onClick={handleFollowUps}
                    disabled={actionLoading === "followUps"}
                    className="btn-secondary"
                  >
                    {actionLoading === "followUps" ? "Extracting..." : "Extract Follow-Ups"}
                  </button>
                </div>

                <div
                  style={{
                    background: "#fafbfc",
                    border: "1px solid #edf0f2",
                    borderRadius: "9px",
                    padding: "14px",
                    minHeight: "100px",
                  }}
                >
                  {meeting.followUps && meeting.followUps.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {meeting.followUps.map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12.5px" }}>
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              background: "#059669",
                              marginTop: "6px",
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ color: "#24292e" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span style={{ fontSize: "12px", color: "#8a929a" }}>
                      No follow-up items scheduled yet.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingDetails;