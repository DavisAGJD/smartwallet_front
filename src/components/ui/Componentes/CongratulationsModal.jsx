import PropTypes from "prop-types";
import { useEffect } from "react";

export default function CongratulationsModal({ isOpen, onClose, meta }) {
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => onClose(), 5000); // Cierra el modal después de 5 segundos
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg w-80 p-6 transform transition-transform duration-300 ease-in-out scale-0 animate-scaleIn"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">¡Felicidades!</h2>
        <p className="text-center mb-4">
          Has cumplido la meta: <strong>{meta.nombre_meta}</strong>
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-500 text-white rounded-md w-full hover:bg-green-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

CongratulationsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    nombre_meta: PropTypes.string.isRequired,
  }).isRequired,
};
