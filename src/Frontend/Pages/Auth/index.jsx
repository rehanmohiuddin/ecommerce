import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authImg } from "../../../constants";
import { CLOSE_AUTH_COMP, OPEN_AUTH_COMP } from "../../actions/Auth";
import { useAuth } from "../../Context/Auth";
import { SHOW_MESSAGE, useSnackBar } from "../../Context/SnackMessage";
import useOutsideClick from "../../hooks/useOutsideClick";
import Snackbar from "../../Utility/components/Snackbar";
import "./index.css";
import Login from "./Login";
import Register from "./Register";
import { AuthMessageList } from "./AuthUtil";
import Modal from "../../Utility/components/Modal";

function Auth() {
  const [ref, clickedOutside] = useOutsideClick();
  const { dispatch, AuthMessage, authState, isLoggedIn, registration } =
    useAuth();
  const snackbar = useSnackBar();
  const showAuth = authState.login || authState.register;
  const closeAuth = () => {
    dispatch({ type: CLOSE_AUTH_COMP });
  };
  useEffect(() => {
    if (AuthMessage) {
      snackbar.dispatch({
        type: SHOW_MESSAGE,
        data: {
          message: AuthMessageList[AuthMessage].message,
          action: AuthMessageList[AuthMessage].action,
        },
      });
      AuthMessageList[AuthMessage].action &&
        dispatch(AuthMessageList[AuthMessage].action);
    }
  }, [AuthMessage]);
  return (
    <>
      {showAuth && (
        <Modal
          show={authState.login || authState.register}
          closeCallBack={closeAuth}
        >
          <Snackbar message={"Login Success"} />
          {authState.register ? <Register /> : <Login />}
        </Modal>
      )}
    </>
  );
}

export default Auth;
