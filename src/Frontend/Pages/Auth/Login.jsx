import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authImg } from "../../../constants";
import { LOGIN, OPEN_AUTH_COMP } from "../../actions/Auth";
import { login, useAuth } from "../../Context/Auth";
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../../Utility/components/Button";
import "./index.css";

function Login() {
  const { dispatch, registration } = useAuth();
  const [userDetails, setuserDetails] = useState({
    email: registration.email ? registration.email : "rehan.4942@gmail.com",
    password: "123456",
  });

  const loginUser = async () => {
    dispatch({ type: LOGIN });
    const _login = await login(userDetails);
    dispatch({ type: _login.type, data: _login.data });
  };

  return (
    <>
      <div className="auth-left">
        <h3 className="kash-h5">Login</h3>
        <p className="auth-left-desc">
          <span>Get access to your Orders, Wishlist and Recommendations</span>
        </p>
      </div>
      <div className="auth-right">
        <label class="has-float-label">
          <input
            value={userDetails.email}
            onChange={(e) =>
              setuserDetails((_ud) => ({ ..._ud, email: e.target.value }))
            }
            defaultValue={userDetails.email}
            placeholder=" "
            type="email"
            required="Please Enter Email"
          />
          <span class="label">Enter Email *</span>
        </label>
        <label class="has-float-label">
          <input
            onChange={(e) =>
              setuserDetails((_ud) => ({ ..._ud, password: e.target.value }))
            }
            value={userDetails.password}
            placeholder=" "
            type="password"
            required="required"
          />
          <span class="label">Enter Password *</span>
        </label>

        <div className="terms">
          By continuing, you agree to Flipkart's{" "}
          <Link to={"/"}>Terms of Use</Link> and{" "}
          <Link to={"/"}>Privacy Policy</Link>
        </div>
        <div className="login-actions">
          <Button clickFun={() => loginUser()} type="orange" data="LOGIN" />
          <div className="or">OR</div>
          <Button type="primary" data="Request OTP" />
        </div>
        <div
          onClick={() =>
            dispatch({
              type: OPEN_AUTH_COMP,
              data: {
                login: false,
                register: true,
              },
            })
          }
          className="register-link"
        >
          New to Flipkart? Create an account
        </div>
      </div>
    </>
  );
}

export default Login;
