import { Mocked, describe, expect, test, vi } from "vitest";
import {
  checkingAuthantication,
  checkingCredentialsActionCreator,
  loginUserActionCreator,
  logoutUserActionCreator,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../store";
import { demoUser } from "../../fixtures/authFixtures";
import {
  loginWithEmailPassword,
  logoutFireBase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../../firebase/providers";
import { UserCredentials, UserRegisterData } from "../../../types";
import { clearNotesLogoutActionCreator } from "../../../store/journal";

vi.mock("../../../firebase/providers");
const dispatch = vi.fn();

describe("Given a checkingAuthantication function", () => {
  describe("When it's invoked", () => {
    test("Then it should call dispatch with checkingCredentialsActionCreator function", async () => {
      await checkingAuthantication()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentialsActionCreator());
    });
  });
});

describe("Given a startGoogleSignIn function", () => {
  describe("Whent it's invoked and the result is ok", () => {
    test("Then it should call checkingCredentialsActionCreator and dispatch with loginUserActionCreator function", async () => {
      const loginData = { ok: true, ...demoUser, errorMessage: undefined };

      vi.mocked(signInWithGoogle).mockResolvedValue(loginData);

      await startGoogleSignIn()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentialsActionCreator());
      expect(dispatch).toHaveBeenCalledWith(
        loginUserActionCreator({ ...demoUser, errorMessage: undefined })
      );
    });
  });

  describe("Whent it's invoked and the result is not ok and has error message 'Error in Google'", () => {
    test("Then it should call checkingCredentialsActionCreator and dispatch with logoutUserActionCreator with the error message", async () => {
      const errorMessage = "Error in Google";
      const loginData = {
        ok: false,
        errorMessage,
      };

      vi.mocked(signInWithGoogle).mockResolvedValue(loginData);

      await startGoogleSignIn()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentialsActionCreator());
      expect(dispatch).toHaveBeenCalledWith(
        logoutUserActionCreator(errorMessage)
      );
    });
  });
});

describe("Given a startLoginWithEmailPassword function", () => {
  describe("When it's invoked with correct email and passwort and theresult is ok", () => {
    test("Then it should call dispatch with checkingCredentialsActionCreator and with loginUserActionCreator", async () => {
      const loginData = { ok: true, ...demoUser, errorMessage: undefined };

      const formData: UserCredentials = {
        email: demoUser.email,
        password: "123456",
      };

      vi.mocked(loginWithEmailPassword).mockResolvedValue(loginData);

      await startLoginWithEmailPassword(formData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentialsActionCreator());
      expect(dispatch).toHaveBeenLastCalledWith(
        loginUserActionCreator({ ...demoUser, errorMessage: undefined })
      );
    });
  });

  describe("Whent it's invoked and the result is not ok and has error message 'Error in Google'", () => {
    test("Then it should call checkingCredentialsActionCreator and dispatch with logoutUserActionCreator with the error message", async () => {
      const errorMessage = "Error in Google";
      const loginData = {
        ok: false,
        errorMessage,
      };

      const formData: UserCredentials = {
        email: demoUser.email,
        password: "123456",
      };

      vi.mocked(loginWithEmailPassword).mockResolvedValue(loginData);

      await startLoginWithEmailPassword(formData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentialsActionCreator());
      expect(dispatch).toHaveBeenCalledWith(
        logoutUserActionCreator(errorMessage)
      );
    });
  });
});

describe("Given a startLogout function", () => {
  describe("When it's invoked", () => {
    test("Then it should call logoutFireBase dispatch with clearNotesLogoutActionCreator and logoutUserActionCreator('')", async () => {
      await startLogout()(dispatch);

      expect(logoutFireBase).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(clearNotesLogoutActionCreator());
      expect(dispatch).toHaveBeenCalledWith(logoutUserActionCreator(""));
    });
  });
});

describe("Given a startCreatingUserWithEmailPassword function", () => {
  describe("When it's invoked with user register data", () => {
    test("Then it should call dispatch with checkingCredentialsActionCreato loginUserActionCreator with user register data", async () => {
      const registerData = {
        ok: true,
        ...demoUser,
        errorMessage: undefined,
      };
      const formData: UserRegisterData = {
        email: demoUser.email,
        password: "123456",
        displayName: demoUser.displayName,
      };

      vi.mocked(registerUserWithEmailPassword).mockResolvedValue(registerData);

      await startCreatingUserWithEmailPassword(formData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentialsActionCreator());
      expect(dispatch).toHaveBeenLastCalledWith(
        loginUserActionCreator({ ...demoUser, errorMessage: undefined })
      );
    });
  });

  describe("Whent it's invoked and the result is not ok and has error message 'Error in Google'", () => {
    test("Then it should call checkingCredentialsActionCreator and dispatch with logoutUserActionCreator with the error message", async () => {
      const errorMessage = "Error in Google";
      const registerData = {
        ok: false,
        errorMessage,
      };
      const formData: UserRegisterData = {
        email: demoUser.email,
        password: "123456",
        displayName: demoUser.displayName,
      };

      vi.mocked(registerUserWithEmailPassword).mockResolvedValue(registerData);

      await startCreatingUserWithEmailPassword(formData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentialsActionCreator());
      expect(dispatch).toHaveBeenCalledWith(
        logoutUserActionCreator(errorMessage)
      );
    });
  });
});
