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
    },
  },
});

export const {
  addNewEmptyNote: addNewEmptyNoteActionCreator,
  savingNewNote: savingNewNoteActionCreator,
  setNotes: setNotesActionCreator,
  setActiveNote: setActiveNoteActionCreator,
} = journalSlice.actions;
