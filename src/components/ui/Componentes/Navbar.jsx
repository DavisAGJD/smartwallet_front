"use client"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "../../../assets/Logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-70 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={Logo || "/placeholder.svg"}
                alt="SmartWallet Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="text-xl font-bold text-teal-600">SmartWallet</span>
            </Link>
          </div>

          {/* Navegación para pantallas medianas y superiores */}
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
            <Button variant="default" size="sm" onClick={() => navigate("/login")}>
              Inicia Sesión
            </Button>
          </div>

          {/* Botón hamburguesa para mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-2 bg-white bg-opacity-90">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/how-it-works"
              className="text-gray-600 hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Cómo Funciona
            </Link>
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Quiénes somos
            </Link>
            <Link
              to="/prices"
              className="text-gray-600 hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Planes que te ofrecemos
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
            >
              Inicia Sesión
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
