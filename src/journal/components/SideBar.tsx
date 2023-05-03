import { useState } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { SideBarItem } from "./SideBarItem";
import { NavBar } from "./NavBar";

interface SideBarProps {
  drawerWidth: number;
  window?: () => Window;
}

export const SideBar = ({ drawerWidth, window }: SideBarProps): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { displayName } = useAppSelector((state) => state.auth);
  const { notes } = useAppSelector((state) => state.journal);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>
      <Divider />

      <List>
        {notes.map((note) => (
          <SideBarItem key={note.id} {...note} />
        ))}
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <NavBar drawerWidth={drawerWidth} onClick={handleDrawerToggle} />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
