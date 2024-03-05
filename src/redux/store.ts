import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from './slices';

const store = configureStore({
    reducer: combineReducers({
      auth: authSlice.reducer
    })
  });

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export default store