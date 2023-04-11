export interface UserState {
  status: "checking" | "not-authenticated" | "authenticated";
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMesssage: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
