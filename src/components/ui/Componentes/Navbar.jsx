<<<<<<< HEAD
"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Logo from "../../../assets/Logo.png"

export default function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-70 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo || "/placeholder.svg"} alt="SmartWallet Logo" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold text-teal-600">SmartWallet</span>
            </Link>
          </div>
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
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="default" size="sm" onClick={() => navigate("/login")}>
              Inicia Sesión
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
=======
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
>>>>>>> cfb4fc469470a746ed1fa41691872056e5fe3f76
        </div>
      </div>

<<<<<<< HEAD
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
            >
              Cómo Funciona
            </Link>
            <Link
              to="/about-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
            >
              Quiénes somos
            </Link>
            <Link
              to="/prices"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
            >
              Planes que te ofrecemos
            </Link>
            <div className="mt-4">
              <Button variant="default" size="sm" onClick={() => navigate("/login")} className="w-full">
                Inicia Sesión
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

=======
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
>>>>>>> cfb4fc469470a746ed1fa41691872056e5fe3f76
