import React from "react";
import { Carousel } from "flowbite-react";
import aoCarousel1 from "../assets/images/ao-carousel-1.jpg"

export default function AoCarousel() {
  return (
    <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
       <Carousel>
        <img
          src={aoCarousel1}
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        />
      </Carousel>
    </div>
  );
}
