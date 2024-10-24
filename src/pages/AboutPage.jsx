import React from "react";
import ao from "../assets/images/ao-about.png";

export default function AboutPage() {
  return (
    <div>
      <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src={ao} />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <h2 className="my-4 text-[#000000] font-bold text-3xl  sm:text-4xl ">
              Sobre <span className="text-[#c07c53]">AO</span>
            </h2>
            <p className="text-[#000000]">
              Nuestro objetivo es promover y preservar la riqueza cultural y
              lingüística del guaraní, uno de los idiomas oficiales de Paraguay
              y una herencia viva de nuestros ancestros. A través de nuestros
              productos, celebramos el espíritu y la identidad guaraní,
              llevándolos a hogares tanto dentro como fuera del país. Nuestros
              artículos están cuidadosamente seleccionados para reflejar lo
              mejor de la artesanía, arte y tradiciones paraguayas, con un
              enfoque especial en el idioma guaraní, que es un pilar fundamental
              de nuestra cultura. Creemos que cada pieza que ofrecemos cuenta
              una historia y es una oportunidad para aprender, compartir y
              difundir el orgullo por nuestras raíces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
