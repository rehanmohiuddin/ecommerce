//constants
const loginObject = {
  openLogin: false,
  openRegister: false,
  authState: {
    login: false,
    register: false,
  },
  user: null,
  isLoggedIn: false,
  isAuthenticated: false,
  loading: false,
  error: "",
  registration: {
    processInitiated: false,
    email: null,
    isRegistered: false,
  },
  AuthMessage: null,
};
const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const LOGIN_COMPLETE = "LOGIN_COMPLETE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";
const OPEN_LOGIN_COMP = "OPEN_LOGIN_COMP";
const OPEN_REGISTER_COMP = "OPEN_REGISTER_COMP";
const OPEN_AUTH_COMP = "OPEN_AUTH_COMP";

const CLOSE_AUTH_COMP = "CLOSE_LOGIN_COMP";

export {
  loginObject,
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
};
