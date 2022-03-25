import { createContext, useContext, useReducer } from "react";
import { AxiosInstance } from "../../AxiosInstance";
import { productState } from "../actions/Products";
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

export const getFeaturedProducts = async () => {
  const resp = (await AxiosInstance.get("/api/featured/products")).data;
  return resp;
};
