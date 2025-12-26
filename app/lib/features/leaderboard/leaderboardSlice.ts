import { ILeaderboard } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { leaderboard: ILeaderboard[] } = {
  leaderboard: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<ILeaderboard[]>) => {
      state.leaderboard = action.payload;
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
