const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const GET_FEATURED_PRODUCTS = "GET_FEATURED_PRODUCTS";
const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";
const FILTER_BY_RATING = "FILTER_BY_RATING";
const APPLY_FILTER = "APPLY_FILTER";

const productState = {
  products: [],
  loading: false,
  featuredProducts: [],
  selectedCategory: null,
  filteredProducts: [],
};

export {
  GET_ALL_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  productState,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY_RATING,
  APPLY_FILTER,
};
