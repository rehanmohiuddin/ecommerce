import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY_RATING,
  GET_ALL_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  productState,
  APPLY_FILTER,
  GET_SEARCH_QUERY_SUCCESS,
} from "../actions/Products";

const priceFilterFunction = (filter, products) => {
  const _selectedMinPriceCategory = filter.min ? filter.min : 10;
  const _selectedMaxPriceCategory = filter.max ? filter.max : 100000;
  const _priceProducts = products.filter(
    (_product) =>
      _product.discountedPrice >= _selectedMinPriceCategory &&
      _product.discountedPrice <= _selectedMaxPriceCategory
  );
  return _priceProducts;
};
const categoryFilterFunction = (category, products) =>
  products.filter((_pro) => _pro.category === category);

const ratingFilterFunction = (rating, products) =>
  products.filter((_pro) => _pro.rating >= rating && _pro.rating <= 5);

const getDiscountedPrice = (product) =>
  parseInt(product.price - (product.price * product.discountPercentage) / 100);

const reduceDiscountPrice = (products, product) => [
  ...products,
  { ...product, discountedPrice: getDiscountedPrice(product) },
];
const filterMapperFunction = {
  category: categoryFilterFunction,
  price: priceFilterFunction,
  rating: ratingFilterFunction,
};

const productsReducer = (state = productState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      const _discountedPrices = action.data.products.reduce(
        reduceDiscountPrice,
        []
      );
      return {
        ...state,
        products: _discountedPrices,
        featuredProducts: [],
        searchedProducts: [],
      };
    case GET_FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: action.data.featuredProducts,
      };
    case FILTER_BY_CATEGORY:
      const _selectedCategory = action.data.category;
      const _products = state.products.filter(
        (_product) => _product.category === _selectedCategory
      );
      return {
        ...state,
        products: _products,
        selectedCategory: _selectedCategory,
      };
    case APPLY_FILTER:
      const activeFilters = action.data;
      let _Products = state.products;
      for (const [key, value] of Object.entries(activeFilters)) {
        _Products = value
          ? filterMapperFunction[key](value, _Products)
          : _Products;
      }

      return {
        ...state,
        filteredProducts: _Products,
      };

    case FILTER_BY_PRICE:
      const _selectedMinPriceCategory = action.data.category.min;
      const _selectedMaxPriceCategory = action.data.category.max
        ? action.data.category.max
        : 100000;
      const _priceProducts = state.products.filter(
        (_product) =>
          _product.price >= _selectedMinPriceCategory &&
          _product.price <= _selectedMaxPriceCategory
      );
      return {
        ...state,
        products: _priceProducts,
      };
    case FILTER_BY_RATING:
      const _selectedRatingCategory = action.data.category;
      const _ratingProducts = state.products.filter(
        (_product) => _product.rating >= _selectedRatingCategory
      );
      return {
        ...state,
        products: _ratingProducts,
      };

    case GET_SEARCH_QUERY_SUCCESS:
      return {
        ...state,
        searchedProducts: action.data.products,
      };

    default:
      return {
        ...state,
      };
  }
};
export { productsReducer };
