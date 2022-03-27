const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";
const GET_ITEMS_CART = "GET_ITEMS_CART";

const standardPriceDelivery = 49 + 29;

const cartObject = {
  cart: [],
  total: 0,
  itemCount: 0,
  grandTotal: 0,
};

export {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  cartObject,
  GET_ITEMS_CART,
  standardPriceDelivery,
};
