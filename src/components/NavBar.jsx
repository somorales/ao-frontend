import React from "react";
import { useState, useContext } from "react";
import {
  UserCircleIcon,
  PlusIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import aoLogo from "../assets/images/ao-logo.png";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useContext(AuthContext);

  return (
    <header className="relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900">
      <nav
        aria-label="Global"
        className="mx-auto max-w-container px-4 sm:px-6 lg:px-8"
      >
        <div className="relative flex items-center py-[2.125rem]">
          <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5"></div>
          <div className="flex-none text-slate-900">
            <div className="h-6 w-auto">
              <Link to="/">
                <span className="sr-only">AO</span>
                <img alt="" src={aoLogo} className="h-8 w-auto" />
              </Link>
            </div>
          </div>

          <div className="ml-auto hidden lg:flex lg:items-center">
            {isAdmin && (
              <>
                <a href="/admin/products">Productos</a>
                <a className="ml-8" href="/admin/kits">
                  Combos
                </a>
              </>
            )}
          </div>
          <button
            type="button"
            className="-my-1 -mr-1 ml-6 flex h-8 w-8 items-center justify-center lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-900">
              <path
                d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </button>
          <div className="hidden lg:ml-6 lg:flex lg:items-center lg:border-l lg:border-slate-900/15">
            {isAdmin && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-2 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <PlusIcon className="h-4 w-4 flex-shrink-0 text-white group-hover:text-white mr-1.5" />
                    Crear
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      to={"/admin/products/create"}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Producto
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to={"/admin/kits/create"}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Combo
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}

            <button
              type="button"
              className="-my-1 ml-auto flex h-8 w-8 items-center justify-center rounded-lg lg:ml-8"
            >
              <UserCircleIcon
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </button>

            {!isAdmin && (
              <Link to={"/favorites"}>
                <button
                  type="button"
                  className="-my-1 ml-auto flex h-8 w-8 items-center justify-center rounded-lg lg:ml-8"
                >
                  <HeartIcon
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
