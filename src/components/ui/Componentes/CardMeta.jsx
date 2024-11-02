import PropTypes from "prop-types";
import { PlusCircle, Edit3, Trash2 } from "lucide-react";
import { getIconForCategory } from "../../../utils/iconsUtils";

export default function CardMeta({ meta, onAddAmount, onEdit, onDelete }) {
  // Colores de fondo degradados aleatorios
  const backgroundGradients = [
    "linear-gradient(to right, #D6E8FA, #B0CFFF)", // De azul claro a azul pastel
    "linear-gradient(to right, #D3EEDC, #A2D8B0)", // De verde claro a verde menta suave
    "linear-gradient(to right, #FEF5C3, #FAD689)", // De amarillo suave a amarillo cálido
    "linear-gradient(to right, #FFD6D6, #FF9E9E)", // De rosa claro a rosa coral suave
    "linear-gradient(to right, #E7D9FF, #BDA9FF)", // De lavanda suave a morado pastel
  ];

  const randomGradient =
    backgroundGradients[Math.floor(Math.random() * backgroundGradients.length)];

  // Asegúrate de que `nombre_categoria` tenga un valor manejado
  const categoriaNombre = meta.nombre_categoria || "Sin categoría";

  return (
    <div
      className={`w-64 p-6 rounded-lg shadow-lg flex flex-col justify-between text-center space-y-4`}
      style={{ background: randomGradient }}
    >
      <div className="flex flex-col items-center mb-2 space-y-2">
        <div className="bg-white p-3 rounded-full shadow-md flex items-center justify-center w-16 h-16">
          {/* Renderizamos el ícono usando getIconForCategory */}
          {getIconForCategory(categoriaNombre, "text-gray-700 w-8 h-8")}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          {meta.nombre_meta}
        </h3>
        <p className="text-gray-600 text-sm">{meta.descripcion}</p>
      </div>

      <div className="mt-2 text-gray-700">
        <p className="font-semibold">
          <span className="text-sm">Fecha límite :</span>{" "}
          {new Date(meta.fecha_limite).toLocaleDateString()}
        </p>
        <p className="font-semibold">
          <span className="text-sm">Monto objetivo:</span> {meta.monto_objetivo}
        </p>
        <p className="font-semibold">
          <span className="text-sm">Monto actual:</span> {meta.monto_actual}
        </p>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => onAddAmount(meta.meta_id)}
          className="text-[#5B4034] hover:text-[#3F2C26] transition"
        >
          <PlusCircle className="w-6 h-6" title="Agregar monto" />
        </button>
        <button
          onClick={() => onEdit(meta.meta_id)}
          className="text-[#5B4034] hover:text-[#3F2C26] transition"
        >
          <Edit3 className="w-6 h-6" title="Editar meta" />
        </button>
        <button
          onClick={() => onDelete(meta.meta_id)}
          className="text-[#5B4034] hover:text-[#3F2C26] transition"
        >
          <Trash2 className="w-6 h-6" title="Borrar meta" />
        </button>
      </div>
    </div>
  );
}

CardMeta.propTypes = {
  meta: PropTypes.shape({
    meta_id: PropTypes.number.isRequired,
    nombre_meta: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    fecha_limite: PropTypes.string.isRequired,
    monto_actual: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    monto_objetivo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombre_categoria: PropTypes.string,
  }).isRequired,
  onAddAmount: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
