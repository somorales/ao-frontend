import React, { Component } from "react";
import aoLoading from "../assets/images/Ao_Gif.gif";

export default function Loading(props) {
  if (!props.isLoading) {
    return <>{props.children}</>;
  }
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center w-80 h-80 rounded-lg">
        <div role="status">
          <img
            src={aoLoading}
            className="w-full h-full text-gray-200 dark:text-gray-600 fill-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
