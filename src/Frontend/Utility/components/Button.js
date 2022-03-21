import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Proptypes from "prop-types";

function Button(props) {
  const { navigate, type, data, clickFun } = props;
  const getButtonColor = (color) => {
    switch (color) {
      case "primary":
        return "primary-btn";
      case "secondary":
        return "primary-btn" + " " + "blue-color";
      case "orange":
        return "primary-btn" + " " + "orange-color";
      default:
        "primary-btn";
    }
  };
  return (
    <button className={getButtonColor(type)} onClick={clickFun}>
      <div>
        <Link to={navigate}>{data}</Link>
      </div>
    </button>
  );
}

Button.propTypes = {
  fallback: Proptypes.string,
  alt: Proptypes.string,
  data: Proptypes.string,
  clickFun: Proptypes.func,
};
Button.defaultProps = {
  navigate: "/",
  type: "primary",
  data: "LOGIN",
};

export default Button;
