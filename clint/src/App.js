import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Posts from "./components/posts/Posts";
import From from "./components/form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import {getPosts} from "./action/posts"

function App() {
  const [currentId,setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  },[currentId, dispatch])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src="https://cdn.pixabay.com/photo/2020/12/13/16/37/woman-5828787__340.jpg"
          alt=""
          height={"60"}
        />
      </AppBar>
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
              <From setCurrentId={setCurrentId} currentId={currentId}  />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
