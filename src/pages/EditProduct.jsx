import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Radio, RadioGroup } from "@headlessui/react";

const colors = [
  {
    name: "Blanco",
    class: "bg-white",
    selectedClass: "ring-gray-400 ring-2 ring ring-offset-2",
  },
  {
    name: "Gris",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400 ring-2 ring ring-offset-2",
  },
  {
    name: "Negro",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900 ring-2 ring ring-offset-2",
  },
];

const sizes = [
  {
    name: "S",
    selectedClass: "ring-indigo-400 ring-2 ring ring-offset-2",
  },
  {
    name: "M",
    selectedClass: "ring-indigo-400 ring-2 ring ring-offset-2",
  },
  {
    name: "L",
    selectedClass: "ring-indigo-400 ring-2 ring ring-offset-2",
  },
];

export default function EditProduct() {
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    service
      .get(`/products/${params.productId}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setImage(response.data.image);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
        setSize(response.data.size);
        setColor(response.data.color);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNameChange = (evento) => {
    let value = evento.target.value;
    setName(value);
  };

  const handleDescriptionChange = (evento) => {
    let value = evento.target.value;
    setDescription(value);
  };

  const handleImageChange = (evento) => {
    let value = evento.target.value;
    setImage(value);
  };

  const handlePriceChange = (evento) => {
    let value = evento.target.value;
    setPrice(value);
  };

  const handleQuantityChange = (evento) => {
    let value = evento.target.value;
    setQuantity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      description === "" ||
      image === "" ||
      price === "" ||
      quantity === ""
    ) {
      return;
    }

    const editProduct = {
      name: name,
      description: description,
      image: image,
      price: price,
      quantity: quantity,
      size: size,
      color: color,
    };

    try {
      await service.put(`/products/${params.productId}`, editProduct);

      navigate(`/admin/products`);
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
              alt={name}
              src={image}
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
          <form onSubmit={handleSubmit} method="POST" className="space-y-6 p-6">

          <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Editar Producto
              </h1>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre del producto
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleNameChange}
                  value={name}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Descripción
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  onChange={handleDescriptionChange}
                  value={description}
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="block w-full h-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Precio (Gs.)
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handlePriceChange}
                  value={price}
                  id="price"
                  name="price"
                  type="number"
                  required
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Unidades
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleQuantityChange}
                  value={quantity}
                  id="quantity"
                  name="quantity"
                  type="number"
                  required
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {color && (
              <div>
                {/* Ejemplo de referencia https://tailwindui.com/components/ecommerce/components/product-overviews */}
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup
                    value={color}
                    className="flex items-center space-x-3"
                    onChange={setColor}
                  >
                    {colors.map((eachColor) => (
                      <Radio
                        key={eachColor.name}
                        value={eachColor.name}
                        className={`${eachColor.class} ${
                          eachColor.name == color ? eachColor.selectedClass : ""
                        } relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${eachColor.class} h-8 w-8 rounded-full border border-black border-opacity-10`}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            )}

            {/* Sizes */}
            {size && (
              <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Tamaño</h3>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={size}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    onChange={setSize}
                  >
                    {sizes.map((eachSize) => (
                      <Radio
                        key={eachSize.name}
                        value={eachSize.name}
                        className={`${
                          eachSize.name === size ? eachSize.selectedClass : ""
                        } group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6`}
                      >
                        <span>{eachSize.name}</span>
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            )}

            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Actualizar
            </button>

            <Link to={`/admin/products`}>
              <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Cancelar
              </button>
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}
