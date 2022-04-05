import { createContext, useContext, useReducer } from "react";
import { AxiosInstance } from "../../AxiosInstance";
import {
  GET_SEARCH_QUERY_FAILURE,
  GET_SEARCH_QUERY_SUCCESS,
  productState,
} from "../actions/Products";
import { productsReducer } from "../reducers/Products";

const ProductContext = createContext({ products: [], loading: false });

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, productState);
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

export const getAllProducts = async () => {
  const _products = (await AxiosInstance.get("/api/products")).data;
  return _products;
};

export const searchProducts = async (payload) => {
  try {
    const resp = await AxiosInstance.get("/api/search/products/" + payload);
    return resp.status === 200
      ? { type: GET_SEARCH_QUERY_SUCCESS, data: resp.data }
      : { type: GET_SEARCH_QUERY_FAILURE };
  } catch (e) {
    return { type: GET_SEARCH_QUERY_FAILURE, error: e.toString() };
  }
};

export const getFeaturedProducts = async () => {
  const resp = (await AxiosInstance.get("/api/featured/products")).data;
  return resp;
};
