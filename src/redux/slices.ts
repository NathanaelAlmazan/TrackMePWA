import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from ".";

const userData: UserData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : ({} as UserData);

export const authSlice = createSlice({
  name: "auth",
  initialState: userData,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.uuid = action.payload.uuid;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.office = action.payload.office;
      state.position = action.payload.position;
      state.avatar = action.payload.avatar;

      localStorage.setItem("user", JSON.stringify(state));
    },
    update: (state, action: PayloadAction<UserData>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.avatar = action.payload.avatar;

      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state = {};

      localStorage.removeItem("user");
    },
  },
});
