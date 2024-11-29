// src/components/RewardCard.jsx
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Importar PropTypes para validaciones
import premium from '../../../assets/premium.jpg'

const RewardCard = ({ usuarioId, token, puntosUsuario, onRecompensaCanjeada }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const canjearRecompensa = async () => {
    if (puntosUsuario < 100) { // Asumiendo que 100 puntos son necesarios para esta recompensa
      setError("No tienes suficientes puntos para canjear esta recompensa.");
      return;
    }

    setLoading(true);
    setError(null); // Limpiar el error antes de hacer la solicitud
    try {
      // Llamar al backend para canjear la recompensa (en este caso, actualizar la suscripción)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuarios/suscripcion/${usuarioId}`,
        { usuario_id: usuarioId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Si la respuesta es exitosa, actualizar el estado y los puntos
      if (response.data && response.data.message) {
        setSuccess(true);
        onRecompensaCanjeada(); // Llamar al callback para actualizar los puntos en el componente padre
      } else {
        setError("Hubo un problema al canjear la recompensa.");
      }
    } catch (error) {
      console.error("Error al canjear la recompensa:", error); // Para depurar
      setError("Hubo un problema al canjear la recompensa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xs rounded-lg border border-gray-200 bg-white shadow-lg">
      <img 
        src={premium} 
        alt="Recompensa Premium" 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">Recompensa Premium</h2>
        <p className="text-gray-600 mt-2">
          Cambia tu suscripción a Premium por 2 días. ¡Disfruta de beneficios exclusivos!
        </p>
        <div className="mt-4">
          <p className="font-semibold">Puntos requeridos: 100</p>
          <p className="text-gray-500">Puntos actuales: {puntosUsuario}</p>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Mostrar mensaje de error */}
        {success && <p className="text-green-500 mt-2">¡Recompensa canjeada exitosamente!</p>}
        <div className="mt-4">
          <button
            onClick={canjearRecompensa}
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Canjeando...' : 'Canjear recompensa'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Validación de props con PropTypes
RewardCard.propTypes = {
  usuarioId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  puntosUsuario: PropTypes.number.isRequired,
  onRecompensaCanjeada: PropTypes.func.isRequired
};

export default RewardCard;
