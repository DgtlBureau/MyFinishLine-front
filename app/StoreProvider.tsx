"use client";

import { store } from "./lib/store";
import { Provider } from "react-redux";
import { I18nProvider } from "./lib/i18n/context";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>{children}</I18nProvider>
    </Provider>
  );
}
