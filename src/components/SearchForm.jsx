import React from "react";
import { useState } from "react";

export default function SearchForm(props) {
  const [search, setSearch] = useState("")

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(search)
  }    


  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Buscar
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 rounded-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] focus:border-none"
          placeholder={props.placeholder}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="font-semibold text-[#efe8db] absolute end-2.5 bottom-1.5 bg-[#c07c53] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2 rounded-lg text-sm px-2 py-1"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
