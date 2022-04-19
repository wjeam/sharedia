import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Link,
  Badge,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import axios, { AxiosResponse } from "axios";
import Comment from "../Comment/Comment";

const Thread: FC<any> = ({ thread }) => {
  const [subthreads, setSubThreads] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesFetched, setRepliesFetched] = useState(false);

  const fetchSubThreads = () => {
    axios({
      method: "GET",
      url: `https://localhost:4131/thread/${thread.id}`,
      responseType: "json",
    }).then((response: AxiosResponse) => {
      setSubThreads(response.data);
    });
  };

  useEffect(() => {
    if (subthreads.length == 0) return;
    setShowReplies(true);
  }, [subthreads]);

  return (
    <Grid direction="column" container>
      <Grid item sx={{ mb: 1, px: 2, mt: 1 }}>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderRadius: "0.5em",
          }}
        >
          <Typography variant="caption">
            {thread.userEmail?.substring(0, thread.userEmail?.indexOf("@"))}
          </Typography>
          <Typography variant="caption" sx={{ ml: 1 }}>
            {new Date(thread.creationDateTime).toLocaleString()}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "normal", mb: 1, mt: 1 }}
          >
            {thread.content}
          </Typography>
          <IconButton sx={{ fontSize: "0.7em", mb: 1, py: 0 }}>
            <FavoriteIcon sx={{ ":hover": { color: "red" } }}></FavoriteIcon>
          </IconButton>
          <IconButton sx={{ fontSize: "0.7em", mb: 1, py: 0 }}>
            <Badge badgeContent={2}>
              <HeartBrokenIcon
                sx={{ ":hover": { color: "orange" } }}
              ></HeartBrokenIcon>
            </Badge>
          </IconButton>
          <Button
            sx={{
              color: "white",
              fontSize: "0.7em",
              mb: 1,
              py: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            onClick={() => {
              setShowComment(!showComment);
            }}
          >
            Reply
          </Button>
          <Button
            sx={{
              color: "white",
              fontSize: "0.7em",
              mb: 1,
              py: 0,
              ml: 2,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
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
        {showComment && <Comment></Comment>}
        {showReplies &&
          subthreads.map((subthread) => {
            return <Thread thread={subthread}></Thread>;
          })}
      </Grid>
    </Grid>
  );
};

export default Thread;
