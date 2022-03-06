import React, { useEffect, useState, FC } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Box } from "@mui/system";
import MediaCard from "../MediaCard/MediaCard";
import { IMedia } from "../../models/IMedia";
import { Grid, Button, Badge } from "@mui/material";

const Home: FC<any> = ({ client, isAdult }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    if (isAdult === undefined) return;
    fetchMedia();
  }, [isAdult]);

  const fetchMedia = () => {
    axios({
      method: "GET",
      url: `https://localhost:4131/post/${isAdult ? "all-adult" : "all"}`,
    })
      .then((response: AxiosResponse) => {
        setMedias(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ backgroundColor: "#DAE0E6", pt: 5, height: "100%" }}>
      <Grid container textAlign={"center"}>
        {medias.map((media: IMedia) => {
          return (
            <Grid item xl={3} md={3} sm={3} xs={3} lg={3} alignSelf="center">
              <Badge
                badgeContent={"18+"}
                color="error"
                invisible={!media.isAdult}
              >
                <MediaCard
                  id={media.id}
                  title={media.title}
                  description={media.description}
                  mediaType={media.mediaType}
                  fileType={media.fileType}
                  like={media.like}
                  dislike={media.dislike}
                  isAdult={media.isAdult}
                  userEmail={media.userEmail}
                  currentUser={client.getActiveAccount()?.username}
                />
              </Badge>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
