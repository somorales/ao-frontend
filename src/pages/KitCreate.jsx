import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";

const productoSelectedClass = 'ring-2 ring-indigo-600 rounded-md ring-offset-1';

export default function KitCreate() {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    service
      .get(`/products`)
      .then((response) => {
        setAllProducts(response.data);
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

  const handleProductClick = (producto) => {
    const copy = [...selectedProducts]
    const productoExiste = copy.includes(producto._id)

    if(productoExiste){
      // eliminar
      const index = copy.indexOf(producto._id)
      copy.splice(index, 1)
    }else{
      // agregar
      copy.push(producto._id)
    }

    // actualizar productos seleccionados
    setSelectedProducts(copy)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      description === "" ||
      // image === "" ||
      price === "" ||
      quantity === ""
    ) {
      return;
    }

    const newKit = {
      name: name,
      description: description,
      //image: image,
      image: "https://ethic.es/wp-content/uploads/2023/03/imagen.jpg",
      price: price,
      quantity: quantity,
      products: selectedProducts,
    };

    try {
      await service.post(`/kits`, newKit);

      navigate(`/admin/kits`);
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
              src={image}
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
          <form onSubmit={handleSubmit} method="POST" className="space-y-6 p-6">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Crear Combo
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

            <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Productos</h3>
                {allProducts.map((eachProduct) => (
                  <div key={eachProduct._id} className="space-y-6">
                    <p className="text-base text-gray-900">
                      {eachProduct.name}
                    </p>
                    <img
                      src={eachProduct.image}
                      alt="image"
                      className={`h-40 hover:cursor-pointer ${selectedProducts.includes(eachProduct._id) ? productoSelectedClass : ''}`}
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
              Crear Producto
            </button>

            <Link to={`/admin/kits`}>
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
