import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { AxiosInstance } from "../../AxiosInstance";

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

const AuthContext = createContext(loginObject);

const AuthProvider = ({ children }) => {
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
          ...action.data,
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
  const [state, dispatch] = useReducer(LoginReducer, loginObject);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

const login = async (data) => {
  try {
    const resp = await AxiosInstance.post("/api/auth/login", data);
    return resp.status === 200
      ? { type: LOGIN_SUCCESS, data: resp.data }
      : { type: LOGIN_FAILURE, error: "Some thing Went Wrong" };
  } catch (e) {
    return { type: LOGIN_FAILURE, error: e.toString() };
  }
};
const register = async (data) => {
  try {
    const resp = await AxiosInstance.post("/api/auth/signup", data);
    console.log({ resp });
    return resp.status === 201
      ? { type: REGISTER_SUCCESS, data: resp.data.createdUser }
      : { type: REGISTER_FAILURE, error: "Some thing Went Wrong" };
  } catch (e) {
    return { type: REGISTER_FAILURE, error: e.toString() };
  }
};

export {
  useAuth,
  login,
  AuthProvider,
  register,
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
