import { createContext, useContext, useReducer } from "react";
import { AxiosInstance } from "../../AxiosInstance";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

const ProductContext = createContext({ products: [], loading: false });

export const ProductProvider = ({ children }) => {
  const reducerFunction = (
    state = { products: [], loading: false },
    action
  ) => {
    switch (action.type) {
      case GET_ALL_PRODUCTS:
        console.log("Pro", { action });
        return {
          ...state,
          products: action.data,
        };
      default:
        return {
          ...state,
        };
    }
  };
  const [state, dispatch] = useReducer(reducerFunction, {
    products: [],
    loading: false,
  });
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
