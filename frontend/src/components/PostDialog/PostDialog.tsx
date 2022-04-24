import { Box, Button, Dialog, Grid, Paper, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useRef, useState } from "react";
import IThread from "../../models/IThread";
import { MediaType } from "../../models/MediaType";
import Thread from "../Thread/Thread";

const PostDialog: FC<any> = ({ open, toggleOpen, media }) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sourceRef = useRef<HTMLSourceElement | null>(null);

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = () => {
    axios({
      method: "GET",
      url: `https://localhost:4131/thread/${media.id}`,
      headers: {
        ApiKey: "12345",
      },
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
    if (!open) return;

    axios({
      method: "GET",
      headers: {
        ApiKey: "12345",
      },
      responseType: "arraybuffer",
      url: `https://localhost:4131/post/media/${media.id}`,
    }).then((response: AxiosResponse) => {
      let type = response.headers["Content-Type"];
      let blob = new Blob([response.data], { type: type });

      switch (media.mediaType) {
        case MediaType.Image:
          let image = new Image();
          image.src = URL.createObjectURL(blob);
          image.onload = () => {
            setImage(image);
          };
          break;
        case MediaType.Video:
          let videoFile = new File([response.data], media.fileName);

          if (sourceRef?.current != null && videoRef?.current != null) {
            sourceRef.current.src = URL.createObjectURL(videoFile);
            videoRef.current.load();
            videoRef.current.onload = () => {
              videoRef?.current?.play();
            };
          }

          break;
      }
    });
  }, [open]);

  useEffect(() => {
    if (video == null || videoRef.current == null) return;
    videoRef.current.load();
  }, [video]);

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <Grid container flexDirection={"column"}>
        <Grid item alignSelf="center">
          {media &&
            (media.mediaType == MediaType.Image ? (
              <img
                src={image?.src}
                style={{
                  width: image?.width ?? 0 * 0.7,
                  height: image?.height ?? 0 * 0.7,
                  marginLeft: "auto",
                  marginTop: "2em",
                  marginRight: "auto",
                  marginBottom: "2em",
                }}
              />
            ) : (
              <video ref={videoRef} controls>
                <source
                  id={`dialog_video_${media?.id}`}
                  ref={sourceRef}
                  style={{ cursor: "pointer" }}
                  type={`video/${media.fileType}`}
                />
              </video>
            ))}
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
              return (
                <Thread thread={thread} userEmail={media.userEmail}></Thread>
              );
            })}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PostDialog;
