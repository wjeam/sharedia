import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Container,
  IconButton,
  Tooltip,
  Badge,
  Button,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import ShareIcon from "@mui/icons-material/Share";
import axios, { AxiosError } from "axios";

const MediaCard: FC<any> = ({
  media,
  currentUser,
  toggleOpenPost,
  updateRating,
}) => {
  const [dislikes, setDislikes] = useState(media.dislike);
  const [likes, setLikes] = useState(media.like);

  const likePost = () => {
    if (!!!currentUser) return;
    axios({
      method: "POST",
      url: `https://localhost:4131/post/like?postId=${media.id}&userEmail=${currentUser}`,
    })
      .then(() => {
        const postLiked = likes.hasOwnProperty(currentUser);
        const postDisliked = dislikes.hasOwnProperty(currentUser);

        if (!postLiked) {
          setLikes((likes: any) => ({
            ...likes,
            [currentUser]: 1,
          }));
        } else {
          setLikes((likes: any) =>
            Object.keys(likes).filter((email) => email != currentUser)
          );
        }

        if (postDisliked) {
          setDislikes((dislikes: any) =>
            Object.keys(dislikes).filter((email) => email != currentUser)
          );
        }
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  useEffect(() => {
    updateRating(media.id, { likes: likes, dislikes: dislikes });
  }, [likes, dislikes]);

  const dislikePost = () => {
    if (!!!currentUser) return;

    axios({
      method: "POST",
      url: `https://localhost:4131/post/dislike?postId=${media.id}&userEmail=${currentUser}`,
    })
      .then(() => {
        const postLiked = likes.hasOwnProperty(currentUser);
        const postDisliked = dislikes.hasOwnProperty(currentUser);

        if (!postDisliked) {
          setDislikes((dislikes: any) => ({
            ...dislikes,
            [currentUser]: 1,
          }));
        } else {
          setDislikes((dislikes: any) =>
            Object.keys(dislikes).filter((email) => email != currentUser)
          );
        }

        if (postLiked) {
          setLikes((likes: any) =>
            Object.keys(likes).filter((email) => email != currentUser)
          );
        }
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  return (
    <Card
      sx={{
        maxWidth: "350px",
        maxHeight: "auto",
        display: "inline-block",
        mb: 7,
      }}
    >
      {media.mediaType == 1 ? (
        <CardMedia
          onClick={() => {
            toggleOpenPost(true, media);
          }}
          component={"img"}
          height="200"
          src={`https://localhost:4131/post/media/${media.id}`}
          sx={{
            maxWidth: "100%",
            minWidth: "300px",
            height: "auto",
            maxHeight: "300px",
            filter: media.isAdult ? "blur(0.6rem)" : "blur(0)",
            ":hover": { filter: "blur(0)" },
            cursor: "pointer",
          }}
        ></CardMedia>
      ) : (
        <Box
          sx={{
            filter: media.isAdult ? "blur(0.6rem)" : "blur(0)",
            ":hover": { filter: "blur(0)" },
          }}
        >
          <video width="100%" height="auto" controls>
            <source
              style={{ cursor: "pointer" }}
              src={`https://localhost:4131/post/media/${media.id}`}
              type={`video/${media.fileType}`}
            />
          </video>
        </Box>
      )}
      <CardContent sx={{ py: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            whiteSpace: "initial",
            fontSize: "1.2em",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {media.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "inline",
            whiteSpace: "initial",
            wordWrap: "break-word",
            color: "rgba(0, 0, 0, 0.7)",
          }}
        >
          {media.description}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <Container>
          <Tooltip title="Like">
            <IconButton
              sx={{
                ":hover": { color: "red" },
                color: currentUser in likes ? "red" : "rgba(0, 0, 0, 0.5)",
              }}
              onClick={likePost}
            >
              <Badge badgeContent={Object.keys(likes).length}>
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Dislike">
            <IconButton
              sx={{
                ":hover": { color: "orange" },
                color:
                  currentUser in dislikes ? "orange" : "rgba(0, 0, 0, 0.5)",
              }}
              onClick={dislikePost}
            >
              <Badge badgeContent={Object.keys(dislikes).length}>
                <HeartBrokenIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy to clipboard">
            <IconButton
              sx={{
                ":hover": { color: "blue" },
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://localhost:4131/post/media/" + media.id
                );
              }}
            >
              <ShareIcon></ShareIcon>
            </IconButton>
          </Tooltip>
          <Typography variant="caption" sx={{ display: "block" }}>
            Uploaded by {media.userEmail}
          </Typography>
        </Container>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
