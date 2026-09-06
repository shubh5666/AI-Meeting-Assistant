
import { Link } from "react-router-dom";

function MeetingCard({ meeting, onDelete }) {
  const formattedDate = meeting.createdAt
    ? new Date(meeting.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <div
      className="card-standard"
      style={{
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "180px",
        transition: "transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.borderColor = "#d9dde1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 5px 16px rgba(0, 0, 0, 0.02)";
        e.currentTarget.style.borderColor = "#e0e3e6";
      }}
    >
      <div>
        {/* Eyebrow & Status Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <span className="eyebrow" style={{ color: "#8a929a" }}>
            SESSION #{meeting._id ? meeting._id.slice(-4).toUpperCase() : "SYNC"}
          </span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 8px",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: 700,
              color: "#059669",
              background: "#ecfdf5",
              border: "1px solid #ccefe0",
            }}
          >
            <span className="status-dot-active" style={{ width: "5px", height: "5px" }}></span>
            Active
          </span>
        </div>

        {/* Title */}
        <h3
          className="heading-h3"
          style={{
            margin: "0 0 8px 0",
            fontSize: "15px",
            lineHeight: 1.3,
            color: "#111111",
          }}
        >
          {meeting.title || "Untitled Session"}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "12px",
            color: "#68727d",
            margin: 0,
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {meeting.description || "No description provided for this session."}
        </p>
      </div>

      {/* Footer Meta & Actions */}
      <div
        style={{
          marginTop: "16px",
          paddingTop: "12px",
          borderTop: "1px solid #edf0f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#8a929a",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          {formattedDate}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            to={`/meetings/${meeting._id}`}
            className="btn-secondary"
            style={{ textDecoration: "none", fontSize: "10.5px" }}
          >
            Open →
          </Link>

          <button
            onClick={() => onDelete(meeting._id)}
            style={{
              background: "transparent",
              border: "1px solid transparent",
              color: "#b42318",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "10.5px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 140ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff1f1";
              e.currentTarget.style.borderColor = "#ffd7d7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetingCard;