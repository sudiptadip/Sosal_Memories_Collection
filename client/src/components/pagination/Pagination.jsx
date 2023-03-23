import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";

function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const { numberOfPages } = useSelector((e) => e.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page)}
      variant={"outlined"}
      color={"primary"}
      renderItem={(e) => (
        <PaginationItem {...e} component={Link} to={"/posts?page=" + e.page} />
      )}
    />
  );
}

export default Paginate;
