import { UserData, UserState } from "../../types";

export const initialState: UserState = {
  status: "checking",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMesssage: "",
};

export const authenticatedState: UserState = {
  status: "authenticated",
  uid: "123ABC",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "",
  errorMesssage: "",
};

export const notAuthenticatedState: UserState = {
  status: "not-authenticated",
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  errorMesssage: "",
};

export const demoUser: UserData = {
  uid: "ABC123",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "",
  errorMesssage: "",
};
