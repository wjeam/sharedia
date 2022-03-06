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
  id,
  title,
  description,
  fileType,
  mediaType,
  like,
  dislike,
  isAdult,
  userEmail,
  currentUser,
}) => {
  const [dislikes, setDislikes] = useState(dislike);
  const [likes, setLikes] = useState(like);

  const likePost = () => {
    axios({
      method: "POST",
      url: `https://localhost:4131/post/like?postId=${id}&userEmail=${currentUser}`,
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

  const dislikePost = () => {
    axios({
      method: "POST",
      url: `https://localhost:4131/post/dislike?postId=${id}&userEmail=${currentUser}`,
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
      {mediaType == 1 ? (
        <CardMedia
          component={"img"}
          height="200"
          src={`https://localhost:4131/post/media/${id}`}
          sx={{
            maxWidth: "100%",
            minWidth: "300px",
            height: "auto",
            maxHeight: "300px",
            filter: isAdult ? "blur(0.3rem)" : "blur(0)",
            ":hover": { filter: "blur(0)" },
          }}
        ></CardMedia>
      ) : (
        <Box
          sx={{
            filter: isAdult ? "blur(0.3rem)" : "blur(0)",
            ":hover": { filter: "blur(0)" },
          }}
        >
          <video width="100%" height="auto" controls>
            <source
              src={`https://localhost:4131/post/media/${id}`}
              type={`video/${fileType}`}
            />
          </video>
        </Box>
      )}
      <CardContent sx={{ py: 1 }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ display: "inline" }}>
          {description}
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
                  "https://localhost:4131/post/media/" + id
                );
              }}
            >
              <ShareIcon></ShareIcon>
            </IconButton>
          </Tooltip>
          <Typography variant="caption" sx={{ display: "block" }}>
            Uploaded by {userEmail}
          </Typography>
        </Container>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
