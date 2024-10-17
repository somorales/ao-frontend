import React from 'react'
import { Link,} from "react-router-dom";
import { useState } from "react";
import service from "../services/config.js";
import { useNavigate } from 'react-router-dom';

export default function ProductCreate() {

    const navigate = useNavigate()

    const [name,setName]= useState("")
    const [category,SetCategory]= useState("")
    const [description,setDescription]= useState("")
    const [image,setImage]= useState("")
    const [price,setPrice]= useState("")
    const [quantity,setQuantity]= useState("")
    const [size,setSize]= useState("")
    const [color,setColor]= useState("")

    const handelNameChange = (evento) => {
        let value = evento.target.value;
        setName(value);
      };

      const handelCatedoryChange = (evento) => {
        let value = evento.target.value;
        SetCategory(value);
      };


      const handelDescriptionChange = (evento) => {
        let value = evento.target.value;
        setDescription(value);
      };

      const handelImageChange = (evento) => {
        let value = evento.target.value;
        setImage(value);
      };

      const handelPriceChange = (evento) => {
        let value = evento.target.value;
        setPrice(value);
      };

      const handelQuantityChange = (evento) => {
        let value = evento.target.value;
        setQuantity(value);
      };

      const handelSizeChange = (evento) => {
        let value = evento.target.value;
        setSize(value);
      };

      const handelColorChange = (evento) => {
        let value = evento.target.value;
        setColor(value);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      category === "" ||
      description === "" ||
     image === "" ||
      price == "" ||
      quantity === "" 
    ) {
      return;
    }

    const newProduct = {
      name: name,
      category: category,
      description: description,
      image: image,
      price: price,
      quantity: quantity,
     size: size,
     color: color,
    };

try {
  await service.post(
    `/products`,
    newRecommendation
  );

  navigate(`/admin/products`);

} catch (error) {

  console.log(error);
}
};

      

  return (
    <div>
      crear formulario
    </div>
  )
}
