import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Category from "./Category";
import Featured from "./Featured";
import Footer from "../Footer";

import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Category />
      <Carousel />
      <Featured />
      <Footer />
    </div>
  );
};

export default Home;
