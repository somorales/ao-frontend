import "./App.css";
import { Routes, Route } from "react-router";

//pages
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import PrivateAdmin from "./components/auth/PrivateAdmin";
import ProductCreate from "./pages/ProductCreate";
import EditProduct from "./pages/EditProduct";
import Signup from "./pages/auth/Signup";
import NavBar from "./components/NavBar";
import KitsPage from "./pages/KitsPage";
import KitDetails from "./pages/kitDetails";




function App() {
  return (
    <>
      <NavBar />
      <Routes>
        
      <Route path="/login" element={<LoginPage />} />
        
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/admin/products" element={  <PrivateAdmin>  <ProductsPage />   </PrivateAdmin>} />

        <Route path="/admin/products/create" element={  <PrivateAdmin>  <ProductCreate />   </PrivateAdmin>} />

        <Route path="/admin/products/:productId" element={  <PrivateAdmin>  <ProductDetails />   </PrivateAdmin>} />

        <Route path="/admin/products/:productId/edit" element={  <PrivateAdmin>  <EditProduct />   </PrivateAdmin>} />

        <Route path="/admin/kits" element={  <PrivateAdmin>  <KitsPage />   </PrivateAdmin>} />

        <Route path="/admin/kits/:kitId" element={  <PrivateAdmin>  <KitDetails />   </PrivateAdmin>} />

       

        {/* error FE routes here... */}
      </Routes>
    </>
  );
}

export default App;
