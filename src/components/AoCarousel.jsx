import React from "react";
import { Carousel } from "flowbite-react";
import ao from "../assets/images/ao-68.jpg";
import ao29 from "../assets/images/Ao-29.jpg";
import ao51 from "../assets/images/Ao-51.jpg";


export default function AoCarousel() {
  return (
    <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
       <Carousel>
        <img
          src={ao}
          alt="..."
        />
        <img
          src={ao29}
          alt="..."
        />
        <img
          src={ao51}
          alt="..."
        />
      </Carousel>
    </div>
  );
}
