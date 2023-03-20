import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "../../action/posts";
import Posts from "../posts/Posts";
import From from "../form/Form";

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <From setCurrentId={setCurrentId} currentId={currentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default Home;
