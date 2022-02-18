import React, { MouseEventHandler, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Box } from "@mui/system";
import MediaCard from "../MediaCard/MediaCard";
import { IMedia } from "../../models/IMedia";
import { Grid } from "@mui/material";

const Home = () => {
  const [medias, setMedias] = useState([]);

  const fetchMedia = () => {
    axios({
      method: "GET",
      url: "https://localhost:4131/post/all",
    })
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setMedias(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#DAE0E6", pt: 5, height: "100vh" }}>
      <Grid container textAlign={"center"}>
        {medias.map((media: IMedia) => {
          return (
            <Grid item xl={3} md={3} sm={3} xs={3} lg={3}>
              <MediaCard
                id={media.id}
                title={media.title}
                description={media.description}
                mediaType={media.mediaType}
                fileType={media.fileType}
                like={media.like}
                dislike={media.dislike}
              ></MediaCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
