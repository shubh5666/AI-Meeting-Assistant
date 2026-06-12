


import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-5 border-b border-zinc-800">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <button
        onClick={() => navigate("/create-meeting")}
        className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        + New Meeting
      </button>
    </div>
  );
}

export default Topbar;