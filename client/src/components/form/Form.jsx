import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../action/posts";
import { useNavigate } from "react-router-dom";

function Form({ setCurrentId, currentId }) {
  const post = useSelector((e) =>
    currentId ? e.posts.posts.find((x) => x._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  function Clear() {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  }
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const HandelSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name },navigate));
    }
    Clear();
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign_in to create your own memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper elevation={6} className={classes.paper}>
      <form
        action=""
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={HandelSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Upadate Your Memory" : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div style={{ padding: "15px", }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant={"contained"}
          color={"primary"}
          size={"large"}
          type={"submit"}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant={"contained"}
          color={"secondary"}
          size={"small"}
          type={"submit"}
          fullWidth
          onClick={Clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
