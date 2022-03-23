import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OPEN_AUTH_COMP, REGISTER } from "../../actions/Auth";
import { register, useAuth } from "../../Context/Auth";
import Button from "../../Utility/components/Button";
import "./index.css";

function Register() {
  const { dispatch } = useAuth();
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const registerUser = async () => {
    if (userDetails.password === userDetails.confirmPassword) {
      dispatch({ type: REGISTER });
      const _register = await register(userDetails);
      dispatch({ type: _register.type, data: _register.data });
    }
  };

  return (
    <>
      <div className="auth-left">
        <h3 className="kash-h5">Looks like you're new here!</h3>
        <p className="auth-left-desc">
          <span>Sign up with your mobile number to get started</span>
        </p>
      </div>
      <div className="auth-right">
        <label class="has-float-label">
          <input
            onChange={(e) =>
              setuserDetails((_ud) => ({ ..._ud, name: e.target.value }))
            }
            placeholder=" "
            type="text"
            required="required"
          />
          <span class="label">Enter Name *</span>
        </label>
        <label class="has-float-label">
          <input
            onChange={(e) =>
              setuserDetails((_ud) => ({ ..._ud, email: e.target.value }))
            }
            placeholder=" "
            type="email"
            required="required"
          />
          <span class="label">Enter Email *</span>
        </label>
        <label class="has-float-label">
          <input
            onChange={(e) =>
              setuserDetails((_ud) => ({ ..._ud, password: e.target.value }))
            }
            placeholder=" "
            type="password"
            required="required"
          />
          <span class="label">Enter Password *</span>
        </label>
        <label class="has-float-label">
          <input
            onChange={(e) =>
              setuserDetails((_ud) => ({
                ..._ud,
                confirmPassword: e.target.value,
              }))
            }
            placeholder=" "
            type="password"
            required="required"
          />
          <span class="label">Confirm Password *</span>
        </label>
        <div className="terms">
          By continuing, you agree to Flipkart's{" "}
          <Link to={"/"}>Terms of Use</Link> and{" "}
          <Link to={"/"}>Privacy Policy</Link>
        </div>
        <div className="login-actions">
          <Button
            clickFun={() => registerUser()}
            type="orange"
            data="REGISTER"
          />
          <div className="or">OR</div>
          <Button
            clickFun={() =>
              dispatch({
                type: OPEN_AUTH_COMP,
                data: {
                  login: true,
                  register: false,
                },
              })
            }
            type="primary"
            data="Existing User ? Login"
          />
        </div>
      </div>
    </>
  );
}

export default Register;
