import { useState, useContext } from "react";
import CardMeta from "./CardMeta";
import AddAmountModal from "./Modales/AddAmountModal";
import EditGoalModal from "./Modales/EditGoalModal";
import { AuthContext } from "../../../context/AuthContext";
import { actualizarMontoActual, eliminarMeta, actualizarMeta } from "../../../api/metasApi";
import PropTypes from "prop-types";

export default function MetasList({ metas, onMetasUpdated }) {
  const { token } = useContext(AuthContext);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [isAddAmountModalOpen, setIsAddAmountModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [metaToDelete, setMetaToDelete] = useState(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calcula las metas actuales para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMetas = metas.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddAmountClick = (meta_id) => {
    const meta = metas.find((m) => m.meta_id === meta_id);
    setSelectedMeta(meta);
    setIsAddAmountModalOpen(true);
  };

  const handleAddAmount = async (montoAdicional) => {
    try {
      if (selectedMeta) {
        await actualizarMontoActual(selectedMeta.meta_id, montoAdicional, token);
        onMetasUpdated();
      }
    } catch (error) {
      console.error("Error al actualizar el monto:", error);
    } finally {
      setIsAddAmountModalOpen(false);
    }
  };

  const handleEditMetaClick = (meta_id) => {
    const meta = metas.find((m) => m.meta_id === meta_id);
    setSelectedMeta(meta);
    setIsEditModalOpen(true);
  };

  const handleEditMeta = async (updatedData) => {
    try {
      if (selectedMeta) {
        await actualizarMeta(selectedMeta.meta_id, updatedData, token);
        onMetasUpdated();
      }
    } catch (error) {
      console.error("Error al actualizar la meta:", error);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteMetaClick = (meta_id) => {
    const meta = metas.find((m) => m.meta_id === meta_id);
    setMetaToDelete(meta);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteMeta = async () => {
    try {
      if (metaToDelete) {
        await eliminarMeta(metaToDelete.meta_id, token);
        onMetasUpdated();
      }
    } catch (error) {
      console.error("Error al eliminar la meta:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {currentMetas.map((meta) => (
          <CardMeta
            key={meta.meta_id}
            meta={meta}
            onAddAmount={handleAddAmountClick}
            onEdit={handleEditMetaClick}
            onDelete={handleDeleteMetaClick}
          />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(metas.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal para añadir monto */}
      {isAddAmountModalOpen && selectedMeta && (
        <AddAmountModal
          isOpen={isAddAmountModalOpen}
          onClose={() => setIsAddAmountModalOpen(false)}
          onSave={handleAddAmount}
          montoActual={selectedMeta.monto_actual}
        />
      )}

      {/* Modal para editar meta */}
      {isEditModalOpen && selectedMeta && (
        <EditGoalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditMeta}
          meta={selectedMeta}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && metaToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h2 className="text-lg font-semibold mb-4">¿Estás seguro?</h2>
            <p className="text-sm mb-4">¿Deseas eliminar esta meta? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteMeta}
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

MetasList.propTypes = {
  metas: PropTypes.arrayOf(
    PropTypes.shape({
      meta_id: PropTypes.number.isRequired,
      nombre_meta: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
      fecha_limite: PropTypes.string.isRequired,
      monto_actual: PropTypes.number,
    })
  ).isRequired,
  onMetasUpdated: PropTypes.func.isRequired,
};
