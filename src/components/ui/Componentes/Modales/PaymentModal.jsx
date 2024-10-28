import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PaymentModal({ isOpen, onClose, packageName, price }) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Aquí podrías añadir lógica para procesar el pago con una API
    };

    if (!isOpen) return null; // No renderiza nada si el modal está cerrado

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
                <h2 className="text-2xl font-bold mb-4">Confirmar pago</h2>
                {isSubmitted ? (
                    <div className="text-center">
                        <p className="text-lg text-green-600 font-semibold mb-4">¡Pago realizado con éxito!</p>
                        <p className="text-gray-700 mb-6">Has adquirido el paquete <strong>{packageName}</strong> por <strong>${price}</strong>.</p>
                        <button
                            onClick={onClose}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handlePayment} className="space-y-4">
                        <p className="text-gray-700 mb-4">
                            Estás a punto de adquirir el paquete <strong>{packageName}</strong> por <strong>${price}</strong>.
                        </p>
                        <div>
                            <label className="block text-gray-600">Número de Tarjeta</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded-md focus:border-green-500"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Nombre del Propietario</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded-md focus:border-green-500"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                                placeholder="Nombre completo"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-gray-600">Fecha de Expiración</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:border-green-500"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    placeholder="MM/AA"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-600">CVV</label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:border-green-500"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
                        >
                            Confirmar Pago
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-md transition-colors duration-300"
                        >
                            Cancelar
                        </button>
                    </form>
                )}
            </motion.div>
        </motion.div>
    );
}

PaymentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    packageName: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
