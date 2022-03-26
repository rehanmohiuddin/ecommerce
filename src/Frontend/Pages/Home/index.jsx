import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Category from "./Category";
import Featured from "./Featured";
import Footer from "../Footer";

import Header from "./Header";
import { useAuth } from "../../Context/Auth";
import Auth from "../Auth";
import Loader from "../../Utility/components/Loader";

const Home = () => {
  const { authState, dispatch } = useAuth();
  return (
    <div>
      <Header />
      {(authState.login || authState.register) && <Auth />}
      <Category />
      <Carousel />
      <Featured />
      <Footer />
    </div>
  );
};

export default Home;
