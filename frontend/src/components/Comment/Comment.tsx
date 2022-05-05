import { Button, Grid, TextField } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FC, useState } from "react";
import { config } from "../../Config";

const Comment: FC<any> = ({
  parentId,
  userEmail,
  closeComment,
  addThread,
  rows,
}) => {
  const [comment, setComment] = useState<string>("");

  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  const postComment = () => {
    if (comment.trim().length === 0) return;

    const thread = {
      content: comment,
      parentId: parentId,
      userEmail: userEmail,
    };

    axios({
      method: "POST",
      headers: {
        ApiKey: config.apiKey,
      },
      data: thread,
      url: `https://localhost:4131/thread`,
    })
      .then((response: AxiosResponse) => {
        closeComment(false);
        addThread(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  return (
    <Grid container flexDirection="column" sx={{ mb: 2 }}>
      <Grid item>
        <TextField
          fullWidth
          label=""
          multiline={true}
          rows={rows}
          onChange={handleChange}
          value={comment}
          placeholder="Share your thoughts"
          size="small"
          variant="outlined"
        ></TextField>
      </Grid>
      <Grid item alignSelf="flex-start">
        <Button
          sx={{
            color: "white",
            fontSize: "0.7em",
            py: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
          }}
          onClick={() => {
            postComment();
          }}
        >
          Post
        </Button>
        <Button
          sx={{
            color: "white",
            fontSize: "0.7em",
            py: 0,
            ml: 1,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
          }}
          onClick={() => {
            closeComment();
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default Comment;
