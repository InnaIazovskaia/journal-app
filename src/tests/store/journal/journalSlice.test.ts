import { describe, expect, test } from "vitest";
import {
  addNewEmptyNoteActionCreator,
  clearNotesLogoutActionCreator,
  deleteNoteByIdActionCreator,
  journalSlice,
  savingNewNoteActionCreator,
  setActiveNoteActionCreator,
  setNotesActionCreator,
  setPhotosToActiveNoteActionCreator,
  setSavingActionCreator,
  updateNoteActionCreator,
} from "../../../store/journal";
import { initialState, note, notesList } from "../../fixtures/journalFixtures";
import { Action } from "@reduxjs/toolkit";
import { JournalSate, NoteStructure, NotesStructure } from "../../../types";

describe("Given a journalSlice", () => {
  describe("When it receives an initial state and doesn't receive any action", () => {
    test("Then it should retern initial state and to have name 'journal'", () => {
      const sliceName = "journal";
      const state = journalSlice.reducer(initialState, {} as Action);

      expect(journalSlice.name).toBe(sliceName);
      expect(state).toEqual(initialState);
    });
  });

  describe("When it receives a new state and savingNewNoteActionCreator", () => {
    test("Then it should return new state  with isSaving true", () => {
      const state = journalSlice.reducer(
        initialState,
        savingNewNoteActionCreator
      );

      const expectedState: JournalSate = {
        ...initialState,
        isSaving: true,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("When it receives initial state and addNewEmptyNoteActionCreator with newNote", () => {
    test("Then it should return new state with isSaving false and notes list with newNote", () => {
      const ExpectedState: JournalSate = {
        ...initialState,
        isSaving: false,
        notes: [note],
      };

      const state = journalSlice.reducer(
        initialState,
        addNewEmptyNoteActionCreator(note)
      );

      expect(state).toEqual(ExpectedState);
    });
  });

  describe("When it receives actual state and setNotesActionCreator with list of notes", () => {
    test("Then it should return new state with the list of notes", () => {
      const expectedState: JournalSate = {
        ...initialState,
        notes: notesList,
      };

      const state = journalSlice.reducer(
        initialState,
        setNotesActionCreator(notesList)
      );

      expect(state).toEqual(expectedState);
    });
  });

  describe("When it receives actual state and setActiveNoteActionCreator with a note", () => {
    test("Then it should return new state with the note as activeNate and '' as messageSaved", () => {
      const expectedState: JournalSate = {
        ...initialState,
        activeNote: note,
        messageSaved: "",
      };

      const state = journalSlice.reducer(
        initialState,
        setActiveNoteActionCreator(note)
      );

      expect(state).toEqual(expectedState);
    });
  });

  describe("When it receives actual state and setSavingActionCreator", () => {
    test("Then it shoulr return new state with isSaving trie and '' as messageSaved", () => {
      const expectedState: JournalSate = {
        ...initialState,
        isSaving: true,
        messageSaved: "",
      };

      const state = journalSlice.reducer(initialState, setSavingActionCreator);

      expect(state).toEqual(expectedState);
    });
  });

  describe("When it receives actual state and updateNoteActionCreator with existing note with title 'Go to gym' and body 'don't go to gym'", () => {
    test("Then it should return new state with aupdated note and messageSaved 'Go to gym, updated correctly' and isSavinf false", () => {
      const noteToUpdate: NoteStructure = {
        id: "123",
        title: "Go to gym",
        body: "don't go to gym",
        date: 1683147385299,
        imageUrls: [] as string[],
      };

      const actualState: JournalSate = {
        ...initialState,
        notes: notesList,
      };

      const newNotes: NotesStructure = [
        noteToUpdate,
        {
          id: "456",
          title: "Read the book",
          body: "Read the book",
          date: 1683147385299,
          imageUrls: [] as string[],
        },
      ];

      const expectedState: JournalSate = {
        ...actualState,
        messageSaved: "Go to gym, updated correctly",
        notes: newNotes,
      };

      const state = journalSlice.reducer(
        actualState,
        updateNoteActionCreator(noteToUpdate)
      );

      expect(state).toEqual(expectedState);
    });
  });

  describe("When it receives actual state setPhotosToActiveNoteActionCreator with list with photos urls: 'https://img1.jpg', 'https://img2.jpg'", () => {
    test("Then it should return new state and activeNote of new state should have in list mageUrls the urls", () => {
      const activeNote: NoteStructure = {
        id: "456",
        title: "Read the book",
        body: "Read the book",
        date: 1683147385299,
        imageUrls: [] as string[],
      };

      const actualState: JournalSate = {
        ...initialState,
        activeNote,
      };

      const photosUrls = ["https://img1.jpg", "https://img2.jpg"];

      const state = journalSlice.reducer(
        actualState,
        setPhotosToActiveNoteActionCreator(photosUrls)
      );

      expect(state.activeNote.imageUrls).toEqual(photosUrls);
    });
  });

  describe("When it receives actual state and clearNotesLogoutActionCreator", () => {
    test("Then it should return initial state", () => {
      const actualState: JournalSate = {
        ...initialState,
        notes: notesList,
      };

      const state = journalSlice.reducer(
        actualState,
        clearNotesLogoutActionCreator
      );

      expect(state).toEqual(initialState);
    });
  });

  describe("When it receives actual state with list of notes and deleteNoteByIdActionCreator with id of existing note to delete", () => {
    test("Then it should return new state with notes list without the note", () => {
      const noteToDelete: NoteStructure = {
        id: "123",
        title: "Go to gym",
        body: "Go to gym",
        date: 1683147385299,
        imageUrls: [] as string[],
      };

      const actualState: JournalSate = {
        ...initialState,
        notes: notesList,
      };

      const state = journalSlice.reducer(
        actualState,
        deleteNoteByIdActionCreator(noteToDelete.id)
      );

      expect(state.notes).not.includes(noteToDelete);
    });
  });
});
