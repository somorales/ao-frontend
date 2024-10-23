import aoLogo from "../../assets/images/ao-logo.png";
import service from "../../services/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContext } from "../../context/toast.context.jsx";
import { useContext } from "react";

function Signup() {
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ToastContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        name,
        password,
      };

      await service.post("/auth/signup", newUser);

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error de comunicación con el servidor.")
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={aoLogo}
            className="mx-auto h-auto w-32"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignup} method="POST" className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Correo Eletrónico
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleEmailChange}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Nombre
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleNameChange}
                  id="name"
                  name="name"
                  type="text"
                   placeholder="nombre"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handlePasswordChange}
                  id="password"
                  name="password"
                  type="password"
                   placeholder="Usar entre 8-16 caracteres"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#c07c53]  px-3 py-1.5 text-sm font-semibold leading-6 text-[#efe8db] shadow-sm hover:bg-[#D68C60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68C60]"
              >
                Crear Cuenta
              </button>
            </div>
          </form>

          <p className=" font-light mt-10 text-center text-sm text-[#000000]">
            Ya tienes cuenta?{" "}
            <Link
              to={`/login`}
              className="font-bold leading-6 text-[#c07c53]  hover:text-[#D68C60]"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
