import { collection, doc, setDoc } from "firebase/firestore/lite";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNoteActionCreator,
  savingNewNoteActionCreator,
  setNotesActionCreator,
} from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startNewNote =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(savingNewNoteActionCreator());

    const { uid } = getState().auth;

    const newNote = {
      id: "",
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNoteActionCreator(newNote));
  };

export const startLoadingNotes =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);

    dispatch(setNotesActionCreator(notes));
  };
