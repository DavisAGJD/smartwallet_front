import { ChartBar, CreditCard, PiggyBank, ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir al home
import Navbar from "../components/ui/Componentes/Navbar";
import Footer from "../components/ui/Componentes/Footer";

export default function HowItWorks() {
  const navigate = useNavigate(); // Hook para redirigir al home

  const features = [
    {
      icon: <ChartBar className="h-8 w-8 text-teal-600" />,
      title: "Realice un seguimiento de sus gastos",
      description: "Supervise fácilmente sus gastos en tiempo real.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-teal-600" />,
      title: "Escaneo de tickets",
      description: "Registrar tus tickets en cuestión de segundos"
    },
    {
      icon: <PiggyBank className="h-8 w-8 text-teal-600" />,
      title: "Establezca metas de ahorro",
      description: "Establece metas de ahorro para su futuro y recibe alertas cuando se alcancen.",
    },
    {
      icon: <ArrowRightLeft className="h-8 w-8 text-teal-600" />,
      title: "Presupuesto inteligente",
      description: "Obtenga recomendaciones de presupuesto personalizadas basadas en sus hábitos de gasto.",
    },
  ];

  return (
    <div>
      <Navbar />
      <section className=" py-16">
        {/* Flecha de retorno */}


        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">¿Cómo funciona SmartWallet?</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            SmartWallet simplifica su vida financiera al brindarle herramientas poderosas para administrar su dinero de manera efectiva. Así es como nuestra aplicación te ayuda a tomar el control de tus finanzas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white hover:shadow-lg transition-shadow duration-300 p-6 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-teal-100 p-3 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para tomar el control de tus finanzas?</h3>
            <p className="text-gray-600 mb-8">
              Únase a miles de usuarios que ya han transformado sus vidas financieras con SmartWallet.
            </p>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              onClick={() => navigate('/register')} // Redirigir a la página de registro
            >
              Comience gratis ahora
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>

  );
}
