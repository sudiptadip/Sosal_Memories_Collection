import { AUTH, LOGOUT } from "../action/action.Type";

const authReducer = (state = { authData: null }, action) => {
  const { type } = action;
  switch (type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state
  }
};

export default authReducer;
