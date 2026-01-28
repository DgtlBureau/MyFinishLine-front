import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActiveChallenge } from "@/app/types";

export const initialState: IActiveChallenge = {
  id: 0,
  name: "",
  description: "",
  total_distance: "",
  total_distance_mile: 0,
  status: { id: null, name: "", type: "" },
  status_id: 0,
  steps: [],
  background_images: [],
  user_distance: 0,
  user_distance_mile: 0,
  activate_date: "",
  is_completed: false,
  completed_at: "",
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
      action: PayloadAction<Partial<IActiveChallenge>>,
    ) => {
      state = { ...state, ...action.payload };
    },
    setViewedStory: (state, action: PayloadAction<number>) => {
      state.steps = state.steps.map((step) => {
        if (step.id === action.payload) {
          return { ...step, is_viewed: true };
        } else {
          return step;
        }
      });
    },
    clearChallenge: () => {
      return initialState;
    },
  },
});

export const { setChallenge, updateChallenge, clearChallenge, setViewedStory } =
  challengeSlice.actions;
export default challengeSlice.reducer;
