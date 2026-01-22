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
    addActivity: (state, action: PayloadAction<IActivity>) => {
      return {
        isLoaded: state.isLoaded,
        activities: [action.payload],
      };
    },
    clearActivities: () => {
      return initialState;
    },
  },
});

export const { setActivities, updateActivities, clearActivities, addActivity } =
  activitiesSlice.actions;
export default activitiesSlice.reducer;
