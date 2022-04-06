import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY_RATING,
  GET_ALL_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  productState,
  APPLY_FILTER,
  GET_SEARCH_QUERY_SUCCESS,
  SORT_PRICE_LOW_TO_HIGH,
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

const sortPriceFunction = (sort, products) =>
  sort === SORT_PRICE_LOW_TO_HIGH
    ? [
        ...products.sort(
          (firstproduct, secondProduct) =>
            firstproduct.price - secondProduct.price
        ),
      ]
    : [
        ...products.sort(
          (firstproduct, secondProduct) =>
            secondProduct.price - firstproduct.price
        ),
      ];

const filterMapperFunction = {
  category: categoryFilterFunction,
  price: priceFilterFunction,
  rating: ratingFilterFunction,
  sortPrice: sortPriceFunction,
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

    case APPLY_FILTER:
      const activeFilters = action.data;
      let _Products = [...state.products];

      for (const [key, value] of Object.entries(activeFilters)) {
        _Products = value
          ? filterMapperFunction[key](value, _Products)
          : _Products;
      }

      return {
        ...state,
        filteredProducts: _Products,
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
