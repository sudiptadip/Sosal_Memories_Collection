const { Router } = require("express");
const {
  getPost,
  createPost,
  updatePost,
  delitePost,
  likePost,
  getPostBySearch,
  getSinglePost,
} = require("../controller/post");
const { auth } = require("../middleware/auth");

const routerpost = Router();

routerpost.get("/", getPost);
routerpost.get("/search", getPostBySearch);
routerpost.get("/:id", getSinglePost);
routerpost.post("/", auth, createPost);
routerpost.patch("/:id", auth, updatePost);
routerpost.delete("/:id", auth, delitePost);
routerpost.patch("/:id/likepost", auth, likePost);

module.exports = { routerpost };
