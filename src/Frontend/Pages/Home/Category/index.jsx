import React, { useEffect } from "react";
import "./index.css";
import {
  getAllCategories,
  useCategory,
  GET_ALL_CATEGORIES,
} from "../../../Context/category";
import { Link } from "react-router-dom";
function Category() {
  const { categories, loader, dispatch } = useCategory();

  useEffect(async () => {
    dispatch({
      type: GET_ALL_CATEGORIES,
      data: await getAllCategories(),
    });
  }, []);
  return (
    <div className="category-container">
      {Array.isArray(categories) &&
        categories.map((_category) => (
          <Link to={"/products"}>
            <div className="category">
              <img className="kash-avatar-large" src={_category.thumbnail} />
              <div>{_category.categoryName}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Category;
