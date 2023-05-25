import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  logoutFireBase,
} from "../../firebase/providers";
import { UserCredentials, UserRegisterData } from "../../types";
import { clearNotesLogoutActionCreator } from "../journal";
import { AppDispatch } from "../store";
import {
  loginUserActionCreator,
  checkingCredentialsActionCreator,
  logoutUserActionCreator,
} from "./authSlice";

export const checkingAuthantication = () => async (dispatch: AppDispatch) => {
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
      errorMessage: result.errorMessage!,
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
        errorMessage: errorMessage!,
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
        errorMessage: result.errorMessage!,
      })
    );
  };

export const startLogout = () => async (dispatch: AppDispatch) => {
  await logoutFireBase();
  dispatch(clearNotesLogoutActionCreator());
  dispatch(logoutUserActionCreator(""));
};
