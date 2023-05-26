import { JournalSate, NoteStructure, NotesStructure } from "../../types";

export const initialState: JournalSate = {
  isSaving: false,
  messageSaved: "",
  notes: [] as NotesStructure,
  activeNote: {} as NoteStructure,
};

export const note: NoteStructure = {
  id: "",
  title: "",
  body: "",
  date: new Date().getTime(),
  imageUrls: [] as string[],
};

export const notesList: NotesStructure = [
  {
    id: "123",
    title: "Go to gym",
    body: "Go to gym",
    date: 1683147385299,
    imageUrls: [] as string[],
  },

  {
    id: "456",
    title: "Read the book",
    body: "Read the book",
    date: 1683147385299,
    imageUrls: [] as string[],
  },
];
