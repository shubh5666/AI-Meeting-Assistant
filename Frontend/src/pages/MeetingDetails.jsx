import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {getMeetingById,uploadAudio,} from "../services/meetingService";

import { generateTranscript,generateSummary,generateActionItems,generateDecisions,generateFollowUps,} from "../services/aiService";

function MeetingDetails() {
  const { id } = useParams();

  const [meeting, setMeeting] = useState(null);
  const [audio, setAudio] = useState(null);
const [message, setMessage] = useState("");

  useEffect(() => {
  fetchMeeting();
}, []);

const fetchMeeting = async () => {
  try {
    const data = await getMeetingById(id);
    setMeeting(data);
  } catch (error) {
    console.log(error);
  }
};

  const handleUpload = async () => {
    try {
      await uploadAudio(id, audio);

      setMessage("Audio uploaded successfully");
      setTimeout(() => {
  setMessage("");
}, 2000);

      fetchMeeting();
    } catch (error) {
      console.log(error);
      setMessage("Upload Failed");
setTimeout(() => {
  setMessage("");
}, 2000);
    }
  };

  const handleTranscript = async () => {
    try {
      await generateTranscript(id);

      setMessage("Transcript Generated");
      
      setTimeout(() => {
  setMessage("");
}, 2000);

      fetchMeeting();
    } catch (error) {
      console.log(error);
      setMessage("Transcript Generation Failed");

setTimeout(() => {
  setMessage("");
}, 2000);
    }
  };

  const handleSummary = async () => {
  try {
    await generateSummary(id);

    setMessage("Summary Generated");
    setTimeout(() => {
  setMessage("");
}, 2000);

    fetchMeeting();
  } catch (error) {
    console.log(error);
   setMessage("Summary Generation Failed");

setTimeout(() => {
  setMessage("");
}, 2000);
  }
};

const handleActionItems = async () => {
  try {
    await generateActionItems(id);

    setMessage("Action Items Generated");
    setTimeout(() => {
  setMessage("");
}, 2000);

    fetchMeeting();
  } catch (error) {
    console.log(error);
    setMessage("Action Generation  Failed");

setTimeout(() => {
  setMessage("");
}, 2000);
  }
};

const handleDecisions = async () => {
  try {
    await generateDecisions(id);

    setMessage("Decisions Generated");
    setTimeout(() => {
  setMessage("");
}, 2000);

    fetchMeeting();
  } catch (error) {
    console.log(error);
    setMessage("Decision Generation Failed");

setTimeout(() => {
  setMessage("");
}, 2000);
  }
};

const handleFollowUps = async () => {
  try {
    await generateFollowUps(id);

    setMessage("Follow Ups Generated");
    setTimeout(() => {
  setMessage("");
}, 2000);

    fetchMeeting();
  } catch (error) {
    console.log(error);
   setMessage("Followups Failed");

setTimeout(() => {
  setMessage("");
}, 2000);
  }
};

  if (!meeting) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-black text-white p-8">

    {message && (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        {message}
      </div>
    )}     

      <h1 className="text-4xl font-bold mb-3">
        {meeting.title}
      </h1>

      <p className="text-zinc-400 mb-8">
        {meeting.description}
      </p>

      {/* Upload Audio */}

      <div className="bg-zinc-900 p-6 rounded-xl mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Upload Audio
        </h2>

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
          className="mb-4"
        />

        <br />

        <button
          onClick={handleUpload}
          className="bg-purple-600 px-5 py-3 rounded-lg"
        >
          Upload Audio
        </button>

      </div>

      {/* Transcript */}

      <div className="bg-zinc-900 p-6 rounded-xl mb-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold">
            Transcript
          </h2>

          <button
            onClick={handleTranscript}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            Generate Transcript
          </button>

        </div>

        <p>
          {meeting.transcript || "No transcript generated yet"}
        </p>

      </div>

      {/* Summary */}

     <div className="bg-zinc-900 p-6 rounded-xl mb-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-2xl font-bold">
      Summary
    </h2>

    <button
      onClick={handleSummary}
      className="bg-green-600 px-4 py-2 rounded-lg"
    >
      Generate Summary
    </button>

  </div>

  <p>
    {meeting.summary || "No summary generated yet"}
  </p>

</div>

      {/* Action Items */}

     <div className="bg-zinc-900 p-6 rounded-xl mb-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-2xl font-bold">
      Action Items
    </h2>

    <button
      onClick={handleActionItems}
      className="bg-yellow-600 px-4 py-2 rounded-lg"
    >
      Generate Action Items
    </button>

  </div>

  <ul>
    {meeting.actionItems?.map((item, index) => (
      <li key={index}>• {item}</li>
    ))}
  </ul>

</div>

      {/* Decisions */}

      <div className="bg-zinc-900 p-6 rounded-xl mb-6">

       <div className="flex justify-between items-center mb-4">

  <h2 className="text-2xl font-bold">
    Decisions
  </h2>

  <button
    onClick={handleDecisions}
    className="bg-red-600 px-4 py-2 rounded-lg"
  >
    Generate Decisions
  </button>

</div>

        <ul>
          {meeting.decisions?.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>

      </div>

      {/* Follow Ups */}

<div className="bg-zinc-900 p-6 rounded-xl">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-2xl font-bold">
      Follow Ups
    </h2>

    <button
      onClick={handleFollowUps}
      className="bg-purple-600 px-4 py-2 rounded-lg"
    >
      Generate Follow Ups
    </button>

  </div>

  <ul>
    {meeting.followUps?.map((item, index) => (
      <li key={index}>• {item}</li>
    ))}
  </ul>

</div>
</div>
  );
}

export default MeetingDetails;