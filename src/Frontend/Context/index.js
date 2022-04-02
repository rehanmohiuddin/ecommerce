import React from "react";
import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";
import { CategoryProvider } from "./category";
import { ProductProvider } from "./products";
import { SnackProvider } from "./SnackMessage";
import { WishListProvider } from "./Wishlist";

function ContextProvider({ children }) {
  return (
    <SnackProvider>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <CartProvider>
              <WishListProvider>{children}</WishListProvider>
            </CartProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </SnackProvider>
  );
}

export default ContextProvider;
