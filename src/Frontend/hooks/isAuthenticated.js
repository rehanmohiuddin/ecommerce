import React, { useEffect } from "react";
import { GET_TOKEN, OPEN_AUTH_COMP } from "../actions/Auth";
import { checkAuth, useAuth } from "../Context/Auth";

function checkAuthentication() {
  const { isAuthenticated, isLoggedIn, dispatch, loading } = useAuth();
  useEffect(async () => {
    dispatch({ ...(await checkAuth()) });
    console.log(await checkAuth());
  }, []);

  useEffect(
    () =>
      !isAuthenticated &&
      !loading &&
      dispatch({
        type: OPEN_AUTH_COMP,
        data: {
          login: true,
          register: false,
        },
      }),
    [isAuthenticated, loading]
  );

  return [isAuthenticated, loading];
}

export default checkAuthentication;
