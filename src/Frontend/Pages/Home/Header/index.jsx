import {
  faHeart,
  faSearch,
  faShoppingCart,
  faSignOut,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { headerImg, plusImg } from "../../../../constants";
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

  const profileHandler = () => {
    dispatch({
      type: PROFILE_COMP,
      data: true,
    });
  };

  return (
    <header className="header">
      <div>
        <div className="header_logo kash-flex-col">
          <Link className="header-logo-container" to={"/"}>
            <img className="header-main-logo" src={headerImg} />
          </Link>
          <Link className="plus-container" to={"/"}>
            <span>Explore </span>
            <span>Plus </span>
            <img className="header-plus-img" src={plusImg} />
          </Link>
        </div>
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
        <div className="cart">
          <FontAwesomeIcon size="1x" icon={faHeart} />
          {wishlistCount > 0 && (
            <p class="kash-badge kash-subtitle kash-bg-red kash-badge-md kash-badge-absolute">
              {wishlistCount}
            </p>
          )}
          <Link to={"/wishlist"}>WishList</Link>
        </div>
        <div className="cart">
          <FontAwesomeIcon size="1x" icon={faShoppingCart} />
          {itemCount > 0 && (
            <p class="kash-badge kash-subtitle kash-bg-red kash-badge-md kash-badge-absolute">
              {itemCount}
            </p>
          )}
          <Link to={"/cart"}>Cart</Link>
        </div>
        {isAuthenticated && (
          <div className="cart" onClick={signOutHandler}>
            <FontAwesomeIcon size="1x" icon={faSignOut} />
            <Link to={"/"}>Sign Out</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
