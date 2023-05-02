import { useEffect, useMemo, useRef } from "react";

import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { useAppSelector } from "../../store/hooks";
import { store } from "../../store";
import {
  setActiveNoteActionCreator,
  startDeletingNote,
  startSaveNote,
  startUploadinfFiles,
} from "../../store/journal";

export const NoteView = (): JSX.Element => {
  const { dispatch } = store;
  const { activeNote, messageSaved, isSaving } = useAppSelector(
    (state) => state.journal
  );

  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setActiveNoteActionCreator(formState));
  }, [formState]);

  useEffect(() => {
    (async () => {
      if (messageSaved.length > 0) {
        await Swal.fire("Тote updated", messageSaved, "success");
      }
    })();
  }, [messageSaved]);

  const onSaveNote = async () => {
    await dispatch(startSaveNote());
  };

  const onFileInputChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files === null) return;

    await dispatch(startUploadinfFiles(target.files));
  };

  const onDelete = async () => {
    await dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => {
            if (fileInputRef.current !== null) {
              fileInputRef.current?.click();
            }
          }}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter an title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Delete
        </Button>
      </Grid>

      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
