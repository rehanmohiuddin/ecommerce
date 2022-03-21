import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { CLOSE_MESSAGE, useSnackBar } from "../../Context/SnackMessage";
import Button from "./Button";
import "./index.css";

function Snackbar() {
  const { message, action, dispatch } = useSnackBar();
  useEffect(() => {
    message && setTimeout(() => dispatch({ type: CLOSE_MESSAGE }), 3000);
  }, [message]);
  return (
    <>
      {message && (
        <div
          id="kash-snackbar-1"
          class="kash-snackbar kash-flex kash-align-center kash-bg-gray"
        >
          {message}
          <div class="kash-flex kash-align-center">
            {action && <div className="snack-action">{action.name}</div>}
            <FontAwesomeIcon
              onClick={() => dispatch({ type: CLOSE_MESSAGE })}
              className="snack-close"
              icon={faClose}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Snackbar;
