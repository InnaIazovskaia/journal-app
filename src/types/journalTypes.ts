export interface NoteStructure {
  id: string;
  title: string;
  body: string;
  date: number;
  imageUrls: string[];
}

export type NotesStructure = NoteStructure[];

export interface JournalSate {
  isSaving: boolean;
  messageSaved: string;
  notes: NotesStructure;
  activeNote: NoteStructure;
}
