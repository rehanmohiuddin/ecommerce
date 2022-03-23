import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { AxiosInstance } from "../../AxiosInstance";
import {
  loginObject,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/Auth";
import { LoginReducer } from "../reducers/Auth";

const AuthContext = createContext(loginObject);

const AuthProvider = ({ children }) => {
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
      : { type: LOGIN_FAILURE, data: { error: "Some thing Went Wrong" } };
  } catch (e) {
    return { type: LOGIN_FAILURE, data: { error: e.toString() } };
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

export { useAuth, login, AuthProvider, register };
