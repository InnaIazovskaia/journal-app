import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { store } from "../../store";
import { startNewNote } from "../../store/journal";
import { useAppSelector } from "../../store/hooks";

export const JournalPage = (): JSX.Element => {
  const { isSaving, activeNote } = useAppSelector((state) => state.journal);
  const { dispatch } = store;

  const onClickNewNote = async () => {
    await dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {Object.keys(activeNote).length === 0 ? (
        <NothingSelectedView />
      ) : (
        <NoteView />
      )}

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.8 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
