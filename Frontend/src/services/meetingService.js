

import api from "./api";

export const getMeetings = async () => {
  const response = await api.get("/meetings");
  return response.data;
};

export const createMeeting = async (meetingData) => {
  const response = await api.post("/meetings", meetingData);
  return response.data;
};

export const getMeetingById = async (id) => {
  const response = await api.get(`/meetings/${id}`);
  return response.data;
};

export const uploadAudio = async (id, file) => {
  const formData = new FormData();

  formData.append("audio", file);

  const response = await api.post(
    `/meetings/${id}/upload`,
    formData
  );

  return response.data;
};
export const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const deleteMeeting = async (id) => {
  const response = await api.delete(
    `/meetings/${id}`
  );

  return response.data;
};
