import api from "./api";

export const generateTranscript = async (id) => {
  const response = await api.post(
    `/meetings/${id}/transcribe`
  );

  return response.data;
};

export const generateSummary = async (id) => {
  const response = await api.post(
    `/meetings/${id}/summary`
  );

  return response.data;
};

export const generateActionItems = async (id) => {
  const response = await api.post(
    `/meetings/${id}/action-items`
  );

  return response.data;
};

export const generateDecisions = async (id) => {
  const response = await api.post(
    `/meetings/${id}/decisions`
  );

  return response.data;
};

export const generateFollowUps = async (id) => {
  const response = await api.post(
    `/meetings/${id}/follow-ups`
  );

  return response.data;
};

