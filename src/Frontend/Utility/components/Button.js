import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Proptypes from "prop-types";

function Button(props) {
  const { navigate, type, data } = props;
  return (
    <div
      className={type === "primary" ? "primary-btn" : "primary-btn blue-color"}
    >
      <div>
        <Link to={navigate}>{data}</Link>
      </div>
    </div>
  );
}

Button.propTypes = {
  fallback: Proptypes.string,
  alt: Proptypes.string,
  data: Proptypes.string,
};
Button.defaultProps = {
  navigate: "/",
  type: "primary",
  data: "LOGIN",
};

export default Button;
