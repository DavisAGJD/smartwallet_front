import { useState } from "react";
import PropTypes from "prop-types";

export default function AddAmountModal({ isOpen, onClose, onSave, montoActual }) {
  const [montoAdicional, setMontoAdicional] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    onSave(montoAdicional); // Llama a la función `onSave` pasando el monto adicional
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-semibold mb-4">Añadir Monto a la Meta</h2>
        <p className="text-sm mb-4">Monto actual: <span className="font-semibold">${montoActual}</span></p>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Monto Adicional</label>
            <input
              type="number"
              value={montoAdicional}
              onChange={(e) => setMontoAdicional(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              min="0"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddAmountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  montoActual: PropTypes.number.isRequired,
};
