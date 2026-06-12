

import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl">
        <p><strong>Name:</strong> {user.name}</p>
        <p className="mt-3">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}

export default Profile;