import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Frontend/Pages/Home";
import Products from "./Frontend/Pages/Products";
import Snackbar from "./Frontend/Utility/components/Snackbar";
import { useSnackBar } from "./Frontend/Context/SnackMessage";
import Cart from "./Frontend/Pages/Cart";
import Wishlist from "./Frontend/Pages/Wishlist";
import ProtectedRoute from "./ProtectedRoute";
import RouteNotFound from "./Frontend/Pages/PageNotFound";

function App() {
  const { message } = useSnackBar();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
      {message && <Snackbar />}
    </>
  );
}

export default App;
