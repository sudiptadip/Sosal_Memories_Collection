const { Router } = require("express");
const { getPost, createPost, updatePost, delitePost, likePost } = require("../controller/post");

const routerpost = Router();

routerpost.get("/", getPost);
routerpost.post("/", createPost);
routerpost.patch("/:id", updatePost);
routerpost.delete("/:id", delitePost);
routerpost.patch("/:id/likepost", likePost)

module.exports = { routerpost };
