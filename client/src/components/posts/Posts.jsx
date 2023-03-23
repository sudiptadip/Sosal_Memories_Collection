import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./post/Post";
import useStyles from "./style";
import { useSelector } from "react-redux";

function Posts({ setCurrentId }) {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((e) => e.posts);
  console.log(posts)
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems={"stretch"}
      spacing={3}
    >
      {posts.map((e, i) => (
        i <= 7 &&
        <Grid key={i} item xs={12} sm={12} lg={3} md={6}>
          <Post setCurrentId={setCurrentId} {...e} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
