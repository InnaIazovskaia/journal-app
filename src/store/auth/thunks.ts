import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
} from "../../firebase/providers";
import { UserCredentials, UserRegisterData } from "../../types";
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

  const result = await signInWithGoogle();

  if (!result.ok)
    return dispatch(logoutUserActionCreator(result.errorMessage!));

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

export const startCreatingUserWithEmailPassword =
  ({ displayName, email, password }: UserRegisterData) =>
  async (dispatch: AppDispatch) => {
    dispatch(checkingCredentialsActionCreator());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        displayName,
        password,
      });

    if (!ok) return dispatch(logoutUserActionCreator(errorMessage!));

    dispatch(
      loginUserActionCreator({
        uid: uid!,
        displayName,
        email,
        photoURL: photoURL!,
        errorMesssage: errorMessage!,
      })
    );
  };

export const startLoginWithEmailPassword =
  ({ email, password }: UserCredentials) =>
  async (dispatch: AppDispatch) => {
    dispatch(checkingCredentialsActionCreator());

    const result = await loginWithEmailPassword({ email, password });

    if (!result.ok)
      return dispatch(logoutUserActionCreator(result.errorMessage!));

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
