import React, { useEffect } from "react";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  getAllProducts,
  GET_ALL_PRODUCTS,
  useProducts,
} from "../../../Context/products";

function CarouselProducts() {
  const { products, loading, dispatch } = useProducts();
  useEffect(async () => {
    dispatch({ type: GET_ALL_PRODUCTS, data: await getAllProducts() });
  }, []);
  console.log({ products });
  return (
    <div className="carousel-container">
      <Carousel
        showIndicators={false}
        showThumbs={false}
        autoPlay={true}
        showStatus={false}
        infiniteLoop={true}
      >
        {products.map((_product) => (
          <div className="carousel-item-container">
            <img src={_product.image} />
            <div className="legend">{_product.title}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselProducts;
