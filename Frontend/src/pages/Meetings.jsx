
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MeetingCard from "../components/MeetingCard";
import {
  getMeetings,
  deleteMeeting,
} from "../services/meetingService";

function Meetings() {
  const [meetings, setMeetings] = useState([]);

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

      fetchMeetings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            All Meetings
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {meetings.map((meeting) => (
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

export default Meetings;