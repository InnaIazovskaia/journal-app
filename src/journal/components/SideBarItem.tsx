import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NoteStructure } from "../../types/journalTypes";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";
import { store } from "../../store";
import { setActiveNoteActionCreator } from "../../store/journal";

export const SideBarItem = ({
  title,
  body,
  id,
  date,
  imageUrls,
}: NoteStructure): JSX.Element => {
  const { dispatch } = store;

  const onClickNote = () => {
    dispatch(
      setActiveNoteActionCreator({
        title,
        body,
        id,
        date,
        imageUrls,
      })
    );
  };

  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
