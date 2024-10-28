import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { agregarGasto } from "../../../../api/gastosApi"; // Función para agregar gasto
import { obtenerCategoriasGasto } from "../../../../api/categoriasApi"; // Función para obtener categorías
import { getIconForCategory } from "../../../../utils/iconsUtils"; // Función de íconos
import Select from "react-select";
import PropTypes from "prop-types";

export default function AddExpenseModal({ isOpen, onClose, onExpenseAdded }) {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [monto, setMonto] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categorias = await obtenerCategoriasGasto();
        setCategories(
          categorias.map((cat) => ({
            value: cat.categoria_gasto_id,
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

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const usuario_id = parseJwt(token).id;

    try {
      await agregarGasto(token, {
        usuario_id,
        monto,
        categoria_gasto_id: selectedCategory.value,
        descripcion,
      });
      onExpenseAdded();
      onClose();
    } catch (error) {
      console.error("Error al agregar gasto:", error);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Agregar Gasto</h2>
        <form onSubmit={handleAddExpense}>
          {/* Monto */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          
          {/* Categoría */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <Select
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              formatOptionLabel={({ label, icon }) => (
                <div className="flex items-center">
                  <span className="mr-2">{icon}</span> {/* Icono de categoría */}
                  {label}
                </div>
              )}
              placeholder="Seleccionar categoría"
              classNamePrefix="select"
            />
          </div>

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
              Agregar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddExpenseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExpenseAdded: PropTypes.func.isRequired,
};
