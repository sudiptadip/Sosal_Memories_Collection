import React from "react";
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
  creator,
  createAt,
  tags,
  message,
  linkCount,
  setCurrentId,
  _id,
}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant="h6"> {creator} </Typography>
        <Typography variant="body2"> {moment(createAt).fromNow()} </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size={"small"} onClick={() => setCurrentId(_id)}>
          <MoreHoriz fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2"> {tags.map((e) => `#${e} `)} </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom >
        {title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component={'p'}>
          {message}
        </Typography>
      </CardContent> 
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {dispatch(likePost(_id))}}>
          <ThumbUp fontSize="small" />
          &nbsp; Like &nbsp;
          {linkCount}
        </Button>
        <Button size="small" style={{color: "red"}} onClick={() => {dispatch(deletePost(_id))}}>
          <Delete fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
