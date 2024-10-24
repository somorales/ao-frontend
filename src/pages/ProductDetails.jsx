import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import service from "../services/config.js";
import { Radio, RadioGroup } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Loading from "../components/Loading.jsx";
import { ToastContext } from "../context/toast.context.jsx";

const colors = [
  {
    name: "Blanco",
    class: "bg-ao",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
  {
    name: "Gris",
    class: "bg-gray-200",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
  {
    name: "Negro",
    class: "bg-gray-900",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
  {
    name: "Rosa",
    class: "bg-pink-500",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
  {
    name: "Azul",
    class: "bg-blue-500",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
];

const sizes = [
  {
    name: "S",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
  {
    name: "M",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
  {
    name: "L",
    selectedClass: "ring-[#c07c53] ring-2 ring ring-offset-2",
  },
];

export default function ProductDetails() {
  const params = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const { setErrorMessage } = useContext(ToastContext);

  useEffect(() => {
    setIsLoading(true);

    service
      .get(`/products/${params.productId}`)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
      return
    }

    const productFavorite = {
      productId: params.productId,
    };

    try {
      await service.post(`/favorites`, productFavorite);

      navigate(`/favorites`);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error de comunicación con el servidor.");
    }
  };

  return (
    <div className="bg-[#EDE9D8]">
      <Loading isLoading={isLoading}>
        <div className="lg:py-6">
          <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="flex justify-center h-80 lg:h-[38rem]">
              <img
                alt={product.name}
                src={product.image}
                className="flex w-full object-cover object-center rounded-lg border lg:h-[38rem]"
              />
            </div>

            
            <div className="p-6">
            <div className="mt-4">
              <div className="lg:col-span-2 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
                  {product.name}
                </h1>
              </div>
              </div>
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <p className="text-xl tracking-tight text-[#000000]">
                  {product.price} Gs.
                </p>
              </div>

              <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="text-xl font-medium text-[#000000]">
                    Descripción
                  </h3>
                  <div className="space-y-6">
                    <p className="text-sm text-[#000000]">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
                  <div>
                    <h3 className="text-xl font-medium text-[#000000]">
                      Unidades
                    </h3>
                    <div className="space-y-6">
                      <p className="text-sm text-[#000000]">
                        {product.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {product.color && (
                <div>
                
                  <h3 className="text-xl font-medium text-[#000000]">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={product.color}
                      className="flex items-center space-x-3"
                    >
                      {colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color.name}
                          className={`${color.class} ${
                            color.name == product.color
                              ? color.selectedClass
                              : ""
                          } relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`}
                        >
                          <span
                            aria-hidden="true"
                            className={`${color.class} h-8 w-8 rounded-full border border-black border-opacity-10`}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}

              {/* Sizes */}
              {product.size && (
                <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-[#000000]">
                      Tamaño
                    </h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={product.size}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size.name}
                          className={`${
                            size.name === product.size ? size.selectedClass : ""
                          } group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase bg-white focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6`}
                        >
                          <span>{size.name}</span>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}
              {isAdmin && (
                <button
                onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#c07c53] px-8 py-3 text-base font-semibold text-[#efe8db] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
              >
                Editar
              </button>
              )}

             

              {!isAdmin && (
                <button
                  onClick={handleAdd}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#c07c53] px-8 py-3 text-base font-semibold text-[#efe8db] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
                >
                  Favoritos
                  <HeartIcon
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-[#efe8db] group-hover:text-gray-500"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </Loading>
    </div>
  );
}
