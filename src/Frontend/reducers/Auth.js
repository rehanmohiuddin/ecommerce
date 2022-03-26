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
      localStorage.setItem("token", action.data.encodedToken);
      localStorage.setItem("user", JSON.stringify(action.data.foundUser));
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: { ...action.data.foundUser, token: action.data.encodedToken },
        AuthMessage: LOGIN_SUCCESS,
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
    default:
      return { ...state };
  }
};

export { LoginReducer };
