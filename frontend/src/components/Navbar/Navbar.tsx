import {
  Box,
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Button,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import UploadDialog from "../UploadDialog/UploadDialog";

const Navbar = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar variant="dense">
            <IconButton edge="start">
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                uploadDialogOpen
                  ? setUploadDialogOpen(false)
                  : setUploadDialogOpen(true)
              }
            >
              <Tooltip title="Create a post">
                <AddIcon sx={{ fontSize: 25 }} />
              </Tooltip>
            </IconButton>
            <IconButton sx={{ ml: "auto" }}>
              <Tooltip title="Login">
                <AccountCircleIcon sx={{ fontSize: 25 }} />
              </Tooltip>
            </IconButton>
            <UploadDialog
              open={uploadDialogOpen}
              toggleOpen={setUploadDialogOpen}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
