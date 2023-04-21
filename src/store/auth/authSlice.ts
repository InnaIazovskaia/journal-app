import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData, UserState } from "../../types";

const initialState: UserState = {
  status: "checking",
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
    loginUser: (state, action: PayloadAction<UserData>): UserState => ({
      ...state,
      status: "authenticated",
      uid: action.payload.uid,
      email: action.payload.email,
      displayName: action.payload.displayName,
      photoURL: action.payload.photoURL,
      errorMesssage: "",
    }),
    logoutUser: (state, action: PayloadAction<string>): UserState => ({
      ...initialState,
      status: "not-authenticated",
      errorMesssage: action.payload,
    }),
    checkingCredentials(state) {
      state.status = "checking";
    },
  },
});

export const {
  checkingCredentials: checkingCredentialsActionCreator,
  logoutUser: logoutUserActionCreator,
  loginUser: loginUserActionCreator,
} = authSlice.actions;
