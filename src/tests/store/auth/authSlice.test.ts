import { describe, expect, test } from "vitest";
import { Action } from "@reduxjs/toolkit";
import {
  authSlice,
  checkingCredentialsActionCreator,
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../../store";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authFixtures";
import { UserState } from "../../../types";

describe("Given an authSlice reducer", () => {
  describe("When it receivea initial state and doesn't receive any action", () => {
    test("Then it should retern initial state and to have name 'auth'", () => {
      const sliceName = "auth";
      const state = authSlice.reducer(initialState, {} as Action);

      expect(authSlice.name).toBe(sliceName);
      expect(state).toEqual(initialState);
    });
  });

  describe("When it receives a new state and loginUser action with user data as payload", () => {
    test("Then it should return new state with the user data", () => {
      const state = authSlice.reducer(
        initialState,
        loginUserActionCreator(demoUser)
      );

      const expectedState: UserState = {
        status: "authenticated",
        uid: demoUser.uid,
        displayName: demoUser.displayName,
        email: demoUser.email,
        errorMesssage: demoUser.errorMesssage,
        photoURL: demoUser.photoURL,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("When it receives logoutUser action without error message", () => {
    test("Then it should return new state with status 'not-authenticated'", () => {
      const state = authSlice.reducer(
        authenticatedState,
        logoutUserActionCreator("")
      );

      expect(state).toEqual(notAuthenticatedState);
    });
  });

  describe("When it receives logoutUser action with error message 'User credentials are incorrect'", () => {
    test("Then it should return state with status 'not-authenticated' and with the message", () => {
      const errorMessage = "User credentials are incorrect";

      const state = authSlice.reducer(
        authenticatedState,
        logoutUserActionCreator(errorMessage)
      );

      const expectedState: UserState = {
        status: "not-authenticated",
        uid: "",
        displayName: "",
        email: "",
        photoURL: "",
        errorMesssage: errorMessage,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("When it receives checkingCredentials action", () => {
    test("Then it should change status to 'checking'", () => {
      const state = authSlice.reducer(
        authenticatedState,
        checkingCredentialsActionCreator
      );

      const expectedStatus = "checking";

      expect(state.status).toBe(expectedStatus);
    });
  });
});
