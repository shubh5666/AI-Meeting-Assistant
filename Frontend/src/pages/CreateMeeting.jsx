

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMeeting } from "../services/meetingService";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateMeeting = async (e) => {
    if (e) e.preventDefault();
    if (!title) {
      setMessage("Please enter a meeting title");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      setLoading(true);
      await createMeeting({
        title,
        description,
      });

      setMessage("Meeting Created Successfully");

      setTimeout(() => {
        setMessage("");
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.log(error);
      setMessage("Meeting creation failed");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

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
        <Topbar title="Create Meeting" subtitle="WORKSPACE / NEW RECORDING" />

        <div className="app-container">
          <div style={{ maxWidth: "640px" }}>
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: "3px" }}>
                SESSION INITIALIZER
              </span>
              <h1 className="heading-h1" style={{ margin: "0 0 6px 0" }}>
                Create New Meeting
              </h1>
              <p style={{ fontSize: "13px", color: "#7b8490", margin: 0 }}>
                Set up a new session to upload audio recordings, generate transcripts, and extract AI action items.
              </p>
            </div>

            {/* Form Card */}
            <div className="card-standard" style={{ padding: "30px 32px" }}>
              <form onSubmit={handleCreateMeeting}>
                {/* Meeting Title */}
                <div style={{ marginBottom: "20px" }}>
                  <label className="form-label">
                    Meeting Title <span style={{ color: "#b42318" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Q3 Product Architecture Review"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-standard"
                    required
                  />
                  <span style={{ fontSize: "11px", color: "#8a929a", marginTop: "4px", display: "block" }}>
                    Give your session a concise, recognizable title.
                  </span>
                </div>

                {/* Meeting Description */}
                <div style={{ marginBottom: "26px" }}>
                  <label className="form-label">
                    Meeting Description & Agenda
                  </label>
                  <textarea
                    placeholder="Provide context, key discussion topics, or participants..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "9px",
                      border: "1px solid var(--border-strong)",
                      fontSize: "13px",
                      color: "#111111",
                      fontFamily: "inherit",
                      resize: "vertical",
                      outline: "none",
                      transition: "border-color 150ms ease, box-shadow 150ms ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#111111";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.05)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-strong)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Form Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ minHeight: "42px", padding: "0 20px" }}
                  >
                    {loading ? "Creating..." : "Create Meeting"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="btn-secondary"
                    style={{ minHeight: "42px", padding: "0 18px", fontSize: "11.5px" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMeeting;