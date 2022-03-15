import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Category from "./Category";
import Featured from "./Featured";

import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Category />
      {/* <Carousel />
      <Featured /> */}
    </div>
  );
};

export default Home;
