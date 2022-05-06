import { Button, Dialog, Grid, IconButton, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { config } from "../../Config";
import IThread from "../../models/IThread";
import { MediaType } from "../../models/MediaType";
import Comment from "../Comment/Comment";
import ReportButton from "../Report/ReportButton";
import Thread from "../Thread/Thread";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./PostDialog.scss";

const PostDialog: FC<any> = ({
  open,
  toggleOpen,
  media,
  currentUser,
  deleteMedia,
}) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sourceRef = useRef<HTMLSourceElement | null>(null);

  const [threads, setThreads] = useState<IThread[]>([]);
  const [showComment, setShowComment] = useState<boolean>();

  useEffect(() => {
    const fetchThreads = () => {
      axios({
        method: "GET",
        url: `https://localhost:4131/thread/${media.id}`,
        headers: {
          ApiKey: config.apiKey,
        },
        responseType: "json",
      }).then((response: AxiosResponse) => {
        setThreads(response.data);
      });
    };

    fetchThreads();
  }, []);

  const handleOnClose = (_: any, reason: string) => {
    if (reason === "backdropClick") {
      toggleOpen(false, undefined);
    }
  };

  const addThread = (thread: IThread) => {
    setThreads((threads: IThread[]) => [...threads, thread]);
  };

  useEffect(() => {
    if (!open) return;

    axios({
      method: "GET",
      headers: {
        ApiKey: config.apiKey,
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

  const deleteThread = (id: string) => {
    axios({
      method: "DELETE",
      url: `https://localhost:4131/thread/${id}`,
      headers: {
        ApiKey: config.apiKey,
      },
      responseType: "json",
    }).then((response: AxiosResponse) => {
      setThreads(threads.filter((thread: IThread) => thread.id != id));
    });
  };

  useEffect(() => {
    if (videoRef.current === null) return;
    videoRef.current.load();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth={true}
      maxWidth={"md"}
      PaperProps={{
        sx: {
          "::-webkit-scrollbar": { width: 0, background: "transparent" },
        },
      }}
    >
      <Grid container flexDirection={"column"}>
        <Grid item alignSelf={"flex-end"}>
          <IconButton
            onClick={() => {
              toggleOpen(false, undefined);
            }}
          >
            <HighlightOffIcon></HighlightOffIcon>
          </IconButton>
        </Grid>
        <Grid item alignSelf="center" textAlign="center">
          {media &&
            (media.mediaType === MediaType.Image ? (
              <img
                src={image?.src}
                style={{
                  width: image?.width ?? 0 * 0.7,
                  maxWidth: "97%",
                  height: "auto",
                  marginLeft: "auto",
                  marginTop: "2em",
                  marginRight: "auto",
                  marginBottom: "2em",
                }}
              />
            ) : (
              <video
                ref={videoRef}
                controls
                style={{
                  marginLeft: "auto",
                  marginTop: "1em",
                  marginRight: "auto",
                  maxWidth: "97%",
                  marginBottom: "2em",
                  cursor: "pointer",
                }}
              >
                <source
                  id={`dialog_video_${media?.id}`}
                  ref={sourceRef}
                  type={`video/${media.fileType}`}
                />
              </video>
            ))}
        </Grid>
        <Grid
          item
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            pt: 2,
            mx: "auto",
            width: 0.96,
          }}
        >
          <Grid item px={3} mb={!currentUser ? 5 : 0}>
            <Typography variant="body2">
              <Typography variant="caption">
                Posted by {media.userEmail}
              </Typography>
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(0, 0, 0, 0.8)" }}>
              {media.title}
            </Typography>
            <Typography mt={1} variant="body2">
              {media.description}
            </Typography>
          </Grid>
          {currentUser && (
            <Grid item mt={4}>
              <Button
                sx={{
                  color: "white",
                  fontSize: "0.7em",
                  mr: 1,
                  px: 2,
                  ml: 3,
                  textTransform: "capitalize",
                  py: 0.5,
                  mb: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  ":hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                  },
                }}
                onClick={() => {
                  setShowComment(!showComment);
                }}
              >
                Post a reply!
              </Button>
              <ReportButton
                postId={media.id}
                reporterEmail={currentUser}
              ></ReportButton>
              {media.userEmail == currentUser ||
                (config.admins.includes(currentUser) && (
                  <Button
                    sx={{
                      color: "white",
                      fontSize: "0.7em",
                      mr: 1,
                      px: 2,
                      py: 0.5,
                      textTransform: "capitalize",
                      mb: 2,
                      backgroundColor: "rgba(255, 0, 0, 0.6)",
                      ":hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.8)",
                      },
                    }}
                    onClick={() => {
                      deleteMedia(media.id);
                    }}
                  >
                    Delete
                  </Button>
                ))}
            </Grid>
          )}
        </Grid>
        <Grid item sx={{ px: 2, mt: 2 }}>
          {showComment && (
            <Comment
              closeComment={setShowComment}
              parentId={media.id}
              userEmail={currentUser}
              addThread={addThread}
              rows={4}
            ></Comment>
          )}
        </Grid>
        <Grid item mb={1}>
          {threads &&
            threads.map((thread: IThread) => {
              return (
                <Thread
                  key={thread.id}
                  thread={thread}
                  isParent={true}
                  deleteParentThread={deleteThread}
                  currentUser={currentUser}
                ></Thread>
              );
            })}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PostDialog;
