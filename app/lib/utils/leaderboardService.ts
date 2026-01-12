import axios from "axios";

export const getLeaderboard = async (challengeId?: number) => {
  const url =
    challengeId === 0
      ? "/api/leaderboard/overal-leaderboard"
      : "/api/leaderboard/get-users";
  const { data } = await axios.get(url, {
    params: challengeId === 0 ? "" : { challenge_id: challengeId },
  });
  return data;
};
