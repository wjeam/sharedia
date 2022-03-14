import {
  Box,
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Button,
  Tooltip,
  TextField,
  OutlinedInput,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Add, Menu, NoMeetingRoom, AccountCircle } from "@mui/icons-material";
import React, { useState, FC, useEffect } from "react";
import UploadDialog from "../UploadDialog/UploadDialog";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";

const Navbar: FC<any> = ({
  login,
  logout,
  client,
  isAdult,
  setSearch,
  search,
  handleFilterChange,
  sort,
}) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<AccountInfo>();

  useEffect(() => {
    if (client == null) return;

    const registerRedirect = async () => {
      await client.handleRedirectPromise().then(() => {
        setLoggedUser(client.getAllAccounts()[0]);
        client.setActiveAccount(client.getAllAccounts()[0]);
      });
    };

    registerRedirect();
  }, [client]);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value.toLocaleLowerCase());
  };

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
            <TextField
              label="Search for keyword"
              rows={1}
              maxRows={1}
              InputProps={{ sx: { height: 35, width: 350 } }}
              InputLabelProps={{
                sx: {
                  ":not(&.Mui-focused)": {
                    top: search.length > 0 ? 0 : -9,
                  },
                },
              }}
              onChange={handleSearchChange}
              value={search}
            />
            <FormControl variant="outlined" sx={{ ml: 2, width: 150 }}>
              <InputLabel
                id="filter-label"
                sx={{
                  top: !!!sort ? -9 : 0,
                  ":not(&.Mui-focused)": {
                    top: !!!sort ? -9 : 0,
                  },
                  "&.Mui-focused": {
                    top: 0,
                  },
                }}
              >
                Filter
              </InputLabel>
              <Select
                labelId="filter-label"
                id="filter"
                label="Filter"
                SelectDisplayProps={{
                  style: { paddingBottom: 6, paddingTop: 6 },
                }}
                value={sort}
              >
                <MenuItem
                  onClick={() => {
                    handleFilterChange("like");
                  }}
                  value={"like"}
                >
                  Likes
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleFilterChange("dislike");
                  }}
                  value={"dislike"}
                >
                  Dislikes
                </MenuItem>
                {isAdult ? (
                  <MenuItem
                    onClick={() => {
                      handleFilterChange("adult");
                    }}
                    value={"adult"}
                  >
                    Adult 18+
                  </MenuItem>
                ) : null}
              </Select>
            </FormControl>
            {!loggedUser ? (
              <>
                <Typography
                  fontFamily={"Roboto"}
                  variant="subtitle2"
                  sx={{ color: "rgba(0, 0, 0, 0.5)", ml: "auto" }}
                >
                  Welcome Guest!
                </Typography>
                <IconButton onClick={login}>
                  <Tooltip title="Login">
                    <AccountCircle sx={{ fontSize: 25 }} />
                  </Tooltip>
                </IconButton>
              </>
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
