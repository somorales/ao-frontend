import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function KitDetails() {
  const navigate = useNavigate();

  const params = useParams();

  const [kit, setKit] = useState(null);

  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    service
      .get(`/kits/${params.kitId}/details`)
      .then((response) => {
        console.log(response.data);
        setKit(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (kit === null) {
    return <h3>...loading</h3>;
  }

  const handleDelete = (event) => {
    service
      .delete(`/kits/${params.kitId}`)

      .then((response) => {
        navigate(`/admin/kits`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const kitFavorite = {
      kitId: params.kitId,
    };

    try {
      await service.post(`/favorites`, kitFavorite);

      navigate(`/favorites`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="lg:py-6">
        <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3">
            <img
              alt={kit.name}
              src={kit.image}
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
          <div className="p-6">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {kit.name}
              </h1>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <p className="text-2xl tracking-tight text-gray-900">
                {kit.price} Gs.
              </p>
            </div>

            <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Description
                </h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{kit.description}</p>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Unidades
                  </h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{kit.quantity}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Productos</h3>
                {kit.products.map((eachProduct) => (
                  <div key={eachProduct._id} className="space-y-6">
                    <p className="text-base text-gray-900">
                      {eachProduct.name}
                    </p>
                    <img src={eachProduct.image} alt="image" className="h-40" />
                  </div>
                ))}
              </div>
            </div>

            {isAdmin && (
              <Link to={`/admin/kits/${kit._id}/edit`}>
                <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Editar
                </button>
              </Link>
            )}
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Borrar
              </button>
            )}

            {!isAdmin && (
              <button
                onClick={handleAdd}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                favoritos
                <HeartIcon
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
