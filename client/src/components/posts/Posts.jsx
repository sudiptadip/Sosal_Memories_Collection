import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./post/Post";
import useStyles from "./style";
import { useSelector } from "react-redux";

function Posts({ setCurrentId }) {
  const classes = useStyles();
  const posts = useSelector((e) => e.posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems={"stretch"}
      spacing={3}
    >
      {posts.map((e, i) => (
        <Grid key={i} item xs={12} sm={6}>
          <Post setCurrentId={setCurrentId} {...e} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
