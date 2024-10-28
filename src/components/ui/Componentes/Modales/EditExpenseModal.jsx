import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { obtenerCategoriasGasto } from "../../../../api/categoriasApi";
import { editarGasto } from "../../../../api/gastosApi";
import { getIconForCategory } from "../../../../utils/iconsUtils";
import Select from "react-select";
import PropTypes from "prop-types";

export default function EditExpenseModal({ isOpen, onClose, gasto, onExpenseUpdated }) {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [monto, setMonto] = useState(gasto.monto || "");
  const [selectedCategory, setSelectedCategory] = useState({
    value: gasto.categoria_gasto_id,
    label: gasto.nombre_categoria,
    icon: getIconForCategory(gasto.nombre_categoria),
  });
  const [descripcion, setDescripcion] = useState(gasto.descripcion || "");

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

  const handleEditExpense = async (e) => {
    e.preventDefault();
    const usuario_id = parseJwt(token).id; // Asegúrate de obtener solo el ID del usuario

    try {
      await editarGasto(
        gasto.id_gasto, // Enviar `id_gasto` como parámetro separado
        {
          usuario_id,
          monto,
          categoria_gasto_id: selectedCategory.value,
          descripcion,
        },
        token
      );
      onExpenseUpdated(); // Llama a una función para actualizar la lista de gastos
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al editar gasto:", error);
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
        <h2 className="text-lg font-semibold mb-4">Editar Gasto</h2>
        <form onSubmit={handleEditExpense}>
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            ></textarea>
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

EditExpenseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gasto: PropTypes.object.isRequired,
  onExpenseUpdated: PropTypes.func.isRequired,
};
