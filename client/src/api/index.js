import axios from "axios";


const API = axios.create({baseURL: "https://black-pelican-hose.cyclic.app"})

API.interceptors.request.use((req) => {
  if(localStorage.getItem("profile")){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
  }
  return req
})

export const fetchPost = (id) => API.get("/posts/"+id)
export const fetchPosts = (page) => API.get("/posts?page="+page);
export const fetchPostsBySearch = (searchQuery) => API.get(
  `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags || 'none'}`
)
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatedPost = (id, updatedPost) =>
  API.patch("/posts/"+ id, updatedPost);
export const deletedPost = (id) => API.delete("/posts/" + id);
export const likePost = (id) => API.patch("/posts/" + id + "/likepost");



export const signIn = (fromData) => API.post("/users/signin", fromData)
export const signUp = (fromData) => API.post("/users/signup", fromData)