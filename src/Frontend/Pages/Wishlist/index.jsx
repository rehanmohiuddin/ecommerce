import {
  faMinus,
  faMinusCircle,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  GET_ITEMS_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../../actions/Cart";
import { GET_WISHLIST, REMOVE_FROM_WISHLIST } from "../../actions/Wishlist";
import { addToCart, useCart } from "../../Context/Cart";
import { SHOW_MESSAGE, useSnackBar } from "../../Context/SnackMessage";
import { useWishList } from "../../Context/Wishlist";
import { getDiscountedTotalPrice } from "../../reducers/Cart";
import Button from "../../Utility/components/Button";
import HomeContainer from "../../Utility/components/HomeContainer";
import { getDeliveryDate } from "../../Utility/Helpers";
import "./index.css";

function Index() {
  const { wishlist, itemCount, dispatch } = useWishList();
  const cartDispatch = useCart().cart.dispatch;
  const snackbar = useSnackBar();

  useEffect(() => {
    dispatch({ type: GET_WISHLIST });
  }, []);

  const handleMoveToCart = (product) => {
    cartDispatch({ type: ADD_TO_CART, data: { product } });
    dispatch({ type: REMOVE_FROM_WISHLIST, data: { product } });

    snackbar.dispatch({
      type: SHOW_MESSAGE,
      data: { message: "Item Moved To Cart" },
    });
  };

  const handleRemoveWishlist = (product) =>
    dispatch({ type: REMOVE_FROM_WISHLIST, data: { product } });

  const showCart = itemCount > 0;
  return (
    <HomeContainer>
      <div className="cart-container ">
        <div className="cart-items">
          <div className="cart-items-header">My Wishlist ({itemCount})</div>
          {showCart ? (
            wishlist.map((_cartItem) => (
              <div className="cart-item-container">
                <div className="cart-item">
                  <img src={_cartItem.thumbnail} />
                  <div className="cart-item-body">
                    <div className="cart-item-name">{_cartItem.title}</div>
                    <div className="cart-item-description">
                      {_cartItem.description}
                    </div>
                    <div className="cart-item-brand">
                      Brand : {_cartItem.brand}
                    </div>
                    <div className="cart-item-bottom">
                      <div className="cart-item-discounted-price">
                        ₹{_cartItem.discountedPrice}
                      </div>
                      <div className="cart-item-actual-price">
                        ₹{_cartItem.price}
                      </div>
                      <div className="cart-item-discount-percentage">
                        {_cartItem.discountPercentage}% Off
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-end">
                    <div className="cart-delivery">
                      Delivery by {getDeliveryDate()} | <div>Free</div>{" "}
                      <div className="delivery-fee">₹40</div>
                    </div>
                    <div>7 Days Replacement Policy</div>
                  </div>
                </div>
                <div className="cart-footer">
                  <Button
                    type="primary"
                    clickFun={() => handleRemoveWishlist(_cartItem)}
                    data="REMOVE"
                  />
                  <Button
                    type="primary"
                    clickFun={() => handleMoveToCart(_cartItem)}
                    data="MOVE TO CART"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty">
              Wishlist is Empty <Link to={"/products"}>Go to Products</Link>
            </div>
          )}
        </div>
      </div>
    </HomeContainer>
  );
}

export default Index;
