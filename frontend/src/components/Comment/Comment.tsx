import { Button, Grid, TextField } from "@mui/material";

const Comment = () => {
  return (
    <Grid container flexDirection="column">
      <Grid item>
        <TextField
          fullWidth
          label=""
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
          }}
        >
          Post
        </Button>
      </Grid>
    </Grid>
  );
};

export default Comment;
