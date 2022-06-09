import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faSignOut,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { plusImg } from "../../../../constants";
import headerImg from "../../../../Assets/logo.png";
import { LOGOUT, OPEN_AUTH_COMP, PROFILE_COMP } from "../../../actions/Auth";
import { useAuth } from "../../../Context/Auth";
import { useCart } from "../../../Context/Cart";
import { useWishList } from "../../../Context/Wishlist";
import Button from "../../../Utility/components/Button";
import Search from "../Search";
import "./index.css";

const Header = () => {
  const { isLoggedIn, user, dispatch, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const { itemCount } = cart;
  const wishlistCount = useWishList().itemCount;
  const signOutHandler = () => dispatch({ type: LOGOUT });
  const [showMobNav, setMobNav] = useState(null);

  const profileHandler = () => {
    dispatch({
      type: PROFILE_COMP,
      data: true,
    });
  };

  const getActiveClassName = (isActive) =>
    isActive ? "cart route-active" : "cart";

  const renderHeaderComponents = () => (
    <>
      {" "}
      <Search />
      {isLoggedIn ? (
        <FontAwesomeIcon
          onClick={profileHandler}
          size="2x"
          icon={faUserCircle}
        />
      ) : (
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
          navigate="/"
          type="primary"
          data="Login"
        />
      )}
      <NavLink to={"/wishlist"}>
        {({ isActive }) => (
          <div className={getActiveClassName(isActive)}>
            <FontAwesomeIcon className="icon" size="1x" icon={faHeart} />
            {wishlistCount > 0 && (
              <p class="kash-badge kash-subtitle kash-bg-red kash-badge-md kash-badge-absolute">
                {wishlistCount}
              </p>
            )}
            WishList
          </div>
        )}
      </NavLink>
      <NavLink to={"/cart"}>
        {({ isActive }) => (
          <div className={getActiveClassName(isActive)}>
            <FontAwesomeIcon className="icon" size="1x" icon={faShoppingCart} />
            {itemCount > 0 && (
              <p class="kash-badge kash-subtitle kash-bg-red kash-badge-md kash-badge-absolute">
                {itemCount}
              </p>
            )}
            Cart
          </div>
        )}
      </NavLink>
      {isAuthenticated && (
        <div className="cart" onClick={signOutHandler}>
          <FontAwesomeIcon className="icon" size="1x" icon={faSignOut} />
          <Link to={"/"}>Sign Out</Link>
        </div>
      )}
    </>
  );

  return (
    <header>
      <div className="header">
        <Link className="header-logo-container" to={"/"}>
          <img className="header-main-logo" src={headerImg} />
        </Link>

        <FontAwesomeIcon
          className="bars"
          icon={faBars}
          onClick={() => setMobNav(!showMobNav)}
        />
        <div className="desktop-nav">{renderHeaderComponents()}</div>
      </div>
      {showMobNav && <div className="mobNav">{renderHeaderComponents()}</div>}
    </header>
  );
};

export default Header;
