import { IActiveChallenge, IContract } from "@/app/types";
import { IUser } from "@/app/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  user: IUser;
  contracts: IContract[];
  challenges: IActiveChallenge[];
  completedContracts: IContract[];
  personalization: {
    frame: { id: number; color: string } | null;
    banner: { id: number; color: string } | null;
    mascot: { id: number; image_src: string } | null;
  };
} = {
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
  contracts: [],
  challenges: [],
  completedContracts: [],
  personalization: {
    frame: null,
    banner: null,
    mascot: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUserContracts: (state, action: PayloadAction<IContract[]>) => {
      state.contracts = action.payload;
    },
    setUserCompletedContracts: (state, action: PayloadAction<IContract[]>) => {
      state.completedContracts = action.payload;
    },
    setUserChallenges: (state, action: PayloadAction<IActiveChallenge[]>) => {
      state.challenges = action.payload;
    },
    updatePersonalization: (
      state,
      action: PayloadAction<{
        frame: { id: number; color: string } | null;
        banner: { id: number; color: string } | null;
        mascot: { id: number; image_src: string } | null;
      }>
    ) => {
      state.personalization = action.payload;
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const {
  setUser,
  updateUser,
  setUserContracts,
  setUserCompletedContracts,
  updatePersonalization,
  setUserChallenges,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
