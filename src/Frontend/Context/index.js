import React from "react";
import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";
import { CategoryProvider } from "./category";
import { ProductProvider } from "./products";
import { SnackProvider } from "./SnackMessage";

function ContextProvider({ children }) {
  return (
    <SnackProvider>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <CartProvider>{children}</CartProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </SnackProvider>
  );
}

export default ContextProvider;
