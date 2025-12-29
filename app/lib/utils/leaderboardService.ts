import axios from "axios";

export const getLeaderboard = async (challengeId: number) => {
  const { data } = await axios.get(
    "/api/leaderboard/get-users?challenge_id=" + challengeId
  );
  return data;
};
