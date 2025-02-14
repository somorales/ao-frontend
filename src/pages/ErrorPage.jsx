import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <main className="grid min-h-full place-items-center bg-[#EDE9D8] px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-[#c07c53]">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#000000] sm:text-5xl">Página no encontrada</h1>
          <p className="mt-6 text-base leading-7 text-[#000000]">Disculpa, no pudimos encontrar la página que estás buscando.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-[#c07c53] px-3.5 py-2.5 text-sm font-semibold text-[#efe8db] shadow-sm hover:bg-[#D68C60]focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ir a página principal
            </Link>
          </div>
        </div>
      </main>
  )
}
