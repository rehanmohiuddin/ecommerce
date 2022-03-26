import React from "react";
import Header from "../../Pages/Home/Header";
import Footer from "../../Pages/Footer";

const HomeContainer = ({ children }) => {
  return (
    <>
      <Header />
      <div className="kash-container">{children}</div>
      <Footer />
    </>
  );
};

export default HomeContainer;
