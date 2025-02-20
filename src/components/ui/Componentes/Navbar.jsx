import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../../../assets/Logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="flex items-center justify-between px-6 py-4 bg-white bg-opacity-70 shadow-sm">
        {/* Logo y nombre */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="SmartWallet Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <Link to="/">
            <span className="text-xl font-bold text-teal-600">SmartWallet</span>
          </Link>
        </div>

        {/* Botón hamburguesa para mobile */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-teal-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menú para pantallas medianas y superiores */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/how-it-works" className="text-gray-600 hover:text-teal-600">
            Cómo Funciona
          </Link>
          <Link to="/about-us" className="text-gray-600 hover:text-teal-600">
            Quiénes somos
          </Link>
          <Link to="/prices" className="text-gray-600 hover:text-teal-600">
            Planes que te ofrecemos
          </Link>
        </nav>

        {/* Botón de inicio de sesión para pantallas medianas y superiores */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="default" size="sm" onClick={() => navigate('/login')}>
            Inicia Sesión
          </Button>
        </div>
      </header>

      {/* Menú desplegable para móviles */}
      {isOpen && (
        <div className="md:hidden px-6 pt-4 pb-2 bg-white bg-opacity-90">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/how-it-works"
              className="text-gray-600 hover:text-teal-600"
              onClick={() => setIsOpen(false)}
            >
              Cómo Funciona
            </Link>
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-teal-600"
              onClick={() => setIsOpen(false)}
            >
              Quiénes somos
            </Link>
            <Link
              to="/prices"
              className="text-gray-600 hover:text-teal-600"
              onClick={() => setIsOpen(false)}
            >
              Planes que te ofrecemos
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                navigate('/login');
              }}
            >
              Inicia Sesión
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
