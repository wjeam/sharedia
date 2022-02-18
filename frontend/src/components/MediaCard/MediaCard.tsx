import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Container,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import { IMedia } from "../../models/IMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

const MediaCard: FC<IMedia> = ({
  id,
  title,
  description,
  fileType,
  mediaType,
  like,
  dislike,
}) => {
  return (
    <Card
      sx={{ maxWidth: "350px", maxHeight: "auto", display: "inline-block" }}
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
          }}
        />
      ) : (
        <video width="100%" height="auto" controls>
          <source
            src={`https://localhost:4131/post/media/${id}`}
            type={`video/${fileType}`}
          />
        </video>
      )}
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ display: "inline" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Container>
          <Tooltip title="Like">
            <IconButton sx={{ ":hover": { color: "red" } }}>
              <Badge badgeContent={Object.keys(like).length}>
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Dislike">
            <IconButton sx={{ ":hover": { color: "orange" } }}>
              <Badge badgeContent={Object.keys(dislike).length}>
                <HeartBrokenIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Container>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
