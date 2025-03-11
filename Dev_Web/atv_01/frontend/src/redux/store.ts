import { configureStore } from "@reduxjs/toolkit";
import ibgeReducer from "./slices/ibgeSlice";

export const store = configureStore({
  reducer: {
    ibge: ibgeReducer,
  },
});

// Tipos inferidos para o estado, dispatch e thunk
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
