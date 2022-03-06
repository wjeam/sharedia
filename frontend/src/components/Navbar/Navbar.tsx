import {
  Box,
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Button,
  Tooltip,
} from "@mui/material";
import { Add, Menu, NoMeetingRoom, AccountCircle } from "@mui/icons-material";
import React, { useState, FC, useEffect } from "react";
import UploadDialog from "../UploadDialog/UploadDialog";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";

const Navbar: FC<any> = ({ login, logout, client, isAdult }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<AccountInfo>();

  useEffect(() => {
    if (client == null) return;

    const registerRedirect = async () => {
      await client
        .handleRedirectPromise()
        .then((response: AuthenticationResult | null) => {
          setLoggedUser(client.getAllAccounts()[0]);
          client.setActiveAccount(client.getAllAccounts()[0]);
        });
    };

    registerRedirect();
  }, [client]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar variant="dense">
            <IconButton edge="start">
              <Menu />
            </IconButton>
            <IconButton
              onClick={() =>
                uploadDialogOpen
                  ? setUploadDialogOpen(false)
                  : setUploadDialogOpen(true)
              }
            >
              <Tooltip title="Create a post">
                <Add sx={{ fontSize: 25 }} />
              </Tooltip>
            </IconButton>
            <UploadDialog
              isAdult={isAdult}
              loggedUser={loggedUser}
              open={uploadDialogOpen}
              toggleOpen={setUploadDialogOpen}
            />
            {!loggedUser ? (
              <IconButton onClick={login} sx={{ ml: "auto" }}>
                <Tooltip title="Login">
                  <AccountCircle sx={{ fontSize: 25 }} />
                </Tooltip>
              </IconButton>
            ) : (
              <>
                <Typography
                  fontFamily={"Roboto"}
                  variant="subtitle2"
                  sx={{ color: "rgba(0, 0, 0, 0.5)", ml: "auto" }}
                >
                  {loggedUser?.username}
                </Typography>
                <IconButton onClick={logout}>
                  <Tooltip title="Logout">
                    <NoMeetingRoom sx={{ fontSize: 25 }} />
                  </Tooltip>
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
