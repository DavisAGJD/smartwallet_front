import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { editarRecordatorio } from "../../../../api/recordatoriosApi"; // Asegúrate de tener esta función en la API
import PropTypes from "prop-types";

export default function EditReminderModal({ isOpen, onClose, recordatorio, onReminderUpdated }) {
  const { token } = useContext(AuthContext);

  // Usa valores predeterminados para evitar el error
  const [descripcion, setDescripcion] = useState(recordatorio?.descripcion || "");
  const [fechaRecordatorio, setFechaRecordatorio] = useState(recordatorio?.fecha_recordatorio || "");

  // Extraer usuario_id del token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  const usuarioId = parseJwt(token)?.id;

  // Actualiza el estado cuando el recordatorio cambie (ej. al abrir el modal con un nuevo recordatorio)
  useEffect(() => {
    if (recordatorio) {
      setDescripcion(recordatorio.descripcion || "");
      setFechaRecordatorio(recordatorio.fecha_recordatorio || "");
    }
  }, [recordatorio]);

  const handleEditReminder = async (e) => {
    e.preventDefault();
    try {
      await editarRecordatorio(
        recordatorio.recordatorio_id,
        {
          usuario_id: usuarioId, // Enviar usuario_id extraído del token
          descripcion,
          fecha_recordatorio: fechaRecordatorio,
        },
        token
      );
      onReminderUpdated(); // Llama a una función para actualizar la lista de recordatorios
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al editar recordatorio:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Editar Recordatorio</h2>
        <form onSubmit={handleEditReminder}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha del Recordatorio</label>
            <input
              type="date"
              value={fechaRecordatorio}
              onChange={(e) => setFechaRecordatorio(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

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
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditReminderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  recordatorio: PropTypes.shape({
    recordatorio_id: PropTypes.number,
    descripcion: PropTypes.string,
    fecha_recordatorio: PropTypes.string,
  }),
  onReminderUpdated: PropTypes.func.isRequired,
};
