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
  DECREMENT,
  GET_ITEMS_CART,
  INCREMENT,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../../actions/Cart";
import { useCart } from "../../Context/Cart";
import { getDiscountedTotalPrice } from "../../reducers/Cart";
import Button from "../../Utility/components/Button";
import HomeContainer from "../../Utility/components/HomeContainer";
import { getDeliveryDate } from "../../Utility/Helpers";
import "./index.css";

function Index() {
  const { cart } = useCart();
  const { total, itemCount, grandTotal, dispatch } = cart;
  useEffect(() => {
    cart.dispatch({ type: GET_ITEMS_CART });
  }, []);
  const removeCart = (product) => {
    cart.dispatch({
      type: REMOVE_FROM_CART,
      data: { product_id: product._id },
    });
  };

  const updateTheCart = ({ type, item }) => {
    dispatch({
      type: UPDATE_CART,
      data: {
        type,
        _product: item,
      },
    });
  };
  const showCart = itemCount > 0;
  return (
    <HomeContainer>
      <div className="cart-container ">
        <div className="cart-items">
          <div className="cart-items-header">My Cart ({itemCount})</div>
          {showCart ? (
            cart.cart.map((_cartItem) => (
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
                  <div className="cart-counter">
                    <div
                      onClick={() =>
                        _cartItem.quantity > 1 &&
                        updateTheCart({ type: DECREMENT, item: _cartItem })
                      }
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </div>
                    <div className="cart-input">
                      <input type={"text"} value={_cartItem.quantity} />
                    </div>
                    <div
                      onClick={() =>
                        updateTheCart({ type: INCREMENT, item: _cartItem })
                      }
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                  <Button type="primary" data="SAVE FOR LATER" />
                  <Button
                    type="primary"
                    clickFun={() => removeCart(_cartItem)}
                    data="REMOVE"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty">
              Cart is Empty <Link to={"/products"}>Go to Products</Link>
            </div>
          )}
          {showCart && (
            <div className="cart-items-footer">
              <Button type="orange" data="PLACE ORDER" />
            </div>
          )}
        </div>
        {showCart && (
          <div className="cart-billing">
            <div className="cart-billing-header">Price Details</div>
            <div className="cart-billing-container">
              <div className="cart-billing-item">
                <div>Price ({itemCount})</div>
                <div>₹{total}</div>
              </div>
              <div className="cart-billing-item discount">
                <div>Discount</div>
                <div>- ₹{getDiscountedTotalPrice(total)}</div>
              </div>
              <div className="cart-billing-item delivery">
                <div>Delivery Charges</div>
                <div>₹49</div>
              </div>
              <div className="cart-billing-item">
                <div>Packaging Charges</div>
                <div>₹29</div>
              </div>
              <div className="cart-billing-item cart-total">
                <div>Total</div>
                <div>₹{grandTotal}</div>
              </div>
            </div>
            <div className="cart-item-footer">
              You will save ₹3,451 on this order
            </div>
          </div>
        )}
      </div>
    </HomeContainer>
  );
}

export default Index;
