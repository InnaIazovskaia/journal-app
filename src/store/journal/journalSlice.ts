import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JournalSate, NoteStructure, NotesStructure } from "../../types";

const initialState: JournalSate = {
  isSaving: false,
  messageSaved: "",
  notes: [] as NotesStructure,
  active: false,
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
  },
});

export const {
  addNewEmptyNote: addNewEmptyNoteActionCreator,
  savingNewNote: savingNewNoteActionCreator,
  setNotes: setNotesActionCreator,
} = journalSlice.actions;
