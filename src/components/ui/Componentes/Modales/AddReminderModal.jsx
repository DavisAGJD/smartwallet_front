import { useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { agregarRecordatorio } from "../../../../api/recordatoriosApi"; // Función para agregar recordatorio
import PropTypes from "prop-types";

export default function AddReminderModal({ isOpen, onClose, onReminderAdded }) {
  const { token } = useContext(AuthContext);
  const [descripcion, setDescripcion] = useState("");
  const [fechaRecordatorio, setFechaRecordatorio] = useState("");

  const handleAddReminder = async (e) => {
    e.preventDefault();
    const usuario_id = parseJwt(token).id;

    try {
      await agregarRecordatorio(token, {
        usuario_id,
        descripcion,
        fecha_recordatorio: fechaRecordatorio,
      });
      onReminderAdded();
      onClose();
    } catch (error) {
      console.error("Error al agregar recordatorio:", error);
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  // Obtener la fecha actual en formato adecuado para el atributo "min"
  const today = new Date().toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Agregar Recordatorio</h2>
        <form onSubmit={handleAddReminder}>
          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            ></textarea>
          </div>
          
          {/* Fecha de Recordatorio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha del Recordatorio</label>
            <input
              type="date"
              value={fechaRecordatorio}
              onChange={(e) => setFechaRecordatorio(e.target.value)}
              required
              min={today} // Configura la fecha mínima en la fecha actual
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Agregar Recordatorio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddReminderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReminderAdded: PropTypes.func.isRequired,
};
