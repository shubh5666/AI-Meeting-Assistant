import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import CreateMeeting from "./pages/CreateMeeting";
import MeetingDetails from "./pages/MeetingDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route  path="/create-meeting" element={<CreateMeeting />} />
        <Route path="/meetings/:id" element={<MeetingDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;