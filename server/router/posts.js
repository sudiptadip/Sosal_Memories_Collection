const { Router } = require("express");
const { getPost, createPost, updatePost, delitePost, likePost } = require("../controller/post");
const { auth } = require("../middleware/auth");

const routerpost = Router();

routerpost.get("/", getPost);
routerpost.post("/", auth, createPost);
routerpost.patch("/:id",auth, updatePost);
routerpost.delete("/:id",auth, delitePost);
routerpost.patch("/:id/likepost",auth, likePost)

module.exports = { routerpost };
