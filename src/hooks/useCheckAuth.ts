import { useEffect } from "react";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
  store,
} from "../store";
import { useAppSelector } from "../store/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);

  const { dispatch } = store;

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logoutUserActionCreator(""));

      dispatch(
        loginUserActionCreator({
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
          photoURL: user.photoURL!,
          errorMessage: "",
        })
      );

      await dispatch(startLoadingNotes());
    });
  }, []);

  return status;
};
