import { useState } from "react";
import PropTypes from "prop-types";

export default function EditGoalModal({ isOpen, onClose, onSave, meta }) {
  const [nombreMeta, setNombreMeta] = useState(meta.nombre_meta);
  const [montoObjetivo, setMontoObjetivo] = useState(meta.monto_objetivo);
  const [montoActual, setMontoActual] = useState(meta.monto_actual);
  const [descripcion, setDescripcion] = useState(meta.descripcion);
  const [estadoDeMeta, setEstadoDeMeta] = useState(meta.estado_de_meta);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      nombre_meta: nombreMeta,
      monto_objetivo: montoObjetivo,
      monto_actual: montoActual,
      descripcion,
      estado_de_meta: estadoDeMeta,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-semibold mb-4">Editar Meta</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombreMeta}
              onChange={(e) => setNombreMeta(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Monto Objetivo</label>
            <input
              type="number"
              value={montoObjetivo}
              onChange={(e) => setMontoObjetivo(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Monto Actual</label>
            <input
              type="number"
              value={montoActual}
              onChange={(e) => setMontoActual(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              value={estadoDeMeta}
              onChange={(e) => setEstadoDeMeta(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="activo">Activo</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditGoalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    nombre_meta: PropTypes.string,
    monto_objetivo: PropTypes.number,
    monto_actual: PropTypes.number,
    descripcion: PropTypes.string,
    estado_de_meta: PropTypes.string,
  }).isRequired,
};
