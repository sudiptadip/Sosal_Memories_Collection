import * as api from "../api";
import { Toast } from "../components/tost/Toast";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LOADING_END,
  LOADING_START,
  UPDATE,
} from "./action.Type";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    const { data } = await api.fetchPost(id);
    console.log(data)
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type: LOADING_END})
  } catch (error) {
    console.group(error.message);
    dispatch({type: LOADING_END})
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type: LOADING_END})
  } catch (error) {
    console.group(error.message);
    dispatch({type: LOADING_END})
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({type: LOADING_END})
  } catch (error) {
    dispatch({type: LOADING_END})
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    // navigate("/");
    console.log(data);
    Toast("success", "Successfuly Added your post");
    dispatch({type: LOADING_END})
  } catch (error) {
    // Toast("error", "image size should be less than 50 kb");
    console.log(error);
    dispatch({type: LOADING_END})
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_START });
    const { data } = await api.updatedPost(id, post);
    dispatch({ type: UPDATE, payload: data });
    Toast("success", "Successfuly edited");
    dispatch({type: LOADING_END})
  } catch (error) {
    Toast("error", "image size should be less than 50 kb");
    dispatch({type: LOADING_END})
  }
};

export const deletePost = (id,navigate) => async (dispatch) => {
  try {
    await api.deletedPost(id);
    dispatch({ type: DELETE, payload: id });
    // navigate('/')
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