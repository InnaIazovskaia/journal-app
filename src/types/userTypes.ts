export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMesssage: string;
}

export interface UserState extends UserData {
  status: "checking" | "not-authenticated" | "authenticated";
}

export interface UserCredentials {
  email: string;
  password: string;
}
