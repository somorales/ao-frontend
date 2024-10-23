import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { Radio, RadioGroup } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ToastContext } from "../context/toast.context.jsx";
import { useContext } from "react";

const colors = [
  {
    name: "Blanco",
    class: "bg-white",
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

export default function ProductCreate() {
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ToastContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (evento) => {
    let value = evento.target.value;
    setName(value);
  };

  const handleDescriptionChange = (evento) => {
    let value = evento.target.value;
    setDescription(value);
  };

  const handleImageChange = async (evento) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!evento.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", evento.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post("/upload", uploadData);
      setImage(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      setErrorMessage("Error de comunicación con el servidor.");
    }
  };

  const handlePriceChange = (evento) => {
    let value = evento.target.value;
    setPrice(value);
  };

  const handleQuantityChange = (evento) => {
    let value = evento.target.value;
    setQuantity(value);
  };

  const handleSizeChange = (evento) => {
    let value = evento.target.value;
    setSize(value);
  };

  const handleColorChange = (evento) => {
    let value = evento.target.value;
    setColor(value);
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

    const newProduct = {
      name: name,
      description: description,
      image: image,
      price: price,
      quantity: quantity,
      size: size,
      color: color,
    };

    try {
      await service.post(`/products`, newProduct);

      navigate(`/admin/products`);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error de comunicación con el servidor.");
    }
  };

  return (
    <div className="bg-white">
      <div className="lg:py-6">
        <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="p-6 space-y-6">
            <div className="flex justify-center h-80 lg:h-96">
              {image && (
                <img
                  src={image}
                  className="max-h-80 w-auto object-cover object-center rounded-lg lg:h-[38rem]"
                />
              )}
              {!image && (
                <div className="flex w-full object-cover object-center rounded-lg border lg:h-[38rem]">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto my-auto max-h-80 object-cover object-center rounded-lg lg:h-[12rem] text-gray-300"
                  />
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} method="POST" className="space-y-6 p-6">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight texttext-[#000000] sm:text-3xl">
                Crear Producto
              </h1>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Nombre (Requerido)
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  onChange={handleNameChange}
                  value={name}
                  placeholder="Nombre del producto"
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Descripción (Requerido)
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  onChange={handleDescriptionChange}
                  placeholder="Descripción del producto"
                  value={description}
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="block w-full h-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-[#000000]"
              >
                Imagen (Requerido)
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-[#c07c53] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#c07c53] focus-within:ring-offset-2 hover:text-[#D68C60]"
                    >
                      <span>Subir imagen del producto</span>
                      <input
                        onChange={handleImageChange}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        required
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, hasta 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Precio (Gs.) (Requerido)
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handlePriceChange}
                  value={price}
                  id="price"
                  name="price"
                  type="number"
                  min={1}
                  required
                  className="block w-44 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53]  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Unidades (Requerido)
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleQuantityChange}
                  value={quantity}
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  required
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#000000]">
                Color (Opcional)
              </h3>
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

            {/* Sizes */}

            <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#000000]">
                  Tamaño (Opcional)
                </h3>
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
                      } group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-[#efe8db] focus:outline-none data-[focus]:ring-2  sm:flex-1 sm:py-6`}
                    >
                      <span>{eachSize.name}</span>
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#c07c53] px-8 py-3 text-base font-semibold text-[#efe8db] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
            >
              Crear Producto
            </button>

            <button
              onClick={() => navigate("/admin/products")}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#efe8db] px-8 py-3 text-base font-medium text-[#000000] hover:bg-[#d2ccb4] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
