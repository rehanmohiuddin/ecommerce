import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Category from "./Category";
import Featured from "./Featured";
import Footer from "../Footer";

import Header from "./Header";
import { useAuth } from "../../Context/Auth";
import Auth from "../Auth";
import Loader from "../../Utility/components/Loader";
import isAuth from "../../hooks/isAuthenticated";
import Profile from "../../Pages/Profile";

const Home = () => {
  const { authState } = useAuth();
  isAuth();
  return (
    <div>
      <Header />
      <Auth />
      <Profile />
      <Category />
      <Carousel />
      <Featured />
      <Footer />
    </div>
  );
};

export default Home;
