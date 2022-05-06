import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FC, useEffect, useState } from "react";
import IReport from "../../models/IReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ReportType } from "../../models/ReportType";

const ReportList: FC<any> = ({
  anchorEl,
  menuOpen,
  handleMenuClose,
  toggleOpenPostReport,
}) => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    if (!menuOpen) return;

    const fetchReports = () => {
      axios({
        method: "GET",
        headers: {
          ApiKey: "12345",
        },
        url: "https://localhost:4131/report",
      }).then((response: AxiosResponse) => {
        setReports(response.data);
      });
    };

    fetchReports();
  }, [menuOpen]);

  const deleteReport = (reportId: string) => {
    axios({
      method: "DELETE",
      headers: {
        ApiKey: "12345",
      },
      url: `https://localhost:4131/report/${reportId}`,
    }).then((response: AxiosResponse) => {
      setReports(reports.filter((report: IReport) => report.id !== reportId));
    });
  };

  return (
    <Grid container justifyContent="flex-end">
      <Menu
        onClose={handleMenuClose}
        id="report-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        PaperProps={{
          sx: {
            maxHeight: "400px",
            width: "350px",
            py: 0,
            pt: 1,
          },
        }}
        sx={{ "& .MuiList-root": { py: 0 } }}
      >
        <Grid container>
          <Grid item justifySelf={"flex-start"} xs={6}>
            <Typography
              variant="subtitle2"
              fontSize="1.35em"
              mx={2}
              sx={{
                borderBottom: "1px rgba(255, 255, 255, 0.1) solid",
                display: "inline",
              }}
            >
              Reports
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="end">
            <Tooltip title="Close">
              <IconButton
                sx={{ fontSize: "0.75em" }}
                onClick={() => {
                  handleMenuClose();
                }}
              >
                <CancelOutlinedIcon
                  sx={{
                    color: "rgba(0, 0, 0, 0.7)",
                    ":hover": { color: "rgba(0, 0, 0, 0.9)" },
                  }}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        {reports &&
          reports.map((report, key) => {
            return [
              <Tooltip
                title={report?.reportReason}
                placement="left"
                followCursor
              >
                <MenuItem key={key}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            color: "rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "0.7em", display: "inline" }}
                          >
                            Reported by: {report.reporterEmail}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: "0.7em",
                            }}
                          >
                            Post Id: {report.postId}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: "0.7em",
                            }}
                          >
                            Reason:{" "}
                            {report.reportType == 5
                              ? report.reportReason
                              : ReportType[report.reportType]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1} alignSelf="center">
                      <Tooltip title="View post">
                        <IconButton
                          sx={{ fontSize: "0.75em" }}
                          onClick={() => {
                            toggleOpenPostReport(report.postId);
                          }}
                        >
                          <VisibilityIcon
                            sx={{
                              color: "rgba(0, 0, 0, 0.7)",
                              ":hover": { color: "rgba(0, 0, 0, 0.5)" },
                            }}
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete report">
                        <IconButton
                          sx={{ fontSize: "0.75em" }}
                          onClick={() => {
                            deleteReport(report.id);
                          }}
                        >
                          <CancelOutlinedIcon
                            sx={{
                              color: "rgba(0, 0, 0, 0.7)",
                              ":hover": { color: "rgba(255, 100, 100, 1)" },
                            }}
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </MenuItem>
              </Tooltip>,
            ];
          })}
      </Menu>
    </Grid>
  );
};

export default ReportList;
