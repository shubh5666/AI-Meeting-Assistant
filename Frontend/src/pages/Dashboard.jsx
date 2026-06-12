import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MeetingCard from "../components/MeetingCard";
import {
  getMeetings,
  deleteMeeting,
} from "../services/meetingService";

function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeeting(id);

      setMessage("Meeting Deleted Successfully");

      fetchMeetings();

      setTimeout(() => {
        setMessage("");
      }, 2000);

    } catch (error) {
      console.log(error);

      setMessage("Delete Failed");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      {message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            Recent Meetings
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {meetings.slice(0, 3).map((meeting) => (
              <MeetingCard
                key={meeting._id}
                meeting={meeting}
                onDelete={handleDelete}
              />
            ))}

          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;