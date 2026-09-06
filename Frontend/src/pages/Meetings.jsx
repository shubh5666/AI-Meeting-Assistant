
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MeetingCard from "../components/MeetingCard";
import {
  getMeetings,
  deleteMeeting,
} from "../services/meetingService";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log(error);
      setMessage("Delete failed");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const filteredMeetings = meetings.filter((m) =>
    (m.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-shell flex">
      {/* Toast Notice */}
      {message && (
        <div className="toast-notice">
          <span className="status-dot-active"></span>
          <span>{message}</span>
        </div>
      )}

      <Sidebar />

      <div className="app-main">
        <Topbar title="All Meetings" subtitle="WORKSPACE / DIRECTORY" />

        <div className="app-container">
          {/* Header & Action Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div>
              <span className="eyebrow" style={{ display: "block", marginBottom: "3px" }}>
                MEETING ARCHIVE • {meetings.length} SESSIONS RECORDED
              </span>
              <h1 className="heading-h1" style={{ margin: 0 }}>
                All Meetings
              </h1>
            </div>

            <button
              onClick={() => navigate("/create-meeting")}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              + Create Meeting
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div
            className="card-standard"
            style={{
              padding: "12px 16px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a929a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search meetings by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "13px",
                color: "#111111",
                fontFamily: "inherit",
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "11px",
                  color: "#7b8490",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Grid of Meeting Cards */}
          {filteredMeetings.length === 0 ? (
            <div
              className="card-standard"
              style={{
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#f0f2f4",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7b8490",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              <h3 className="heading-h3" style={{ margin: "0 0 6px 0" }}>
                {searchTerm ? "No matching meetings found" : "No meetings logged yet"}
              </h3>
              <p style={{ fontSize: "12px", color: "#7b8490", margin: "0 0 16px 0" }}>
                {searchTerm
                  ? "Try searching with a different keyword or clear the search query."
                  : "Start logging your meetings to get automated transcripts and action items."}
              </p>

              {!searchTerm && (
                <button
                  onClick={() => navigate("/create-meeting")}
                  className="btn-primary"
                >
                  + Create Your First Meeting
                </button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                gap: "14px",
              }}
            >
              {filteredMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting._id}
                  meeting={meeting}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Meetings;