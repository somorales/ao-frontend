import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";

export default function ProductDetails() {
  const params = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    service
      .get(`/products/${params.productId}`)
      .then((response) => {
    console.log(response.data)
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (product === null) {
    return <h3>...loading</h3>;
  }

  return (
    <div>
      podemos ver un producto
    </div>
  )
}
