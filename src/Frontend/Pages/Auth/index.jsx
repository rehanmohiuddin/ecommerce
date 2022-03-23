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

function Auth() {
  const [ref, clickedOutside] = useOutsideClick();
  const { dispatch, AuthMessage, authState, isLoggedIn, registration } =
    useAuth();
  const snackbar = useSnackBar();
  const redirect = useNavigate();
  useEffect(() => {
    clickedOutside && dispatch({ type: CLOSE_AUTH_COMP });
  }, [clickedOutside]);
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
    <div id="kash-modal" class="kash-modal-container">
      <div ref={ref} class="kash-modal">
        <Snackbar message={"Login Success"} />
        {authState.register ? <Register /> : <Login />}
      </div>
    </div>
  );
}

export default Auth;
