import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types";

const initialState: UserState = {
  status: "not-authenticated",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMesssage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkingCredentials(state) {
      state.status = "checking";
    },
  },
});

export const { checkingCredentials: checkingCredentialsActionCreator } =
  authSlice.actions;
