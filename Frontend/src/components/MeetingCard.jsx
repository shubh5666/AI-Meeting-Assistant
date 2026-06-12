
import { Link } from "react-router-dom";

function MeetingCard({ meeting, onDelete }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

      <h3 className="text-xl font-semibold">
        {meeting.title}
      </h3>

      <p className="text-zinc-400 mt-2">
        {meeting.description}
      </p>

      <div className="flex justify-between items-center mt-4">

        <span className="text-sm text-zinc-500">
          {new Date(
            meeting.createdAt
          ).toLocaleDateString()}
        </span>

        <div className="flex gap-4">

          <Link
            to={`/meetings/${meeting._id}`}
            className="text-purple-400"
          >
            View →
          </Link>

          <button
            onClick={() =>
              onDelete(meeting._id)
            }
            className="text-red-500"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default MeetingCard;