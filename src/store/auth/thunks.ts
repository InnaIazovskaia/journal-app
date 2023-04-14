import { signInWIthGoogle } from "../../firebase/providers";
import { AppDispatch } from "../store";
import {
  loginUserActionCreator,
  checkingCredentialsActionCreator,
  logoutUserActionCreator,
} from "./authSlice";

export const checkingAuthantication =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(checkingCredentialsActionCreator());
  };

export const startGoogleSignIn = () => async (dispatch: AppDispatch) => {
  dispatch(checkingCredentialsActionCreator());

  const result = await signInWIthGoogle();

  if (!result.ok) {
    dispatch(logoutUserActionCreator(result.errorMessage!));
  }

  dispatch(
    loginUserActionCreator({
      uid: result.uid!,
      displayName: result.displayName!,
      email: result.email!,
      photoURL: result.photoURL!,
      errorMesssage: result.errorMessage!,
    })
  );
};
