import { useEffect, useState, FC } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Box } from "@mui/system";
import MediaCard from "../MediaCard/MediaCard";
import { IMedia } from "../../models/IMedia";
import { Grid, Badge } from "@mui/material";
import PostDialog from "../PostDialog/PostDialog";
import { FilterType } from "../../models/FilterType";
import Navbar from "../Navbar/Navbar";
import { config } from "../../Config";

const Home: FC<any> = ({ client, isAdult, login, logout, handleRedirect }) => {
  const [medias, setMedias] = useState<IMedia[]>([]);
  const [postDialogOpen, setPostDialogOpen] = useState<boolean>(false);
  const [postShown, setPostShown] = useState<IMedia | undefined>(undefined);
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (isAdult === null) return;
    console.log(isAdult);

    const fetchMedia = () => {
      axios({
        method: "GET",
        headers: {
          ApiKey: config.apiKey,
        },
        url: `https://localhost:4131/post/${!isAdult ? "minor" : "all"}`,
      })
        .then((response: AxiosResponse) => {
          setMedias(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    };

    fetchMedia();
  }, [isAdult]);

  const deleteMedia = (id: string) => {
    axios({
      method: "DELETE",
      url: `https://localhost:4131/post/${id}`,
      headers: {
        ApiKey: config.apiKey,
      },
      responseType: "json",
    }).then((response: AxiosResponse) => {
      setMedias(medias.filter((media: IMedia) => media.id !== id));
      toggleOpenPost(false);
    });
  };

  const addMedia = (media: IMedia) => {
    setMedias([...medias, media]);
  };

  const toggleOpenPost = (value: boolean, media?: IMedia) => {
    setPostDialogOpen(value);
    setPostShown(media);
  };

  const toggleOpenPostReport = (id: string) => {
    console.log(medias.find((media: IMedia) => media.id === id));
    setPostDialogOpen(true);
    setPostShown(medias.find((media: IMedia) => media.id === id));
  };

  const handleFilterChange = (value: string) => {
    setSort(value);
  };

  const sortBy = (filter: string, array: IMedia[]) => {
    return filterBy(search, array).sort((a: IMedia, b: IMedia) => {
      if ((filter as FilterType) === FilterType.LIKE) {
        return Object.keys(b.like).length < Object.keys(a.like).length
          ? -1
          : Object.keys(b.like).length > Object.keys(a.like).length
          ? 1
          : 0;
      }
      if ((filter as FilterType) === FilterType.DISLIKE) {
        return Object.keys(b.dislike).length < Object.keys(a.dislike).length
          ? -1
          : Object.keys(b.dislike).length > Object.keys(a.dislike).length
          ? 1
          : 0;
      }
      return 0;
    });
  };

  const filterBy = (filter: string, array: IMedia[]) => {
    return array.filter((element: IMedia) => {
      return (
        (element.title.toLocaleLowerCase().includes(filter) ||
          element.description.toLocaleLowerCase().includes(filter)) &&
        ((sort as FilterType) === FilterType.ADULT ? element.isAdult : true)
      );
    });
  };

  const updateRating = (id: string, ratings: { likes: []; dislikes: [] }) => {
    medias
      .filter((media: IMedia) => media.id === id)
      .map((media: IMedia) => {
        media.like = ratings.likes;
        media.dislike = ratings.dislikes;
        return media;
      });
  };

  return (
    <>
      <Navbar
        login={login}
        logout={logout}
        client={client}
        isAdult={isAdult}
        setSearch={setSearch}
        search={search}
        handleFilterChange={handleFilterChange}
        sort={sort}
        handleRedirect={handleRedirect}
        addMedia={addMedia}
        toggleOpenPostReport={toggleOpenPostReport}
      />
      <Box sx={{ pt: 3 }}>
        <Grid container textAlign={"center"}>
          {sortBy(sort, medias).map((media: IMedia) => {
            return (
              <Grid
                item
                xl={3}
                md={6}
                sm={6}
                xs={12}
                lg={3}
                key={media.id}
                alignSelf="center"
              >
                <Badge
                  key={media.id}
                  badgeContent={"18+"}
                  color="error"
                  invisible={!media.isAdult}
                >
                  <MediaCard
                    media={media}
                    updateRating={updateRating}
                    currentUser={client?.getActiveAccount()?.username}
                    toggleOpenPost={toggleOpenPost}
                  />
                </Badge>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {postDialogOpen && (
        <PostDialog
          open={postDialogOpen}
          toggleOpen={toggleOpenPost}
          media={postShown}
          deleteMedia={deleteMedia}
          currentUser={client?.getActiveAccount()?.username}
        ></PostDialog>
      )}
    </>
  );
};

export default Home;
