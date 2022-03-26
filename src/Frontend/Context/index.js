import React from "react";
import { AuthProvider } from "./Auth";
import { CategoryProvider } from "./category";
import { ProductProvider } from "./products";
import { SnackProvider } from "./SnackMessage";

function ContextProvider({ children }) {
  return (
    <SnackProvider>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>{children}</ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </SnackProvider>
  );
}

export default ContextProvider;
