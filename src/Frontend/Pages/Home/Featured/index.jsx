import React, { useEffect } from "react";
import {
  getAllProducts,
  GET_ALL_PRODUCTS,
  useProducts,
} from "../../../Context/products";
import "./index.css";

const Featured = () => {
  const { products, loading, dispatch } = useProducts();
  useEffect(async () => {
    dispatch({ type: GET_ALL_PRODUCTS, data: await getAllProducts() });
  }, []);
  return (
    <div className="kash-container featured-container">
      {products.map((_product) => (
        <div class="kash-border-sm kash-card kash-flex kash-flex-col kash-p-0 kash-m card-row kash-card-max-w kash-shadow-dark">
          <div class="kash-card-upper kash-flex kash-gap kash-justify-center ">
            {/* <div class="kash-card-badge kash-bg-red kash-absolute kash-subtitle">
              FLAT 50% OFF
            </div> */}
            <img src={_product.image} class="kash-card-max-w" />
          </div>
          <div class="kash-m">
            <div class="kash-p">{_product.title}</div>
            <p class="kash-subtitle kash-text-light">${_product.price}</p>
            {/* <p class="kash-subtitle kash-text-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p> */}
            <div class="kash-flex kash-gap kash-justify-start kash-mt">
              <button class="kash-card-btn kash-font-bold kash-bg-gray kash-text-white">
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
