import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await logoutUser();

    navigate("/login", {
      state: {
        message: "Logout Successful",
      },
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 p-5 min-h-screen">

      <h1 className="text-3xl font-bold text-purple-500 mb-10">
       AI Meeting Assistant
      </h1>

      <ul className="space-y-5">

        <li>
          <Link
            to="/dashboard"
            className="hover:text-purple-400"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/meetings"
            className="hover:text-purple-400"
          >
            Meetings
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="hover:text-purple-400"
          >
            Profile
          </Link>
        </li>

      </ul>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;