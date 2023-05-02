import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JournalSate, NoteStructure, NotesStructure } from "../../types";

const initialState: JournalSate = {
  isSaving: false,
  messageSaved: "",
  notes: [] as NotesStructure,
  activeNote: {} as NoteStructure,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote(state) {
      state.isSaving = true;
    },
    addNewEmptyNote(state, action: PayloadAction<NoteStructure>) {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setNotes(state, action: PayloadAction<NotesStructure>) {
      state.notes = action.payload;
    },
    setActiveNote(state, action: PayloadAction<NoteStructure>) {
      state.activeNote = action.payload;
      state.messageSaved = "";
    },
    setSaving(state) {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote(state, action: PayloadAction<NoteStructure>) {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSaved = `${action.payload.title}, updated correctly`;
    },
    setPhotosToActiveNote(state, action: PayloadAction<string[]>) {
      state.activeNote.imageUrls = [
        ...state.activeNote.imageUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },
    clearNotesLogout(state) {
      state = { ...initialState };
    },
    deleteNoteById(state, action: PayloadAction<string>) {
      state.activeNote = {} as NoteStructure;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const {
  addNewEmptyNote: addNewEmptyNoteActionCreator,
  savingNewNote: savingNewNoteActionCreator,
  setNotes: setNotesActionCreator,
  setActiveNote: setActiveNoteActionCreator,
  setSaving: setSavingActionCreator,
  updateNote: updateNoteActionCreator,
  setPhotosToActiveNote: setPhotosToActiveNoteActionCreator,
  clearNotesLogout: clearNotesLogoutActionCreator,
  deleteNoteById: deleteNoteByIdActionCreator,
} = journalSlice.actions;
