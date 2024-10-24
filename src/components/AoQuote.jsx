import React from "react";
import { Avatar, Blockquote } from "flowbite-react";
import aoRegalo from "../assets/images/ao-regalo.png"

export default function AoQuote() {
  return (
    <figure className="mx-auto max-w-screen-md text-center">
      <img
        className="mx-auto h-28 w-28"
        src={aoRegalo}
      />
      <Blockquote>
        <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
          "Regala cultura."
        </p>
      </Blockquote>
    </figure>
  );
}
