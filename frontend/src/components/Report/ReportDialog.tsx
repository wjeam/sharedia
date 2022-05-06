import {
  Typography,
  Dialog,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { config } from "../../Config";
import IReport from "../../models/IReport";

export const ReportDialog: FC<any> = ({
  open,
  toggleOpen,
  reporterEmail,
  postId,
}) => {
  const [form, setForm] = useState<IReport>({
    reportType: 1,
    reportReason: "",
    postId: postId,
    reporterEmail: reporterEmail,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: IReport) => ({
      ...form,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setForm((form: any) => ({
      ...form,
      reportType: e.target.value,
    }));
  };

  const handleOnClose = (_: any, reason: string) => {
    if (reason === "backdropClick") {
      toggleOpen(false);
    }
  };

  const report = () => {
    if (form.reportType !== 4) {
      setForm((form: any) => ({ ...form, reportReason: "" }));
    }

    axios({
      method: "POST",
      url: `https://localhost:4131/report`,
      headers: {
        ApiKey: config.apiKey,
      },
      data: form,
      responseType: "json",
    }).then((response: AxiosResponse) => {
      toggleOpen(false);
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <Grid container flexDirection={"column"} sx={{ py: 2 }}>
        <Grid item px={3}>
          <Typography variant="h6">Report</Typography>
        </Grid>
        <Grid item px={3}>
          <Typography mb={2} mt={1}>
            To report this post, select one of the reasons listed below
          </Typography>
        </Grid>
        <Grid item px={3}>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="demo-simple-select-label">Report reason</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Report reason"
              onChange={handleSelectChange}
              value={form.reportType}
              sx={{ height: 40 }}
            >
              <MenuItem value={0}>Racism</MenuItem>
              <MenuItem value={1}>Hate Speech</MenuItem>
              <MenuItem value={2}>False Information</MenuItem>
              <MenuItem value={3}>Terrorism</MenuItem>
              <MenuItem value={4}>Other</MenuItem>
            </Select>
            {form.reportType == 4 && (
              <TextField
                id="reportReason"
                label="Reason"
                type="text"
                placeholder="Please specify why are you reporting this post"
                fullWidth
                onChange={handleChange}
                value={form!.reportReason}
                sx={{ mt: 1 }}
                variant="standard"
              />
            )}
          </FormControl>
        </Grid>
        <Grid item px={3} alignSelf="flex-end">
          <Button
            sx={{
              height: "90%",
              mt: 2,
              mr: 1,
              fontSize: "0.8em",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              ":hover": {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              },
            }}
            variant="contained"
            onClick={() => {
              toggleOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              height: "90%",
              mt: 2,
              backgroundColor: "rgba(255, 0, 0, 0.7)",
              ":hover": {
                backgroundColor: "rgba(255, 0, 0, 0.9)",
              },
              fontSize: "0.8em",
            }}
            variant="contained"
            onClick={() => {
              report();
            }}
          >
            Report
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ReportDialog;
