import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";
import { secureApi } from "./api/secureApi";
import { publicApi } from "./api/publicApi";

const rootReducer = combineReducers({
  auth: authSlice,
  counter: counterSlice,
  search: searchSlice,
  [publicApi.reducerPath]: publicApi.reducer,
  [secureApi.reducerPath]: secureApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(publicApi.middleware, secureApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
