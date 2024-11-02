import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerRecordatoriosPorUsuario, eliminarRecordatorio } from "../../../api/recordatoriosApi";
import { Edit, Trash2 } from "lucide-react";
import EditReminderModal from "./Modales/EditReminderModal"; // Modal para editar recordatorio
import PropTypes from "prop-types";

export default function RemindersList({ refreshReminders }) {
  const { token } = useContext(AuthContext);
  const [recordatorios, setRecordatorios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedRecordatorio, setSelectedRecordatorio] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const cargarRecordatorios = async () => {
    try {
      const recordatoriosUsuario = await obtenerRecordatoriosPorUsuario(usuarioId, token);
      setRecordatorios(recordatoriosUsuario);
    } catch (error) {
      console.error("Error al cargar los recordatorios:", error);
    }
  };

  useEffect(() => {
    if (usuarioId) cargarRecordatorios();
  }, [usuarioId, token, refreshReminders]);

  const handleEditClick = (recordatorio) => {
    setSelectedRecordatorio(recordatorio);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (recordatorio) => {
    setSelectedRecordatorio(recordatorio);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarRecordatorio(selectedRecordatorio.recordatorio_id, token);
      cargarRecordatorios(); // Recargar lista después de eliminar
      setIsDeleteModalOpen(false);
      setSelectedRecordatorio(null);
    } catch (error) {
      console.error("Error al eliminar el recordatorio:", error);
    }
  };

  // Calcular el índice de recordatorios que se muestran en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecordatorios = recordatorios.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold">Lista de Recordatorios</h2>
      <p className="text-sm text-gray-500 mb-3">Revisa tus recordatorios</p>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="w-1/6 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="w-1/6 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="w-1/12 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentRecordatorios.map((recordatorio, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700 font-medium">
                  {recordatorio.descripcion}
                </td>
                <td className="px-4 py-2 text-gray-500 text-sm">
                  {new Date(recordatorio.fecha_recordatorio).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-right flex space-x-2">
                  <button onClick={() => handleEditClick(recordatorio)}>
                    <Edit className="text-blue-500 cursor-pointer" />
                  </button>
                  <button onClick={() => handleDeleteClick(recordatorio)}>
                    <Trash2 className="text-red-500 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(recordatorios.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {isEditModalOpen && selectedRecordatorio && (
        <EditReminderModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          recordatorio={selectedRecordatorio}
          onReminderUpdated={cargarRecordatorios}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h2 className="text-lg font-semibold mb-4">
              ¿Seguro que deseas eliminar este recordatorio?
            </h2>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

RemindersList.propTypes = {
  refreshReminders: PropTypes.bool.isRequired,
};
