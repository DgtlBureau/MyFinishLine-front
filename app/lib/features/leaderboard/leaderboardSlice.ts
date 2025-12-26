import { ILeaderboard } from "@/app/types";
import { IUser } from "@/app/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserLeaderboard {
  position: number;
  user: IUser;
}

const initialState: {
  leaderboards: ILeaderboard[];
  current_user: IUserLeaderboard;
} = {
  leaderboards: [],
  current_user: {
    position: 0,
    user: {
      id: null,
      avatar_url: "",
      country: "",
      created_at: "",
      email: "",
      first_name: "",
      full_avatar_url: "",
      has_activated_code: false,
      last_name: "",
      phone: "",
      strava_id: null,
      total_activities_count: 0,
      total_distance: 0,
      total_moving_time_hours: 0,
      updated_at: "",
      username: "",
      has_strava_connect: false,
      avatar_symbol: "",
      avatar_color: "#fff",
    },
  },
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboard: (
      _,
      action: PayloadAction<{
        leaderboards: ILeaderboard[];
        current_user: IUserLeaderboard;
      }>
    ) => {
      return action.payload;
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
