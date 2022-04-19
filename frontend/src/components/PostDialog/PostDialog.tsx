import { Box, Button, Dialog, Grid, Paper, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import IThread from "../../models/IThread";
import Thread from "../Thread/Thread";

const PostDialog: FC<any> = ({ open, toggleOpen, media }) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = () => {
    axios({
      method: "GET",
      url: `https://localhost:4131/thread/${media.id}`,
      responseType: "json",
    }).then((response: AxiosResponse) => {
      setThreads(response.data);
    });
  };

  const handleOnClose = (_: any, reason: string) => {
    if (reason === "backdropClick") {
      toggleOpen(false, undefined);
    }
  };

  useEffect(() => {
    if (!!!media) return;
    const image = new Image();
    image.src = `https://localhost:4131/post/media/${media.id}`;
    setImage(image);
  }, [media]);

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <Grid container flexDirection={"column"}>
        <Grid item alignSelf="center">
          {media && image && (
            <img
              src={image?.src}
              style={{
                width: image.width * 0.7,
                height: image.height * 0.7,
                marginLeft: "auto",
                marginTop: "2em",
                marginRight: "auto",
                marginBottom: "2em",
              }}
            />
          )}
        </Grid>
        <Grid item alignSelf="flex-end">
          <Button
            sx={{
              color: "white",
              fontSize: "0.7em",
              mr: 5,
              px: 3,
              mb: "2em",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            Post a reply!
          </Button>
        </Grid>
        <Grid item>
          {threads &&
            threads.map((thread: IThread) => {
              return <Thread thread={thread}></Thread>;
            })}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PostDialog;
