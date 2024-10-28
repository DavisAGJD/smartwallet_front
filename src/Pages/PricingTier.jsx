import { Check, X } from 'lucide-react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Componentes/Navbar';
import PaymentModal from '../components/ui/Componentes/Modales/PaymentModal'; // Importa el Modal de Pago

const PricingTier = ({ name, price, features, recommended, onSelect }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (name === 'Gratis') {
      // Redirigir a la página de registro si el paquete es gratuito
      navigate('/register');
    } else {
      // Abrir el modal de pago si no es el paquete gratuito
      onSelect();
    }
  };

  return (
    <div className={`flex flex-col p-2 bg-white rounded-lg shadow-md ${recommended ? 'border-2 border-green-500' : ''}`}>
      <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
      <div className="mt-4 text-green-600 text-5xl font-bold">
        ${price}
        <span className="text-xl text-gray-500">/mo</span>
      </div>
      <ul className="mt-6 space-y-4 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {feature.included ? (
              <Check className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <X className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleButtonClick}
        className="mt-8 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
      >
        {name === 'Gratis' ? 'Registrate ahora gratis' : 'Escoge tu plan'}
      </button>
    </div>
  );
};

PricingTier.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      included: PropTypes.bool.isRequired,
    })
  ).isRequired,
  recommended: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default function Component() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});

  const openModal = (name, price) => {
    setSelectedPackage({ name, price });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const pricingData = [
    {
      name: 'Gratis',
      monthlyPrice: 0,
      annualPrice: 99.99,
      features: [
        { text: 'Seguimiento financiero básico', included: true },
        { text: 'Reportes mensuales', included: true },
        { text: 'Soporte al cliente', included: true },
        { text: 'Educación financiera', included: true },
        { text: 'Escaner de tickets', included: false },
        { text: 'Libre de anuncios', included: false },
      ],
    },
    {
      name: 'Premium',
      monthlyPrice: 49.99,
      annualPrice: 199.99,
      features: [
        { text: 'Seguimiento financiero básico', included: true },
        { text: 'Reportes mensuales', included: true },
        { text: 'Soporte al cliente', included: true },
        { text: 'Educación financiera', included: true },
        { text: 'Escaner de tickets', included: true },
        { text: 'Libre de anuncios', included: true },
      ],
      recommended: true,
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 sm:text-5xl">
              Escoge el plan adecuado para ti
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Simple, transparente y justo para que tus ahorros crezcan.
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-10 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
            {pricingData.map((tier, index) => (
              <PricingTier
                key={index}
                name={tier.name}
                price={isAnnual ? tier.annualPrice.toFixed(2) : tier.monthlyPrice.toFixed(2)}
                features={tier.features}
                recommended={tier.recommended}
                onSelect={() => openModal(tier.name, isAnnual ? tier.annualPrice : tier.monthlyPrice)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Pago */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        packageName={selectedPackage.name}
        price={selectedPackage.price}
      />
    </div>
  );
}
