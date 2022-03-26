import React, { useEffect, useState } from "react";
import { ADD_TO_CART } from "../../actions/Cart";
import { GET_ALL_PRODUCTS } from "../../actions/Products";
import { useCart } from "../../Context/Cart";
import { getAllProducts, useProducts } from "../../Context/products";
import { SHOW_MESSAGE, useSnackBar } from "../../Context/SnackMessage";
import Button from "../../Utility/components/Button";

function Products() {
  const { products, filteredProducts, dispatch } = useProducts();
  const snackbar = useSnackBar();
  const { cart } = useCart();
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

  const handleAddToCart = (product) => {
    cart.dispatch({ type: ADD_TO_CART, data: { product } });
    snackbar.dispatch({
      type: SHOW_MESSAGE,
      data: { message: "Item Added To Cart" },
    });
  };
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
                <Button type="secondary" data="Add To Wishlist" />
                <Button
                  navigate={null}
                  clickFun={() => handleAddToCart(_product)}
                  type="orange"
                  data="Add To Cart"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
