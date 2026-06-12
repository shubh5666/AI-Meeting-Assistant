

import { useState } from "react";
import { createMeeting } from "../services/meetingService";
import { useNavigate } from "react-router-dom";

function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

 const handleCreateMeeting = async () => {
  try {
    await createMeeting({
      title,
      description,
    });

    setMessage("Meeting Created Successfully");

    setTimeout(() => {
      setMessage("");
      navigate("/dashboard");
    }, 1500);

  } catch (error) {
    console.log(error);

    setMessage("Meeting Creation Failed");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }
};

  return (
       <div className="min-h-screen bg-black text-white p-10">

    {message && (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        {message}
      </div>
    )}
      <h1 className="text-4xl font-bold mb-8">
        Create Meeting
      </h1>

      <div className="max-w-2xl">
        <input
          type="text"
          placeholder="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-5 p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <textarea
          placeholder="Meeting Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-40 p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

          <button
  onClick={handleCreateMeeting}
  className="mt-5 px-6 py-3 bg-purple-600 rounded-xl"
>
  Create Meeting
</button>
      </div>
    </div>
  );
}

export default CreateMeeting;