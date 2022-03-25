import React from "react";
import HomeContainer from "../../Utility/components/HomeContainer";
import Filters from "./Filters";
import "./index.css";
import Products from "./Products";

const Index = () => {
  return (
    <HomeContainer>
      <div className="products-container">
        <Filters />
        <Products />
      </div>
    </HomeContainer>
  );
};

export default Index;
