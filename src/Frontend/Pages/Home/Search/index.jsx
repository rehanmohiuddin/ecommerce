import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { searchProducts, useProducts } from "../../../Context/products";
import "./index.css";

function Index() {
  const { dispatch, searchedProducts } = useProducts();

  const getSearchResults = async (query) =>
    dispatch({ ...(await searchProducts(query.toLowerCase())) });

  const debounce = (func, timeout = 250) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), timeout);
    };
  };

  const handleSearch = debounce((e) => getSearchResults(e.target.value));

  return (
    <div className="header-search-bar-container">
      <div className="search-input-container">
        <input
          className="header-search-bar kash-input"
          placeholder="Search for products, brands and more"
          type={"text"}
          onChange={handleSearch}
        />
        <FontAwesomeIcon className="search-icon color-blue" icon={faSearch} />
      </div>
      <div className="search-results-container">
        {searchedProducts.map((_product) => (
          <Link to={"/products"}>
            <div>{_product.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Index;
