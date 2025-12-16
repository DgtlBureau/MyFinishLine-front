import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActivity } from "@/app/types";

const initialState: { activities: IActivity[]; isLoaded: boolean } = {
  isLoaded: false,
  activities: [],
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (_, action: PayloadAction<IActivity[]>) => {
      return { activities: action.payload, isLoaded: true };
    },
    updateActivities: (state, action: PayloadAction<IActivity>) => {
      return {
        isLoaded: true,
        activities: [action.payload, ...state.activities],
      };
    },
    clearActivities: () => {
      return initialState;
    },
  },
});

export const { setActivities, updateActivities, clearActivities } =
  activitiesSlice.actions;
export default activitiesSlice.reducer;
