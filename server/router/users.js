const { Router } = require("express");
const { signin, signup } = require("../controller/user");


const userRouterPost = Router();


userRouterPost.post("/signup",signup)
userRouterPost.post("/signin",signin)



module.exports = {
    userRouterPost
}