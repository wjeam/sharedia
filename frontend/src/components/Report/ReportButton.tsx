import { Button } from "@mui/material";
import { FC, useState } from "react";
import ReportDialog from "./ReportDialog";

export const ReportButton: FC<any> = ({ reporterEmail, postId }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const toggleOpen = (open: boolean) => {
    setShowDialog(open);
  };

  return (
    <>
      <Button
        sx={{
          color: "white",
          fontSize: "0.7em",
          mr: 1,
          px: 2,
          py: 0.5,
          textTransform: "capitalize",
          mb: 2,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
        onClick={() => {
          toggleOpen(true);
        }}
      >
        Report
      </Button>
      <ReportDialog
        open={showDialog}
        toggleOpen={setShowDialog}
        postId={postId}
        reporterEmail={reporterEmail}
      ></ReportDialog>
    </>
  );
};

export default ReportButton;
