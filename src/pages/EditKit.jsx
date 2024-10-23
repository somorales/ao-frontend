import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Loading from "../components/Loading.jsx";
import { ToastContext } from "../context/toast.context.jsx";
import { useContext } from "react";

const productoSelectedClass = "ring-2 ring-indigo-600 rounded-md ring-offset-1";

export default function EditKit() {
  const params = useParams();
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ToastContext);

  const [allProducts, setAllProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
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
        setErrorMessage("Error de comunicación con el servidor.")
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    service
      .get(`/kits/${params.kitId}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setImage(response.data.image);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
        setSelectedProducts(response.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error de comunicación con el servidor.")
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
      setErrorMessage("Ocurrió un error al subir la imagen. Por favor, intenta nuevamente.")
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

  const handleProductClick = (producto) => {
    const copy = [...selectedProducts];
    const productoExiste = copy.includes(producto._id);

    if (productoExiste) {
      // eliminar
      const index = copy.indexOf(producto._id);
      copy.splice(index, 1);
    } else {
      // agregar
      copy.push(producto._id);
    }

    // actualizar productos seleccionados
    setSelectedProducts(copy);
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

    const editKit = {
      name: name,
      description: description,
      image: image,
      price: price,
      quantity: quantity,
      products: selectedProducts,
    };

    try {
      await service.put(`/kits/${params.kitId}`, editKit);

      navigate(`/admin/kits`);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error de comunicación con el servidor.")
    }
  };

  return (
    <div className="bg-white">
      <div className="lg:py-6">
        <Loading isLoading={isLoading}>
          <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3">
              {image && (
                <img
                  src={image}
                  className="h-full w-full object-cover object-center rounded-lg"
                />
              )}
              <div className="h-full w-full object-cover object-center rounded-lg border lg:p-6">
                {isUploading ? (
                  <div>
                    <h2>subiendo imagen...</h2>
                  </div>
                ) : null}
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="space-y-6 p-6"
            >
              <div className="lg:col-span-2 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Editar Combo
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

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Imagen del producto
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
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir imagen</span>
                        <input
                          onChange={handleImageChange}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
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
                    min={1}
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
                    min={1}
                    required
                    className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Productos
                  </h3>
                  {allProducts.map((eachProduct) => (
                    <div key={eachProduct._id} className="space-y-6">
                      <p className="text-base text-gray-900">
                        {eachProduct.name}
                      </p>
                      <img
                        src={eachProduct.image}
                        alt="image"
                        className={`h-40 hover:cursor-pointer ${
                          selectedProducts.includes(eachProduct._id)
                            ? productoSelectedClass
                            : ""
                        }`}
                        onClick={(event) => handleProductClick(eachProduct)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Editar Combo
              </button>

              <Link to={`/admin/kits`}>
                <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Cancelar
                </button>
              </Link>
            </form>
          </div>
        </Loading>
      </div>
    </div>
  );
}
