import { FC, useEffect, useRef, useState } from "react";
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
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import ShareIcon from "@mui/icons-material/Share";
import ReplyIcon from "@mui/icons-material/Reply";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MediaType } from "../../models/MediaType";
import { config } from "../../Config";

const MediaCard: FC<any> = ({
  media,
  currentUser,
  toggleOpenPost,
  updateRating,
}) => {
  const [dislikes, setDislikes] = useState(media.dislike);
  const [likes, setLikes] = useState(media.like);
  const [url, setUrl] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchFile = () => {
      axios({
        method: "GET",
        headers: {
          ApiKey: config.apiKey,
        },
        responseType: "arraybuffer",
        url: `https://localhost:4131/post/media/${media.id}`,
      })
        .then((response: AxiosResponse) => {
          switch (media.mediaType) {
            case MediaType.Image:
              let type = response.headers["Content-Type"];
              let imageBlob = new Blob([response.data], { type: type });

              setUrl(URL.createObjectURL(imageBlob));
              break;
            case MediaType.Video:
              let video = new File([response.data], media.fileName);
              setUrl(URL.createObjectURL(video));
              break;
          }
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    };

    fetchFile();
  }, []);

  useEffect(() => {
    if (media.mediaType === 0) {
      videoRef.current?.load();
    }
  }, [url]);

  const likePost = () => {
    if (!!!currentUser) return;

    axios({
      method: "POST",
      headers: {
        ApiKey: config.apiKey,
      },
      url: `https://localhost:4131/post/like?postId=${media.id}&userEmail=${currentUser}`,
    })
      .then(() => {
        console.log(likes);

        const postLiked = likes.includes(currentUser);
        const postDisliked = dislikes.includes(currentUser);

        if (!postLiked) {
          setLikes((likes: any) => [...likes, currentUser]);
        } else {
          setLikes((likes: any) =>
            likes.filter((email: string) => email !== currentUser)
          );
        }

        if (postDisliked) {
          setDislikes((dislikes: any) =>
            dislikes.filter((email: string) => email !== currentUser)
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
    console.log(dislikes);
    if (!!!currentUser) return;

    axios({
      method: "POST",
      headers: {
        ApiKey: config.apiKey,
      },
      url: `https://localhost:4131/post/dislike?postId=${media.id}&userEmail=${currentUser}`,
    })
      .then(() => {
        const postLiked = likes.includes(currentUser);
        const postDisliked = dislikes.includes(currentUser);

        if (!postDisliked) {
          setDislikes((dislikes: any) => [...dislikes, currentUser]);
        } else {
          setDislikes((dislikes: any) =>
            dislikes.filter((email: string) => email !== currentUser)
          );
        }

        if (postLiked) {
          setLikes((likes: any) =>
            likes.filter((email: string) => email !== currentUser)
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
      {media.mediaType === MediaType.Image ? (
        <CardMedia
          onClick={() => {
            toggleOpenPost(true, media);
          }}
          component={"img"}
          height="200"
          src={url}
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
          <video
            width="100%"
            height="auto"
            controls
            ref={videoRef}
            onClick={() => {
              toggleOpenPost(true, media);
              videoRef?.current?.paused
                ? videoRef?.current?.play()
                : videoRef?.current?.pause();
            }}
          >
            <source
              id={`video_${media.id}`}
              style={{ cursor: "pointer" }}
              src={url}
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
                color: likes.includes(currentUser)
                  ? "red"
                  : "rgba(0, 0, 0, 0.5)",
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
                color: dislikes.includes(currentUser)
                  ? "orange"
                  : "rgba(0, 0, 0, 0.5)",
              }}
              onClick={dislikePost}
            >
              <Badge badgeContent={Object.keys(dislikes).length}>
                <HeartBrokenIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Comment">
            <IconButton
              sx={{
                ":hover": { color: "green" },
                color: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => {
                toggleOpenPost(true, media);
              }}
            >
              <ReplyIcon />
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
