import {
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import axios, { AxiosResponse } from "axios";
import Comment from "../Comment/Comment";
import IThread from "../../models/IThread";
import { config } from "../../Config";

const Thread: FC<any> = ({ thread, currentUser, isParent }) => {
  const [subthreads, setSubThreads] = useState<any[]>([]);
  const [showComment, setShowComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesFetched, setRepliesFetched] = useState(false);
  const [self, setSelf] = useState<IThread>(thread);

  const fetchSubThreads = () => {
    axios({
      method: "GET",
      url: `https://localhost:4131/thread/${thread.id}`,
      headers: {
        ApiKey: config.apiKey,
      },
      responseType: "json",
    }).then((response: AxiosResponse) => {
      setSubThreads(response.data);
    });
  };

  const addThread = (thread: any) => {
    setSubThreads((subthreads: any[]) => [...subthreads, thread]);
    setRepliesFetched(true);
  };

  const likeThread = () => {
    if (!!!currentUser) return;
    axios({
      method: "POST",
      url: `https://localhost:4131/thread/like?threadId=${self.id}&userEmail=${currentUser}`,
      headers: {
        ApiKey: config.apiKey,
      },
      responseType: "json",
    }).then((response: AxiosResponse) => {
      var likes = self.like;
      var dislikes = self.dislike;

      if (dislikes.includes(currentUser)) {
        dislikes = dislikes.filter((email) => email !== currentUser);
      }

      if (likes.includes(currentUser)) {
        likes = likes.filter((email) => email !== currentUser);
      } else {
        likes.push(currentUser);
      }

      setSelf({
        ...self,
        like: likes,
        dislike: dislikes,
      });
    });
  };

  const dislikeThread = () => {
    if (!!!currentUser) return;
    axios({
      method: "POST",
      url: `https://localhost:4131/thread/dislike?threadId=${self.id}&userEmail=${currentUser}`,
      headers: {
        ApiKey: config.apiKey,
      },
      responseType: "json",
    }).then((response: AxiosResponse) => {
      var likes = self.like;
      var dislikes = self.dislike;

      if (likes.includes(currentUser)) {
        likes = likes.filter((email) => email !== currentUser);
      }

      if (dislikes.includes(currentUser)) {
        dislikes = dislikes.filter((email) => email !== currentUser);
      } else {
        dislikes.push(currentUser);
      }

      setSelf({
        ...self,
        like: likes,
        dislike: dislikes,
      });
    });
  };

  useEffect(() => {
    if (subthreads.length === 0) return;
    setShowReplies(true);
  }, [subthreads]);

  return (
    <Grid
      direction="column"
      container
      sx={{ borderLeft: !isParent ? "2px solid gray" : "0" }}
    >
      <Grid item sx={{ mb: 1, px: 2, mt: 1 }}>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderRadius: "0.5em",
          }}
        >
          <Typography variant="caption">
            {self.userEmail?.indexOf("@") === -1
              ? self.userEmail
              : self.userEmail?.substring(0, self.userEmail?.indexOf("@"))}
          </Typography>
          <Typography variant="caption" sx={{ ml: 1 }}>
            {new Date(self.creationDateTime).toLocaleString()}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "normal", mb: 1, mt: 1 }}
          >
            {self.content}
          </Typography>
          <IconButton
            sx={{
              fontSize: "0.7em",
              mb: 1,
              py: 0,
              color: self.like.includes(currentUser) ? "red" : "grey",
            }}
            onClick={() => {
              likeThread();
            }}
          >
            <Badge badgeContent={self.like.length}>
              <FavoriteIcon sx={{ ":hover": { color: "red" } }}></FavoriteIcon>
            </Badge>
          </IconButton>
          <IconButton
            sx={{
              fontSize: "0.7em",
              mb: 1,
              py: 0,
              color: self.dislike.includes(currentUser) ? "orange" : "grey",
            }}
            onClick={() => {
              dislikeThread();
            }}
          >
            <Badge badgeContent={self.dislike.length}>
              <HeartBrokenIcon
                sx={{ ":hover": { color: "orange" } }}
              ></HeartBrokenIcon>
            </Badge>
          </IconButton>
          {currentUser && (
            <Button
              sx={{
                color: "white",
                fontSize: "0.7em",
                mb: 1,
                py: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                ":hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
              onClick={() => {
                setShowComment(!showComment);
              }}
            >
              Reply
            </Button>
          )}
          <Button
            sx={{
              color: "white",
              fontSize: "0.7em",
              mb: 1,
              py: 0,
              ml: 2,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              ":hover": {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              },
            }}
            onClick={() => {
              if (subthreads.length <= 0) {
                fetchSubThreads();
                setRepliesFetched(true);
              }
              if (repliesFetched && subthreads.length > 0) {
                setShowReplies(!showReplies);
              }
            }}
          >
            {showReplies
              ? `Hide replies`
              : subthreads.length <= 0 && repliesFetched
              ? `No replies`
              : `View replies ${
                  subthreads.length > 0 ? `(${subthreads.length})` : ``
                }`}
          </Button>
        </Box>
      </Grid>
      <Grid item px={2}>
        {showComment && (
          <Comment
            closeComment={setShowComment}
            parentId={self.id}
            userEmail={self.userEmail}
            addThread={addThread}
          ></Comment>
        )}
        {showReplies &&
          subthreads.map((subthread) => {
            return (
              <Thread
                thread={subthread}
                isParent={false}
                currentUser={currentUser}
              ></Thread>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Thread;
