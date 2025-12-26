import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActiveChallenge } from "@/app/types";

const initialState: IActiveChallenge = {
  id: 0,
  name: "",
  description: "",
  total_distance: "",
  status: { id: null, name: "", type: "" },
  status_id: 0,
  steps: [],
  background_images: [],
  user_distance: 0,
  activate_date: "",
  is_completed: false,
};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    setChallenge: (_, action: PayloadAction<IActiveChallenge>) => {
      return action.payload;
    },
    updateChallenge: (
      state,
      action: PayloadAction<Partial<IActiveChallenge>>
    ) => {
      state = { ...state, ...action.payload };
    },
    clearChallenge: () => {
      return initialState;
    },
  },
});

export const { setChallenge, updateChallenge, clearChallenge } =
  challengeSlice.actions;
export default challengeSlice.reducer;
