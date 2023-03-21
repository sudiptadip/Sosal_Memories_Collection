import axios from "axios";


const API = axios.create({baseURL: "http://localhost:5000"})

API.interceptors.request.use((req) => {
  if(localStorage.getItem("profile")){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
  }
  return req
})

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatedPost = (id, updatedPost) =>
  API.patch("/posts/"+ id, updatedPost);
export const deletedPost = (id) => API.delete("/posts/" + id);
export const likePost = (id) => API.patch("/posts/" + id + "/likepost");

export const signIn = (fromData) => API.post("/users/signin", fromData)
export const signUp = (fromData) => API.post("/users/signup", fromData)