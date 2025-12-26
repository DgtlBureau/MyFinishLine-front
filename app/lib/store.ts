import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import activitiesSlice from "./features/activities/activitiesSlice";
import userReducer from "./features/user/userSlice";
import challengeSlice from "./features/challenge/challengeSlice";
import productsSlice from "./features/products/productsSlice";
import leaderboardSlice from "./features/leaderboard/leaderboardSlice";

const rootReducer = combineReducers({
  user: userReducer,
  activities: activitiesSlice,
  challenge: challengeSlice,
  products: productsSlice,
  leaderboard: leaderboardSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "activities", "products"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
