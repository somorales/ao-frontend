import React from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.js";
import SearchForm from "../components/SearchForm.jsx";
import Loading from "../components/Loading.jsx";
import { ToastContext } from "../context/toast.context.jsx";
import AoCarousel from "../components/AoCarousel.jsx";
import AoQuote from "../components/AoQuote.jsx";


export default function HomePage() {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [allKits, setAllKits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage } = useContext(ToastContext);

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/products");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    service
      .get(`/products`)
      .then((response) => {
        setAllProducts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    service
      .get(`/kits`)
      .then((response) => {
        setAllKits(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

  const handleSearchProduct = (text) => {
    setIsLoading(true);
    service
      .get(`/products?name=${text}`)
      .then((response) => {
        setAllProducts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });

    service
      .get(`/kits?name=${text}`)
      .then((response) => {
        setAllKits(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };

  return (
    <div className="bg-ao">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <AoCarousel />
        <AoQuote />
        <div className="flex flex-col mt-8 lg:grid lg:grid-cols-2">
          <h1 className="text-3xl	font-bold pb-4">Tienda</h1>
          <div className="lg:flex lg:flex-row lg:justify-end">
            <div className="w-full lg:w-96">
              <SearchForm
                placeholder="Buscar Productos..."
                onSearch={handleSearchProduct}
              />
            </div>
          </div>
        </div>
        <Loading isLoading={isLoading}>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {allProducts.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price} Gs.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            {allKits.map((kit) => (
              <Link key={kit._id} to={`/kits/${kit._id}`}>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={kit.name}
                      src={kit.image}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {kit.name}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {kit.price} Gs.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Loading>
      </div>
    </div>
  );
}
