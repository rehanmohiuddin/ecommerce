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

const wishListAddFunction = (_product, wishlist) => {
  addToWishlist(_product);
  return [_product, ...wishlist];
};

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
      const productAlreadyExists =
        wishlist.filter((_pro) => _pro._id === data._id).length > 0;
      const _product = data;
      const _wishListAfterAdd = productAlreadyExists
        ? [...wishlist]
        : wishListAddFunction(_product, wishlist);
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
