import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCTS } from "../../actions/Products";
import { getAllProducts, useProducts } from "../../Context/products";
import Button from "../../Utility/components/Button";

function Products() {
  const { products, filteredProducts, dispatch } = useProducts();
  const [_products, setProducts] = useState([]);
  useEffect(async () => {
    dispatch({
      type: GET_ALL_PRODUCTS,
      data: await getAllProducts(),
    });
    setProducts(products);
  }, []);
  useEffect(() => setProducts(filteredProducts), [filteredProducts]);
  useEffect(() => setProducts(products), [products]);

  return (
    <div className="products">
      <div className="category-products-container">
        {_products.map((_product) => (
          <div className="product-card">
            <div className="product-image-container">
              <img src={_product.thumbnail} />
            </div>
            <div className="product-body">
              <span className="product-title">{_product.title}</span>
              <div className="product-rating-container">
                <div className="product-rating">
                  <span>{_product.rating} </span>
                  <span>★</span>
                </div>
                <div className="product-review">1,47,456 Ratings</div>
              </div>
              <p>{_product.description}</p>
            </div>
            <div className="product-end">
              <div className="product-end-top">
                <span>₹{_product.discountedPrice}</span>
                <div className="discout-price-container">
                  <span className="actual-price">₹{_product.price}</span>
                  <span className="discounted-percentage">
                    {_product.discountPercentage}% off
                  </span>
                </div>
                <div>Free Delivery</div>
                <div>Up to ₹15000 off on Exchange</div>
              </div>
              <div className="product-actions">
                <Button type="secondary" data="Add To Cart" />
                <Button type="orange" data="Buy Now" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
