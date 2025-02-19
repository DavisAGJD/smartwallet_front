import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Componentes/Navbar";
import Fondo from "../assets/fonfo.jpg";
import Footer from "../components/ui/Componentes/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${Fondo})`,
      }}
    >
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col flex-grow">
        <div className="w-full md:w-1/2 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Descubre una forma <br />
            fresca y dinámica al tomar el <br />
            <span className="text-teal-600">control de tu dinero</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Alcanza tus objetivos con perspectivas personales, presupuestos personalizados,
            seguimiento de gastos y supervisión de suscripciones, todo gratis.
          </p>
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => navigate("/register")}
          >
            Regístrate con SmartWallet
          </Button>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="#"
              className="flex items-center justify-center w-36 h-12 bg-black text-white rounded-md"
            >
              App Store
            </Link>
            <Link
              to="#"
              className="flex items-center justify-center w-36 h-12 bg-black text-white rounded-md"
            >
              Google Play
            </Link>
          </div>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}
