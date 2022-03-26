import {
  CLOSE_AUTH_COMP,
  LOGIN,
  LOGIN_SUCCESS,
  OPEN_AUTH_COMP,
  REGISTER,
  REGISTER_SUCCESS,
  LOGIN_FAILURE,
} from "../../actions/Auth";

const AuthMessageList = {
  LOGIN_SUCCESS: {
    message: "Login Success",
    action: {
      type: CLOSE_AUTH_COMP,
      data: {
        login: false,
        register: false,
      },
    },
  },
  REGISTER_SUCCESS: {
    message: "Registration Succcess Please Login",
    action: {
      type: OPEN_AUTH_COMP,
      data: {
        login: true,
        register: false,
      },
    },
  },
  LOGIN_FAILURE: {
    message: "Incorrect Credentials",
    action: null,
  },
};

export { AuthMessageList };
