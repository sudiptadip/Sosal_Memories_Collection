import * as api from "../api";
import { Toast } from "../components/tost/Toast";
import { CREATE, DELETE, FETCH_ALL, UPDATE } from "./action.Type";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.group(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    Toast("success","Successfuly Added your post")
  } catch (error) {
    Toast("error", "image size should be less than 50 kb");
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const {data} = await api.updatedPost(id, post);
    dispatch({ type: UPDATE, payload: data });
    Toast("error", "image size should be less than 50 kb");
  } catch (error) {
    Toast("error", "image size should be less than 50 kb");
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletedPost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
