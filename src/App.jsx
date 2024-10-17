import "./App.css";
import { Routes, Route } from "react-router";

//pages
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import PrivateAdmin from "./components/auth/PrivateAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin/products" element={  <PrivateAdmin>  <ProductsPage />   </PrivateAdmin>} />
        <Route path="/admin/products/:productId" element={  <PrivateAdmin>  <ProductDetails />   </PrivateAdmin>} />

        <Route path="/login" element={<LoginPage />} />

        {/* error FE routes here... */}
      </Routes>
    </>
  );
}

export default App;
