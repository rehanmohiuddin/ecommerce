import React from "react";
import { CategoryProvider } from "./category";
import { ProductProvider } from "./products";

function ContextProvider({ children }) {
  return (
    <CategoryProvider>
      <ProductProvider>{children}</ProductProvider>
    </CategoryProvider>
  );
}

export default ContextProvider;
