import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerGastosPorUsuario, eliminarGasto } from "../../../api/gastosApi";
import { getIconForCategory } from "../../../utils/iconsUtils";
import { Edit, Trash2 } from "lucide-react";
import EditExpenseModal from "./Modales/EditExpenseModal";
import PropTypes from "prop-types";

export default function GastosList({ refreshExpenses }) {
  const { token } = useContext(AuthContext);
  const [gastos, setGastos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedGasto, setSelectedGasto] = useState(null);
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

  const cargarGastos = async () => {
    try {
      const gastosUsuario = await obtenerGastosPorUsuario(usuarioId, token);
      const sortedGastos = gastosUsuario.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha) // Ordenar por fecha (más reciente primero)
      );
      setGastos(sortedGastos);
    } catch (error) {
      console.error("Error al cargar los gastos:", error);
    }
  };

  useEffect(() => {
    if (usuarioId) cargarGastos();
  }, [usuarioId, token, refreshExpenses]); // Dependencia refreshExpenses para recargar al agregar

  const handleEditClick = (gasto) => {
    setSelectedGasto(gasto);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (gasto) => {
    setSelectedGasto(gasto);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarGasto(selectedGasto.id_gasto, token);
      cargarGastos(); // Recargar lista después de eliminar
      setIsDeleteModalOpen(false);
      setSelectedGasto(null);
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  // Calcular el índice de gastos que se muestran en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGastos = gastos.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold">Últimos gastos registrados</h2>
      <p className="text-sm text-gray-500 mb-4">Revisa tus gastos</p>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="w-1/6 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Gasto
              </th>
              <th className="w-2/6 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="w-1/6 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="w-1/6 px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="w-1/12 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentGastos.map((gasto, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="flex items-center px-4 py-2 space-x-3">
                  <span>{getIconForCategory(gasto.nombre_categoria)}</span>
                  <span className="font-medium text-gray-700">
                    {gasto.nombre_categoria}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500 text-sm">
                  {gasto.descripcion || "Sin descripción"}
                </td>
                <td className="px-4 py-2 text-gray-500 text-sm">
                  {new Date(gasto.fecha).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-2 text-right font-semibold ${
                    gasto.monto < 0 ? "text-red-500" : "text-red-500"
                  }`}
                >
                  {gasto.monto < 0 ? `-${gasto.monto}` : `-${gasto.monto}`}
                </td>
                <td className="px-4 py-2 text-right flex space-x-2">
                  <button onClick={() => handleEditClick(gasto)}>
                    <Edit className="text-blue-500 cursor-pointer" />
                  </button>
                  <button onClick={() => handleDeleteClick(gasto)}>
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
          { length: Math.ceil(gastos.length / itemsPerPage) },
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

      {isEditModalOpen && selectedGasto && (
        <EditExpenseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          gasto={selectedGasto}
          onExpenseUpdated={cargarGastos}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h2 className="text-lg font-semibold mb-4">
              ¿Seguro que deseas eliminar este gasto?
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

GastosList.propTypes = {
  refreshExpenses: PropTypes.bool.isRequired, // Añadido refreshExpenses como prop requerido
  token: PropTypes.string,
  setGastos: PropTypes.func,
  selectedGasto: PropTypes.object,
  isEditModalOpen: PropTypes.bool,
  isDeleteModalOpen: PropTypes.bool,
  confirmDelete: PropTypes.func,
};
