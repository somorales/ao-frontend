import React from "react";
import { Avatar, Blockquote } from "flowbite-react";
import aoTerere from "../assets/images/terere.png"

export default function AoQuote() {
  return (
    <figure className="mx-auto max-w-screen-md text-center flex flex-row items-center justify-center">
      <Blockquote>
        <p className="text-2xl lg:text-3xl font-medium italic text-gray-900 dark:text-white">
          "Regala cultura."
        </p>
      </Blockquote>   
      <img
        className="h-28 w-28"
        src={aoTerere}
      />   
    </figure>
  );
}
