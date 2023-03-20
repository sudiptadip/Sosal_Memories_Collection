import { CREATE, DELETE, FETCH_ALL, UPDATE } from "../action/action.Type";

export default function reducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL:
      return payload;
    case CREATE:
      return [...state, payload];
    case UPDATE:
      return state.map((e) => (e._id === payload._id ? payload : e));
    case DELETE:
      return state.filter((e) => e._id !== payload);
    default:
      return state;
  }
}
