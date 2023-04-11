import { AppDispatch } from "../store";
import { checkingCredentialsActionCreator } from "./authSlice";

export const checkingAuthantication =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(checkingCredentialsActionCreator());
  };

export const startGoogleSignIn = () => async (dispatch: AppDispatch) => {
  dispatch(checkingCredentialsActionCreator());
};
