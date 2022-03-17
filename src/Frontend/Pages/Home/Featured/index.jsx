import React, { useEffect } from "react";
import {
  getAllProducts,
  GET_ALL_PRODUCTS,
  useProducts,
} from "../../../Context/products";
import Button from "../../../Utility/components/Button";
import "./index.css";

const Featured = () => {
  const { products, loading, dispatch } = useProducts();
  useEffect(async () => {
    dispatch({ type: GET_ALL_PRODUCTS, data: await getAllProducts() });
  }, []);
  return (
    <div className="kash-container featured-container">
      <div className="featured-header kash-flex kash-flex-end">
        <h2 className="kash-h5">Products To Check Out</h2>
        <Button navigate="/" type="secondary" data="View All" />
      </div>
      <h3>Suggested for You</h3>
      <div className="product-border"></div>
      <div className="featured-products-container">
        {products.map((_product) => (
          <div class="product-featured kash-border-sm kash-card kash-flex kash-flex-col kash-p-0 kash-m card-row kash-card-max- kash-shadow-dark">
            <div class="kash-card-upper kash-flex kash-gap kash-justify-center ">
              <img src={_product.image} class="product-image " />
            </div>
            <div className="product-featured-footer">
              <div class="kash-p product-featured-title">
                {_product.title.split(" ")[0] +
                  " " +
                  _product.title.split(" ")[1]}
              </div>
              <p class="kash-subtitle kash-text-light">${_product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
