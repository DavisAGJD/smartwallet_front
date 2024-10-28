import { ChartBar, CreditCard, PiggyBank, ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir al home
import Navbar from "../components/ui/Componentes/Navbar";

export default function HowItWorks() {
  const navigate = useNavigate(); // Hook para redirigir al home

  const features = [
    {
      icon: <ChartBar className="h-8 w-8 text-teal-600" />,
      title: "Track Your Spending",
      description: "Easily monitor your expenses across all your accounts in real-time.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-teal-600" />,
      title: "Manage Credit Cards",
      description: "View all your credit card balances and due dates in one place.",
    },
    {
      icon: <PiggyBank className="h-8 w-8 text-teal-600" />,
      title: "Set Savings Goals",
      description: "Create and track savings goals for your future plans.",
    },
    {
      icon: <ArrowRightLeft className="h-8 w-8 text-teal-600" />,
      title: "Smart Budgeting",
      description: "Get personalized budget recommendations based on your spending habits.",
    },
  ];

  return (
    <div>
      <Navbar />
      <section className="bg-gray-50 py-16">
        {/* Flecha de retorno */}


        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How SmartWallet Works</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            SmartWallet simplifies your financial life by providing powerful tools to manage your money effectively.
            Here's how our app helps you take control of your finances:
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to take control of your finances?</h3>
            <p className="text-gray-600 mb-8">
              Join thousands of users who have already transformed their financial lives with SmartWallet.
            </p>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              onClick={() => navigate('/register')} // Redirigir a la página de registro
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
    </div>

  );
}
