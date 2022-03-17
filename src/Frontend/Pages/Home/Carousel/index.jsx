import React, { useEffect } from "react";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  getAllProducts,
  GET_ALL_PRODUCTS,
  useProducts,
} from "../../../Context/products";
import {
  getCarousel,
  GET_ALL_CAROUSEL_OFFERS,
  useCategory,
} from "../../../Context/category";

function CarouselProducts() {
  const { carousel, loading, dispatch } = useCategory();
  useEffect(async () => {
    dispatch({ type: GET_ALL_CAROUSEL_OFFERS, data: await getCarousel() });
  }, []);

  return (
    <div className="carousel-container">
      <Carousel
        showIndicators={false}
        showThumbs={false}
        autoPlay={false}
        showStatus={false}
        infiniteLoop={true}
      >
        {carousel?.map((_product) => (
          <div className="carousel-item-container">
            <img src={_product.image} />
            <h2 className="kash-h4">{_product.title}</h2>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselProducts;
