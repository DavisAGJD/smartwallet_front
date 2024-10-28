import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { agregarMeta } from "../../../../api/metasApi"; // Función para agregar meta
import { obtenerCategoriasMeta } from "../../../../api/categoriasApi"; // Función para obtener categorías de meta
import { getIconForCategory } from "../../../../utils/iconsUtils"; // Función para obtener icono
import Select from "react-select";
import PropTypes from "prop-types";

export default function AddGoalModal({ isOpen, onClose, onGoalAdded }) {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaObjetivo, setFechaObjetivo] = useState("");
  const [montoObjetivo, setMontoObjetivo] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categorias = await obtenerCategoriasMeta();
        setCategories(
          categorias.map((cat) => ({
            value: cat.categoria_meta_id,
            label: cat.nombre_categoria,
            icon: getIconForCategory(cat.nombre_categoria),
          }))
        );
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Función para manejar la adición de la meta
  const handleAddGoal = async (e) => {
    e.preventDefault();
    const usuario_id = parseJwt(token).id;

    try {
      await agregarMeta(token, {
        usuario_id,
        nombre_meta: nombre, // Cambia a "nombre_meta"
        descripcion,
        fecha_limite: fechaObjetivo, // Cambia a "fecha_limite"
        monto_objetivo: montoObjetivo, // Cambia a "monto_objetivo"
        categoria_meta_id: selectedCategory.value,
      });
      onGoalAdded();
      onClose();
    } catch (error) {
      console.error("Error al agregar meta:", error);
    }
  };

  // Decodifica el token para obtener el `usuario_id`
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Agregar Meta</h2>
        <form onSubmit={handleAddGoal}>
          {/* Nombre de la Meta */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Fecha Objetivo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fecha Objetivo
            </label>
            <input
              type="date"
              value={fechaObjetivo}
              onChange={(e) => setFechaObjetivo(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Monto Objetivo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Monto Objetivo
            </label>
            <input
              type="number"
              value={montoObjetivo}
              onChange={(e) => setMontoObjetivo(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Categoría */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <Select
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              formatOptionLabel={({ label, icon }) => (
                <div className="flex items-center">
                  <span className="mr-2">{icon}</span>
                  {label}
                </div>
              )}
              placeholder="Seleccionar categoría"
              classNamePrefix="select"
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
              Agregar Meta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddGoalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGoalAdded: PropTypes.func.isRequired,
};
