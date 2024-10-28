import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function InfoModal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null; // Si el modal no está abierto, no se renderiza nada

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700 mb-6">{content}</p>
                <button
                    onClick={onClose}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Cerrar
                </button>
            </motion.div>
        </motion.div>
    );
}

InfoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};
