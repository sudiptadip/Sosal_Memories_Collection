import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Delete, MoreHoriz, ThumbUp } from "@material-ui/icons";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../action/posts";

function Post({
  selectedFile,
  title,
  name,
  creator,
  createAt,
  tags,
  message,
  likes,
  setCurrentId,
  _id,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checkLike, setCheckLike] = useState(false);
  function Like_Post(){
      dispatch(likePost(_id));
      let like = likes.filter((e) => e === JSON.parse(localStorage.getItem("profile"))?.result._id)
      if(like.length > 0){
        setCheckLike(true)
      }else{
        setCheckLike(false)
      }
      console.log(like)
  }

  useEffect(() => {
    let like = likes.filter((e) => e === JSON.parse(localStorage.getItem("profile"))?.result._id)
      if(like.length > 0){
        setCheckLike(true)
      }else{
        setCheckLike(false)
      }
  },[likes,dispatch])

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} component='div' title={title} />
      <div className={classes.overlay}>
        <Typography variant="h6"> {name} </Typography>
        <Typography variant="body2"> {moment(createAt).fromNow()} </Typography>
      </div>
      <div className={classes.overlay2}>
        {JSON.parse(localStorage.getItem("profile"))?.result?._id === creator ? (
          <Button
            style={{ color: "white" }}
            size={"small"}
            onClick={() => setCurrentId(_id)}
          >
            <MoreHoriz fontSize="medium" />
          </Button>
        ) : <></>}
      </div>
      <div className={classes.details}>
        <Typography variant="body2"> {tags.map((e) => `#${e} `)} </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component={"p"}>
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color={checkLike ? "primary" : "inherit"}
          onClick={Like_Post}
        >
          <ThumbUp fontSize="small" />
          &nbsp; Like &nbsp;
          {likes.length}
        </Button>
        {JSON.parse(localStorage.getItem("profile"))?.result?._id === creator ? (
          <Button
            size="small"
            style={{ color: "red" }}
            onClick={() => {
              dispatch(deletePost(_id));
            }}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        ) : <></>}
      </CardActions>
    </Card>
  );
}

export default Post;
