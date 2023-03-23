import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LOADING_END,
  LOADING_START,
  UPDATE,
} from "../action/action.Type";

const initialData = {
  posts: [],
  post: {},
  isLoading: false,
  currentPage: 0,
  numberOfPages: 0,
};

export default function reducer(state = initialData, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_END:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: payload.data,
        currentPage: payload.currentPage,
        numberOfPages: payload.numberOfPages,
      };
      case FETCH_POST:
        return {
          ...state,
          post: payload,
        };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: payload,
      };
    case CREATE:
      const newPost = [payload, ...state.posts];
      return { ...state, posts: newPost };
    case UPDATE:
      const updatedPost = state.posts.map((e) =>
        e._id === payload._id ? payload : e
      );
      return { ...state, posts: updatedPost };
    case DELETE:
      const deletePost = state.posts.filter((e) => e._id !== payload);
      return { ...state, posts: deletePost };
    default:
      return state;
  }
}
