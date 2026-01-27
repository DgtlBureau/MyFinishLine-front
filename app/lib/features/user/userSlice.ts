import { IActiveChallenge, IContract, IWheelOption } from "@/app/types";
import { IUser } from "@/app/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  user: IUser;
  contracts: IContract[];
  challenges: IActiveChallenge[];
  completedContracts: IContract[];
  personalization: {
    frame: { id: number; image_url: string } | null;
    banner: { id: number; image_url: string } | null;
    mascot: { id: number; image_url: string } | null;
  };
} = {
  user: {
    available_onboarding: false,
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
    has_fitbit_connect: false,
    has_strava_connect: false,
    avatar_symbol: "",
    avatar_color: "#fff",
    sex: "Prefer not to say",
    birth_date: {
      year: 0,
      month: 0,
      day: 0,
    },
    measure: "km",
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
    updateUserSex: (state, action: PayloadAction<string>) => {
      state.user.sex = action.payload;
    },
    updatePersonalization: (
      state,
      action: PayloadAction<{
        frame: { id: number; image_url: string } | null;
        banner: { id: number; image_url: string } | null;
        mascot: { id: number; image_url: string } | null;
      }>,
    ) => {
      state.personalization = action.payload;
    },
    setDistanceUnit: (state, action: PayloadAction<"km" | "mile">) => {
      state.user.measure = action.payload;
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
  updateUserSex,
  setUserChallenges,
  setDistanceUnit,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
