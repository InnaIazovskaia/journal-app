import { UserData, UserState } from "../../types";

export const initialState: UserState = {
  status: "checking",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMessage: "",
};

export const authenticatedState: UserState = {
  status: "authenticated",
  uid: "123ABC",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "",
  errorMessage: "",
};

export const notAuthenticatedState: UserState = {
  status: "not-authenticated",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMessage: "",
};

export const demoUser = {
  uid: "ABC123",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "",
  errorMessage: "",
};
