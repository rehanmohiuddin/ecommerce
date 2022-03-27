import {
  ADD_TO_WISHLIST,
  GET_WISHLIST,
  REMOVE_FROM_WISHLIST,
  wishListObject,
} from "../actions/Wishlist";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../Context/Wishlist";

const wishListReduce = (state = wishListObject, action) => {
  const { type, data } = action;
  const { wishlist } = state;
  switch (type) {
    case GET_WISHLIST:
      const _getWishlist = getWishlist();
      return {
        ...state,
        wishlist: _getWishlist,
        itemCount: _getWishlist.length,
      };
    case ADD_TO_WISHLIST:
      const _product = data.product;
      addToWishlist(_product);
      const _wishListAfterAdd = [_product, ...wishlist];
      return {
        ...state,
        wishlist: [..._wishListAfterAdd],
        itemCount: _wishListAfterAdd.length,
      };
    case REMOVE_FROM_WISHLIST:
      const _productToRemove = data.product;
      removeFromWishlist(_productToRemove._id);
      const _productsAfterRemove = wishlist.filter(
        (_pro) => _pro._id !== _productToRemove._id
      );
      return {
        ...state,
        wishlist: [..._productsAfterRemove],
        itemCount: _productsAfterRemove.length,
      };
    default:
      return { ...state };
  }
};

export { wishListReduce };
