import { createContext, useContext, useReducer } from "react";
import { cartObject } from "../actions/Cart";
import { cartReducerFunction } from "../reducers/Cart";

const CartContext = createContext(cartObject);

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducerFunction, cartObject);
  return (
    <CartContext.Provider value={{ cart: { ...state, dispatch } }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

const getCart = () => {
  const user_local =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const _cart = user_local ? [...user_local.cart] : [];
  return _cart;
};
const addToCart = (product) => {
  const user_local =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const _cart = user_local ? [product, ...user_local.cart] : [];
  const _user = {
    ...user_local,
    cart: _cart,
  };
  localStorage.setItem("user", JSON.stringify(_user));
  return _cart;
};

const removeFromCart = (productId) => {
  const user_local =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const _cart = user_local.cart;
  const _filteredProducts = _cart.filter(
    (product) => product._id !== productId
  );
  const _user = {
    ...user_local,
    cart: _filteredProducts,
  };
  localStorage.setItem("user", JSON.stringify(_user));
  return _cart;
};

const updateToCart = (product) => {
  const { _id, quantity } = product;
  const user_local =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const _Products = [...user_local.cart];
  _Products.forEach(
    (_pro) => (_pro.quantity = _pro._id === _id ? quantity : _pro.quantity)
  );
  const _user = {
    ...user_local,
    cart: [..._Products],
  };
  localStorage.setItem("user", JSON.stringify(_user));
  return _Products;
};

export {
  CartProvider,
  useCart,
  addToCart,
  removeFromCart,
  getCart,
  updateToCart,
};
