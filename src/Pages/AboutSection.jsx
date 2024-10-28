import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Users, BookOpen, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/ui/Componentes/Navbar';
import InfoModal from '../components/ui/Componentes/Modales/InfoModal'; // Importar el modal

export default function AboutSection() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <Navbar />
      <section className="w-full bg-white">
        <motion.div
          className="relative h-[400px] w-full flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(/img/AboutUs-Fonfo.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center">
            Sobre SmartWallet
          </h1>
        </motion.div>

        <motion.div
          className="container mx-auto px-4 py-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Conocenos mejor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutCard
              icon={<Users className="h-8 w-8 text-teal-600" />}
              title="Nuestra Misión"
              description="Confianza, transparencia, integridad, y calidad de productos y servicios. Aprende de nuestros objetivos."
              modalContent="Nuestra misión es ofrecer soluciones financieras innovadoras que ayuden a nuestros clientes a gestionar mejor su dinero, con un enfoque en transparencia y calidad."
            />
            <AboutCard
              icon={<BookOpen className="h-8 w-8 text-teal-600" />}
              title="Nuestra Historia"
              description="Explora nuestros hitos más importantes, desde la fundación de SmartWallet hasta el día de hoy."
              modalContent="Fundada en 2024, SmartWallet ha crecido rápidamente para convertirse en un líder en soluciones financieras digitales, ayudando a miles de personas a alcanzar sus metas financieras."
            />
            <AboutCard
              icon={<BarChart3 className="h-8 w-8 text-teal-600" />}
              title="Estructura de liderazgo"
              description="Conoce a las personas que trabajan para ti y la estructura del grupo financiero de SmartWallet."
              modalContent="Nuestro equipo está compuesto por expertos en tecnología y finanzas comprometidos en ofrecer las mejores experiencias y productos a nuestros usuarios."
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function AboutCard({ icon, title, description, modalContent }) {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <motion.div
        className="flex flex-col h-full bg-white shadow-md rounded-lg p-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        }}
      >
        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
          onClick={handleOpenModal}
          className="text-teal-600 hover:text-teal-700 inline-flex items-center"
        >
          Más información <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </motion.div>

      {/* Modal */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        content={modalContent}
      />
    </>
  );
}

AboutCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modalContent: PropTypes.string.isRequired,
};
