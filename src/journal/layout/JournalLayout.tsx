import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

const drawerWidth = 280;

interface JournalLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const JournalLayout = ({
  children,
}: JournalLayoutProps): JSX.Element => (
  <Box
    sx={{ display: "flex" }}
    className="animate__animated animate__fadeIn animate__faster"
  >
    <NavBar drawerWidth={drawerWidth} />

    <SideBar drawerWidth={drawerWidth} />

    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      {children}
    </Box>
  </Box>
);
