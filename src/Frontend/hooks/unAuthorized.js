import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OPEN_AUTH_COMP } from "../actions/Auth";
import { useAuth } from "../Context/Auth";
import { SHOW_MESSAGE, useSnackBar } from "../Context/SnackMessage";

function unAuthorized() {
  const snackbar = useSnackBar();
  const Auth = useAuth();
  const nav = useNavigate();
  const redirectForAuth = () => {
    snackbar.dispatch({
      type: SHOW_MESSAGE,
      data: { message: "Please Login" },
    });
    nav("/");
    Auth.dispatch({ type: OPEN_AUTH_COMP, data: { login: true } });
  };
  return [redirectForAuth];
}

export default unAuthorized;
