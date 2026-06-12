

import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-meeting-assistant-4itu.onrender.com",
  withCredentials: true,
});

export default api;