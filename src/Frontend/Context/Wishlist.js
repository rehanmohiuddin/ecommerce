import { createContext, useContext, useReducer } from "react";
import { wishListObject } from "../actions/Wishlist";
import { wishListReduce } from "../reducers/Wishlist";

const WishListContext = createContext(wishListObject);

const WishListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishListReduce, wishListObject);
  return (
    <WishListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WishListContext.Provider>
  );
};

const useWishList = () => useContext(WishListContext);
const getWishlist = () => {
  const user_local =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const _wishlist = user_local ? [...user_local.wishlist] : [];
  return _wishlist;
};
const addToWishlist = (product) => {
  const user_local =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const _wishlist = user_local ? [product, ...user_local.wishlist] : [];
  const _user = {
    ...user_local,
    wishlist: _wishlist,
  };
  localStorage.setItem("user", JSON.stringify(_user));
  return _wishlist;
};

const removeFromWishlist = (productId) => {
  const user_local =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const _wishlist = user_local.wishlist;
  const _filteredProducts = _wishlist.filter(
    (product) => product._id !== productId
  );
  const _user = {
    ...user_local,
    wishlist: _filteredProducts,
  };
  localStorage.setItem("user", JSON.stringify(_user));
  return _wishlist;
};

export {
  WishListProvider,
  useWishList,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
