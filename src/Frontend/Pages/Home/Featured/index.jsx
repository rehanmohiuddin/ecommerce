import React, { useEffect } from "react";
import {
  getAllProducts,
  getFeaturedProducts,
  useProducts,
} from "../../../Context/products";
import { GET_FEATURED_PRODUCTS } from "../../../actions/Products";
import Button from "../../../Utility/components/Button";
import "./index.css";

const Featured = () => {
  const { featuredProducts, loading, dispatch } = useProducts();
  useEffect(async () => {
    dispatch({
      type: GET_FEATURED_PRODUCTS,
      data: await getFeaturedProducts(),
    });
  }, []);
  return (
    <div className=" featured-container">
      <div className="featured-header kash-flex kash-flex-end">
        <h2 className="kash-h5 products-checkout-heading">
          Products To Check Out
        </h2>
        <Button navigate="/products" type="secondary" data="View All" />
      </div>
      <h3>Suggested for You</h3>
      <div className="product-border"></div>
      <div className="featured-products-container">
        {featuredProducts.map((_product) => (
          <div class="product-featured kash-border-sm kash-card kash-flex kash-flex-col kash-p-0 kash-m card-row kash-card-max- kash-shadow-dark">
            <div class="kash-card-upper kash-flex kash-gap kash-justify-center ">
              <img src={_product.images[0]} class="product-image " />
            </div>
            <div className="product-featured-footer">
              <div class="kash-p product-featured-title">{_product.title}</div>
              <p class="kash-subtitle kash-text-light">${_product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
