import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import SearchForm from "../components/SearchForm.jsx";
import Loading from "../components/Loading.jsx";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      });
  };

  return (
    <div className="bg-white">
       <Loading isLoading={isLoading}>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl	font-bold pb-4">Listado de Productos</h1>
        <SearchForm
          placeholder="Buscar productos..."
          onSearch={handleSearchProduct}
        />
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allProducts.length === 0 && (
            <p>No se encuentran productos.</p>
          )}
          {allProducts.map((product) => (
            <Link key={product._id} to={`/admin/products/${product._id}`}>
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
                    <p className="mt-1 text-sm text-gray-500">
                      {product.quantity} unidades
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price} Gs.
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </Loading>
    </div>
  );
}
