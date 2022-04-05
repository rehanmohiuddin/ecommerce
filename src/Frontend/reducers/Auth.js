import {
  OPEN_LOGIN_COMP,
  CLOSE_AUTH_COMP,
  LOGIN,
  REGISTER,
  OPEN_AUTH_COMP,
  OPEN_REGISTER_COMP,
  LOGIN_COMPLETE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  loginObject,
  LOGOUT,
  OPEN_MODAL,
  PROFILE_COMP,
} from "../actions/Auth";

const LoginReducer = (state = loginObject, action) => {
  switch (action.type) {
    case CLOSE_AUTH_COMP:
      return {
        ...state,
        authState: {
          login: false,
          register: false,
        },
      };
    case OPEN_REGISTER_COMP:
      return {
        ...state,
        openRegister: true,
        openLogin: false,
      };
    case OPEN_AUTH_COMP:
      return {
        ...state,
        authState: { ...action.data },
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...action.data.foundUser,
          encodedToken: action.data.encodedToken,
        })
      );
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: { ...action.data.foundUser, token: action.data.encodedToken },
        AuthMessage: LOGIN_SUCCESS,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.data.error,
        AuthMessage: LOGIN_FAILURE,
      };
    case REGISTER:
      return {
        ...state,
        loading: true,
        registration: {
          processInitiated: true,
        },
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        registration: {
          isRegistered: true,
          email: action.data.email,
        },
        AuthMessage: REGISTER_SUCCESS,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        ...action.data,
      };
    case GET_TOKEN:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKEN_SUCCESS:
      const _user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};
      localStorage.setItem(
        "user",
        JSON.stringify({
          ..._user,
          encodedToken: action.data.encodedToken,
        })
      );

      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: {
          ...state.user,
          ...action.data.foundUser,
          token: action.data.encodedToken,
        },
        isAuthenticated: true,
      };
    case GET_TOKEN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        ...loginObject,
      };
    case PROFILE_COMP:
      return {
        ...state,
        profileOpen: action.data,
      };
    default:
      return { ...state };
  }
};

export { LoginReducer };
