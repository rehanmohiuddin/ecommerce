import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { AxiosInstance } from "../../AxiosInstance";

//constants
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_CAROUSEL_OFFERS = "GET_ALL_CAROUSEL_OFFERS";

const catImages = [
  "https://cdn.pixabay.com/photo/2015/06/24/15/45/hands-820272_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/02/02/15/54/jewellery-1175533_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/02/08/11/54/male-3139289_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/10/16/23/33/fashion-show-1746588_960_720.jpg",
];

const Category = createContext({ categories: [] });

export const CategoryProvider = ({ children }) => {
  const CategoryReducer = (
    state = { categories: [], loader: false, carousel: [] },
    action
  ) => {
    switch (action.type) {
      case GET_ALL_CATEGORIES:
        const _categories = action.data;
        return {
          ...state,
          categories: _categories.categories,
          loader: false,
        };
      case GET_ALL_CAROUSEL_OFFERS:
        const _carousel = action.data;
        return {
          ...state,
          carousel: _carousel.offers,
          loader: false,
        };
      default:
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(CategoryReducer, {
    categories: [],
    loader: false,
    carousel: [],
  });

  return (
    <Category.Provider value={{ ...state, dispatch }}>
      {children}
    </Category.Provider>
  );
};

export const useCategory = () => useContext(Category);

//API
export const getAllCategories = async () => {
  const _categories = (await AxiosInstance.get("/api/categories")).data;
  return _categories;
};

export const getCarousel = async () => {
  const _offers = (await AxiosInstance.get("/api/offers/carousel")).data;
  return _offers;
};
