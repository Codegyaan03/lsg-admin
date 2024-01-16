import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { useSelector } from "react-redux";
const persistConfig = {
  key: "lsg-scrape",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
export { store, persistor };
type RootState = ReturnType<typeof store.getState>;

export const useDataSelector = <T extends keyof RootState>(
  type: T
): RootState[T] => {
  return useSelector((state: RootState) => state[type]);
};
