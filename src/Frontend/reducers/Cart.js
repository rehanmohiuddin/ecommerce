import {
  ADD_TO_CART,
  GET_ITEMS_CART,
  cartObject,
  REMOVE_FROM_CART,
  standardPriceDelivery,
  UPDATE_CART,
  INCREMENT,
  DECREMENT,
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

const quantityMapper = {
  INCREMENT: (quantity) => quantity + 1,
  DECREMENT: (quantity) => quantity - 1,
};

const updateCartFunction = (_product, type) => {
  const _quantity = quantityMapper[type](_product.quantity);
  const _updateProduct = { ..._product, quantity: _quantity };
  const _products = updateToCart(_updateProduct);
  const _totalCartPrice = _products.reduce(
    mapTotalReducer["addCartCalculation"],
    0
  );
  const grandTotalAfter =
    _totalCartPrice +
    standardPriceDelivery -
    getDiscountedTotalPrice(_totalCartPrice);

  return { _products, _totalCartPrice, grandTotalAfter };
};
const addProductFunction = (product, cart, total) => {
  const productToBeAdded = { ...product, quantity: 1 };
  const _products = [productToBeAdded, ...cart];
  const _totalCartPrice = _products.reduce(
    mapTotalReducer["addCartCalculation"],
    total
  );
  addToCart(productToBeAdded);
  const grandTotalAfter =
    _totalCartPrice +
    standardPriceDelivery -
    getDiscountedTotalPrice(_totalCartPrice);
  return { _products, _totalCartPrice, grandTotalAfter };
};
const cartReducerFunction = (state = cartObject, action) => {
  const { type, data } = action;
  const { cart, total } = state;
  switch (type) {
    case GET_ITEMS_CART:
      const _cartItems = getCart();
      const _totalCart = _cartItems.reduce(
        mapTotalReducer["addCartCalculation"],
        total
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
      const product = cart.find((_pro) => _pro._id === data.product._id);
      const productToBeAdded = { ...data.product, quantity: 1 };
      const { _products, _totalCartPrice, grandTotalAfter } = product
        ? updateCartFunction(product, INCREMENT)
        : addProductFunction(productToBeAdded, cart, total);
      return {
        ...state,
        cart: [..._products],
        total: _totalCartPrice,
        itemCount: _products.length,
        grandTotal: grandTotalAfter,
      };
    case REMOVE_FROM_CART:
      const _filteredCart = cart.filter(
        (_pro) => _pro._id !== action.data.product_id
      );
      removeFromCart(action.data.product_id);
      const _totalCartAfterRemove = _filteredCart.reduce(
        mapTotalReducer["removeCartCalculation"],
        total
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
      const { _product, type } = data;
      const updatedObj = updateCartFunction(_product, type);
      return {
        ...state,
        cart: [...updatedObj._products],
        total: updatedObj._totalCartPrice,
        itemCount: updatedObj._products.length,
        grandTotal: updatedObj.grandTotalAfter,
      };
    default:
      return { ...state };
  }
};

export { cartReducerFunction, getDiscountedTotalPrice };
