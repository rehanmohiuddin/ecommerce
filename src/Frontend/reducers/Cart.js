import {
  ADD_TO_CART,
  GET_ITEMS_CART,
  cartObject,
  REMOVE_FROM_CART,
  standardPriceDelivery,
  UPDATE_CART,
} from "../actions/Cart";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateToCart,
} from "../Context/Cart";

const AddCartTotalReducer = (total, product) =>
  total + product.discountedPrice * product.quantity;
const RemoveCartTotalReducer = (total, product) =>
  total - product.discountedPrice * product.quantity;
const mapTotalReducer = {
  addCartCalculation: AddCartTotalReducer,
  removeCartCalculation: RemoveCartTotalReducer,
};

const getDiscountedTotalPrice = (total) => (total * 0.1).toFixed(2);

const cartReducerFunction = (state = cartObject, action) => {
  switch (action.type) {
    case GET_ITEMS_CART:
      const _cartItems = getCart();
      const _totalCart = _cartItems.reduce(
        mapTotalReducer["addCartCalculation"],
        state.total
      );
      const grandTotal =
        _totalCart +
        standardPriceDelivery -
        getDiscountedTotalPrice(_totalCart);
      return {
        ...state,
        cart: _cartItems,
        itemCount: _cartItems.length,
        total: _totalCart,
        grandTotal: grandTotal,
      };
    case ADD_TO_CART:
      const productToBeAdded = { ...action.data.product, quantity: 1 };
      const _cart = [productToBeAdded, ...state.cart];
      const _totalCartAfterAdd = _cart.reduce(
        mapTotalReducer["addCartCalculation"],
        state.total
      );
      addToCart(productToBeAdded);
      const grandTotalAfterAdd =
        _totalCartAfterAdd +
        standardPriceDelivery -
        getDiscountedTotalPrice(_totalCartAfterAdd);
      return {
        ...state,
        cart: _cart,
        total: _totalCartAfterAdd,
        itemCount: _cart.length,
        grandTotal: grandTotalAfterAdd,
      };
    case REMOVE_FROM_CART:
      const _filteredCart = state.cart.filter(
        (_pro) => _pro._id !== action.data.product_id
      );
      removeFromCart(action.data.product_id);
      const _totalCartAfterRemove = _filteredCart.reduce(
        mapTotalReducer["removeCartCalculation"],
        state.total
      );
      const grandTotalAfterRemove =
        _totalCartAfterRemove +
        standardPriceDelivery -
        getDiscountedTotalPrice(_totalCartAfterRemove);
      return {
        ...state,
        cart: [..._filteredCart],
        total: _totalCartAfterRemove,
        itemCount: _filteredCart.length,
        grandTotal: grandTotalAfterRemove,
      };
    case UPDATE_CART:
      const _product = action.data;
      const _updatedProducts = updateToCart(_product);
      const _totalUpdateCart = _updatedProducts.reduce(
        mapTotalReducer["addCartCalculation"],
        0
      );
      const grandTotalAfterUpdate =
        _totalUpdateCart +
        standardPriceDelivery -
        getDiscountedTotalPrice(_totalUpdateCart);
      return {
        ...state,
        cart: [..._updatedProducts],
        total: _totalUpdateCart,
        itemCount: _updatedProducts.length,
        grandTotal: grandTotalAfterUpdate,
      };
    default:
      return { ...state };
  }
};

export { cartReducerFunction, getDiscountedTotalPrice };
