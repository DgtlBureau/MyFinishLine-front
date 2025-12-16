import { IUser } from "@/app/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
  avatar_url: null,
  country: null,
  created_at: "",
  email: "",
  first_name: "",
  full_avatar_url: null,
  has_activated_code: false,
  id: 0,
  last_name: null,
  phone: null,
  strava_id: null,
  total_activities_count: 0,
  total_distance: 0,
  total_moving_time_hours: 0,
  updated_at: "",
  username: "",
  has_strava_connect: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
