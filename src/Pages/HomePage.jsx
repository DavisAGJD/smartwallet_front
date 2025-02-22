import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/ui/Componentes/Navbar"
import Fondo from "../assets/fonfo.jpg"
import Footer from "../components/ui/Componentes/Footer"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${Fondo})`,
      }}
    >
      <Navbar />

      <main className="container mx-auto px-6 py-12 flex flex-col flex-grow">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Descubre una forma <span className="text-teal-600">fresca y dinámica</span> de tomar el{" "}
              <span className="bg-teal-100 px-2 py-1 rounded-md">control de tu dinero</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">Alcanza tus objetivos financieros con:</p>
            <ul className="list-none space-y-4 mb-8">
              {[
                "Perspectivas personales",
                "Presupuestos personalizados",
                "Seguimiento de gastos",
                "Supervisión de suscripciones",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="w-6 h-6 mr-2 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate("/register")}
              >
                Regístrate con SmartWallet
              </Button>
              <p className="text-sm text-gray-600 italic">¡Totalmente gratis!</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="#"
                className="flex items-center justify-center w-full sm:w-48 h-14 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path>
                </svg>
                App Store
              </Link>
              <Link
                to="#"
                className="flex items-center justify-center w-full sm:w-48 h-14 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 20.69a2.83 2.83 0 0 0 2.82 2.82h12.36A2.83 2.83 0 0 0 21 20.69V3.31A2.83 2.83 0 0 0 18.18.49H5.82A2.83 2.83 0 0 0 3 3.31v17.38zm6.35-13.45 6.19 3.57a.75.75 0 0 1 0 1.3l-6.19 3.57a.75.75 0 0 1-1.12-.65V7.89a.75.75 0 0 1 1.12-.65z"></path>
                </svg>
                Google Play
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">¿Por qué elegir SmartWallet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fácil de usar",
                description: "Interfaz intuitiva diseñada para todos los niveles de experiencia financiera.",
              },
              {
                title: "Seguro y privado",
                description: "Tu información financiera está protegida con la más alta seguridad.",
              },
              {
                title: "Siempre actualizado",
                description: "Obtén información en tiempo real sobre tus finanzas y mercados.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-600">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Únete a miles de usuarios que ya están tomando el control de sus finanzas con SmartWallet.
          </p>
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/register")}
          >
            Crea tu cuenta gratis
          </Button>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  )
}

