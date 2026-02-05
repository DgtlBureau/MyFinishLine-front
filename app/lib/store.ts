import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import activitiesSlice from "./features/activities/activitiesSlice";
import userReducer from "./features/user/userSlice";
import challengeSlice from "./features/challenge/challengeSlice";
import productsSlice from "./features/products/productsSlice";
import leaderboardSlice from "./features/leaderboard/leaderboardSlice";
import profileSlice from "./features/profile/profileSlice"

// Create noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootReducer = combineReducers({
  user: userReducer,
  activities: activitiesSlice,
  challenge: challengeSlice,
  products: productsSlice,
  leaderboard: leaderboardSlice,
  profile: profileSlice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "activities", "products", "profile", "challenge"],
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
