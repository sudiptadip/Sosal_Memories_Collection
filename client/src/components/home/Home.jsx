import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../action/posts";
import Posts from "../posts/Posts";
import From from "../form/Form";
import Paginate from "../pagination/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState([]);

  function handelKeyPress(e) {
    if (e.keyCode === 13) {
    }
  }

  function handelAdd(e) {
    setTag([...tag, e]);
  }
  function handelDelete(e) {
    setTag(tag.filter((x) => e !== x));
  }
  function searchPost(e) {
    if(search.trim() || tag){
      dispatch(getPostsBySearch({search, tags: tag.join(',')}))
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tag.join(',') || 'none'}`)
    }else{
      navigate('/')
    }
  }

  return (
    <Container maxWidth="xl">
      <Grow in>
        <Container maxWidth={"xl"}>
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position={"static"}
                color={"inherit"}
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label={"search memories"}
                  fullWidth
                  onKeyPress={handelKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tag}
                  onAdd={handelAdd}
                  onDelete={handelDelete}
                  label={"search tag"}
                  variant={"outlined"}
                />
                <Button
                  className={classes.searchButton}
                  color={"primary"}
                  onClick={searchPost}
                  variant='contained'
                >
                  Search
                </Button>
              </AppBar>
              <From setCurrentId={setCurrentId} currentId={currentId} />
              <Paper>
                <Paginate page={page} className={classes.pagination} elevation={6} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default Home;
