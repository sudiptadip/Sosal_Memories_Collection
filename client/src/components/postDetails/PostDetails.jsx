import {
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../action/posts";
import useStyles from "./styles";

function PostDetails() {
  const classes = useStyles();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const openPost = (id) => {
    navigate(`/posts/${id}`)
  }

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  
  useEffect(() => {
    if(post){
      dispatch(getPostsBySearch({search: 'none', tags: post?.tags?.join(',')}))
    }
  },[post,dispatch])

  const recomendedPosts = posts.filter(({_id}) => _id !== post._id)
  console.log(recomendedPosts)
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size={"7rem"} />
      </Paper>
    );
  }
  return (
    <Paper>
      <div className={classes.card} >
      <div className={classes.section}>
        <Typography variant="h3" component="h2">
          {post.title}
        </Typography>
        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags && post.tags.map((tag) => `#${tag} `)}</Typography>
        <Typography gutterBottom variant="body1" component="p">
          {post.message}
        </Typography>
        <Typography variant="h6">Created by: {post.name}</Typography>
        <Typography variant="body1">
          {moment(post.createAt).fromNow()}
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1">
          <strong>Realtime Chat - coming soon!</strong>
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1">
          <strong>Comments - coming soon!</strong>
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
      </div>
      <div className={classes.imageSection}>
        <img
          className={classes.media}
          src={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt={post.title}
        />
      </div>
      </div>
      {
            recomendedPosts.length && 
            <div className={classes.section} >
              <Typography gutterBottom variant="h5" >You might also like:</Typography>
              <Divider />
              <div className={classes.recommendedPosts}>
                  {
                    recomendedPosts.map((e) => (
                      <div style={{cursor: 'pointer', margin: '20px'}} onClick={() => openPost(e._id)} key={e._id} >
                        <Typography gutterBottom variant="h6" >{e.title}</Typography>
                        <Typography gutterBottom variant="subtitle2" >{e.name}</Typography>
                        <Typography style={{ maxHeight: "5.8em", overflow: "hidden" }} gutterBottom variant="subtitle2" >{e.message}</Typography>
                        <Typography gutterBottom variant="subtitle1" >Likes : - {e.likes.length}</Typography>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        <img src={e.selectedFile} alt={e.title} width='200px' style={{margin: 'auto'}} />
                        </div>
                      </div>
                    ))
                  }
              </div>
            </div>
          }
    </Paper>
  );
}

export default PostDetails;
