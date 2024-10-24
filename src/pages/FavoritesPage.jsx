import React from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.js";
import { HeartIcon } from "@heroicons/react/24/solid";
import Loading from "../components/Loading.jsx";
import { ToastContext } from "../context/toast.context.jsx";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ToastContext);

  const [allFavorites, setAllFavorites] = useState({ products: [], kits: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setIsLoading(true);
    service
      .get(`/auth/user/favorites`)
      .then((response) => {
        setAllFavorites(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };

  const handleProductFavoriteDelete = (productId) => {
    service
      .delete(`/favorites/products/${productId}`)
      .then((response) => {
        loadFavorites();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };

  const handleKitFavoriteDelete = (kitId) => {
    service
      .delete(`/favorites/kits/${kitId}`)
      .then((response) => {
        loadFavorites();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Favoritos
            </h1>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {allFavorites.products.length === 0 &&
              allFavorites.kits.length === 0 && (
                <h1>No se encuentran favoritos.</h1>
              )}
            {allFavorites.products.map((product) => (
              <div key={product._id} className="relative">
                <button className="bg-[#efe8db] group absolute w-9 h-9 right rounded-md z-50 lg:absolute lg:right-2 lg:top-2">
                  <HeartIcon
                    onClick={() => handleProductFavoriteDelete(product._id)}
                    aria-hidden="true"
                    className="h-9 w-9 text-[#c07c53] group-hover:text-[#efe8db] group-hover:bg-[#D68C60] group-hover:rounded-md"
                  />
                </button>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Link to={`/products/${product._id}`}>
                      <img
                        alt={product.name}
                        src={product.image}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full m-t[-2rem]"
                      />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${product._id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price} Gs.
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {allFavorites.kits.map((kit) => (
              <div key={kit._id} className="relative">
                <button className="bg-[#efe8db] group absolute w-9 h-9 right rounded-md z-50 lg:absolute lg:right-2 lg:top-2">
                  <HeartIcon
                    onClick={() => handleKitFavoriteDelete(kit._id)}
                    aria-hidden="true"
                    className="h-9 w-9 text-[#c07c53] group-hover:text-[#efe8db] group-hover:bg-[#D68C60] group-hover:rounded-md"
                  />
                </button>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Link to={`/kits/${kit._id}`}>
                      <img
                        alt={kit.name}
                        src={kit.image}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full m-t[-2rem]"
                      />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/kits/${kit._id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {kit.name}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {kit.price} Gs.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Loading>
    </div>
  );
}
