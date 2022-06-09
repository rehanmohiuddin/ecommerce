import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../../Utility/components/Button";
import HomeContainer from "../../Utility/components/HomeContainer";
import Filters from "./Filters";
import "./index.css";
import Products from "./Products";

const Index = () => {
  const [showFilters, setShowFilters] = useState(null);

  return (
    <HomeContainer>
      <div className="products-container">
        <div className="mob-filters">
          <div className="products-title">Products</div>
          <div onClick={() => setShowFilters(!showFilters)}>
            <FontAwesomeIcon icon={faFilter} />
            Filter
          </div>
        </div>
        {showFilters && (
          <div className="filter-small">
            <Filters closeFilter={() => setShowFilters(false)} />
          </div>
        )}
        <div className="filter-large">
          <Filters />
        </div>
        <Products />
      </div>
    </HomeContainer>
  );
};

export default Index;
