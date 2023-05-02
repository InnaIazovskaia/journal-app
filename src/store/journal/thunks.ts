import { collection, doc, setDoc } from "firebase/firestore/lite";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNoteActionCreator,
  savingNewNoteActionCreator,
  setActiveNoteActionCreator,
  setNotesActionCreator,
  setPhotosToActiveNoteActionCreator,
  setSavingActionCreator,
  updateNoteActionCreator,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";
import { NoteStructure } from "../../types";

export const startNewNote =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(savingNewNoteActionCreator());

    const { uid } = getState().auth;

    const newNote: NoteStructure = {
      id: "",
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [] as string[],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNoteActionCreator(newNote));
    dispatch(setActiveNoteActionCreator(newNote));
  };

export const startLoadingNotes =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    if (!uid) {
      throw new Error("UID of the user does't exist");
    }

    const notes = await loadNotes(uid);

    dispatch(setNotesActionCreator(notes));
  };

export const startSaveNote =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSavingActionCreator());

    const { uid } = getState().auth;
    const { activeNote: note } = getState().journal;

    const { body, date, imageUrls, title } = note;

    const noteToFireStore = { body, date, imageUrls, title };

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNoteActionCreator(note));
  };

export const startUploadinfFiles =
  (files: FileList) => async (dispatch: AppDispatch) => {
    dispatch(setSavingActionCreator());

    const fileUploadPromises: Array<Promise<string>> = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNoteActionCreator(photosUrls));
  };
