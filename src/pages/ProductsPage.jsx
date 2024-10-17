import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";

export default function ProductsPage() {

    const [ allProducts, setAllProducts ] = useState(null)

    useEffect(() => {
        service.get(`/products`)
        .then((response) => {
          //console.log(response.data)
          setAllProducts(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    
      }, [])



  return (
    <div>
      todos los productos
    </div>
  )
}


