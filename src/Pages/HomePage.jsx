import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom"; // Importar Link y useNavigate
import Navbar from "../components/ui/Componentes/Navbar";
import Fondo from "../assets/fonfo.jpg"


export default function HomePage() {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${Fondo}`, // Ruta al fondo
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >

      <Navbar />

      <main className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Descubre una forma <br />fresca y dinámica al tomar el <br /><span className="text-teal-600"> control de tu dinero</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Alcanza tus objetivos con pespectativas personales, presupuestos personalizados, seguimiento de gastos y supervisión de suscripciones, todo gratis.
          </p>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => navigate('/register')}>
            Registrate con SmartWallet
          </Button>
          <div className="mt-6 flex space-x-4">
            <Link to="#" className="flex items-center justify-center w-36 h-12 bg-black text-white rounded-md">
              App Store
            </Link>
            <Link to="#" className="flex items-center justify-center w-36 h-12 bg-black text-white rounded-md">
              Google Play
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
