import { collection, getDocs, QuerySnapshot } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { NotesStructure, NoteStructure } from "../types";

export const loadNotes = async (uid: string): Promise<NotesStructure> => {
  if (!uid) {
    throw new Error("The UID of the user does't exist");
  }

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = (await getDocs(collectionRef)) as QuerySnapshot<NoteStructure>;

  const notes = [] as NotesStructure;

  docs.forEach((doc) => {
    notes.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return notes;
};
