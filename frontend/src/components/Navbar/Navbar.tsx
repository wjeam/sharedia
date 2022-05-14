import {
  Box,
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Tooltip,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Add, Menu, NoMeetingRoom, AccountCircle } from "@mui/icons-material";
import { useState, FC, useEffect } from "react";
import UploadDialog from "../UploadDialog/UploadDialog";
import { AccountInfo } from "@azure/msal-browser";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReportList from "../Report/ReportList";
import { config } from "../../Config";

const Navbar: FC<any> = ({
  login,
  logout,
  client,
  isAdult,
  setSearch,
  search,
  handleFilterChange,
  sort,
  addMedia,
  handleRedirect,
  toggleOpenPostReport,
}) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<AccountInfo | null>(null);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
  const [reportMenuAnchorEl, setReportMenuAnchorEl] = useState(null);

  useEffect(() => {
    if (client == null) return;

    const registerRedirect = () => {
      client.handleRedirectPromise().then(() => {
        if (client.getAllAccounts().length === 0) {
          handleRedirect(false);
        } else {
          setLoggedUser(client.getAllAccounts()[0]);
          client.setActiveAccount(client.getAllAccounts()[0]);
          handleRedirect(true);
        }
      });
    };

    if (loggedUser == null) {
      registerRedirect();
    }
  }, [client]);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value.toLocaleLowerCase());
  };

  const handleReportMenuOpen = (event: any) => {
    setReportMenuOpen(true);
    setReportMenuAnchorEl(event.currentTarget);
  };

  const handleReportMenuClose = () => {
    setReportMenuAnchorEl(null);
    setReportMenuOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar variant="dense">
            <IconButton edge="start">
              <Menu />
            </IconButton>
            {loggedUser && (
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
            )}
            <UploadDialog
              isAdult={isAdult}
              loggedUser={loggedUser}
              open={uploadDialogOpen}
              addMedia={addMedia}
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
                {config.admins.includes(loggedUser?.username) && (
                  <>
                    <IconButton
                      ref={reportMenuAnchorEl}
                      onClick={(e: any) => {
                        if (!reportMenuOpen) {
                          handleReportMenuOpen(e);
                        } else {
                          handleReportMenuClose();
                        }
                      }}
                    >
                      <Tooltip title="Reports">
                        <WarningAmberIcon sx={{ fontSize: 25 }} />
                      </Tooltip>
                    </IconButton>
                  </>
                )}
                <IconButton
                  onClick={() => {
                    logout();
                  }}
                >
                  <Tooltip title="Logout">
                    <NoMeetingRoom sx={{ fontSize: 25 }} />
                  </Tooltip>
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <ReportList
        anchorEl={reportMenuAnchorEl}
        menuOpen={reportMenuOpen}
        handleMenuClose={handleReportMenuClose}
        handleMenuOpen={handleReportMenuOpen}
        toggleOpenPostReport={toggleOpenPostReport}
      ></ReportList>
    </>
  );
};

export default Navbar;
