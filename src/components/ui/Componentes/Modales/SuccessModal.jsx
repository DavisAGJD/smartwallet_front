import PropTypes from "prop-types";

export default function SuccessModal({ isOpen, onClose, points }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">¡Felicidades!</h2>
        <p className="mb-4">Has ganado {points} puntos por tu gasto.</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            ¡Genial!
          </button>
        </div>
      </div>
    </div>
  );
}

SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
};
