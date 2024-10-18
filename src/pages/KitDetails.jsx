import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";


export default function KitDetails() {

    const params = useParams();

    const [kit, setKit] = useState(null);
  
    useEffect(() => {
      service
        .get(`/kits/${params.kitId}`)
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



  return (
    <div>
      hola
    </div>
  )
}
