import axios from "axios";
// "https://reqres.in/api/users?page=2"

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatedPost = (id, updatedPost) =>
  axios.patch(url + "/" + id, updatedPost);
export const deletedPost = (id) => axios.delete(url + "/" + id);
export const likePost = (id) => axios.patch(url + "/" + id + "/likepost");
