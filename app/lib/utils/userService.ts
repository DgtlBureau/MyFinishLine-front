import axios from "axios";

export const getCurrentUser = async () => {
  const { data } = await axios.get("/api/user/get-current-user");
  return data;
};

export const getUserRewards = async () => {
  const { data } = await axios.get("/api/user/rewards");
  return data;
};

export const getUserContracts = async () => {
  const { data } = await axios.get("/api/user/contracts");
  return data;
};

export const getUserCompletedContracts = async () => {
  const { data } = await axios.get("/api/user/completed-contracts");
  return data;
};

export const getUserActiveChallenge = async () => {
  const { data } = await axios.get("/api/user/active-challenge");
  return data;
};

export const getUserActivities = async () => {
  const { data } = await axios.get("/api/user/activities");
  return data;
};

export const getUserChallenges = async () => {
  const { data } = await axios.get("/api/user/challenges");
  return data;
};

export const updateUserStravaActivities = async () => {
  await axios.get("/api/user/refresh-activities");
};
