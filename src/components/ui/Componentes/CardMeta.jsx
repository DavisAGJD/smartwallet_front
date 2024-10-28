import PropTypes from "prop-types";
import { PlusCircle, Edit3, Trash2 } from "lucide-react";

export default function CardMeta({ meta, onAddAmount, onEdit, onDelete }) {
  return (
    <div className="w-64 bg-[#F3CBA7] rounded-lg p-4 shadow-md flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{meta.nombre_meta}</h3>
          <p className="text-gray-600 text-sm">{meta.descripcion}</p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-gray-700 font-semibold">
          <span className="text-sm">Fecha límite :</span>{" "}
          {new Date(meta.fecha_limite).toLocaleDateString()} <br />
          <span className="text-sm">Monto objetivo : {meta.monto_objetivo}</span>{" "} <br />
          <span className="text-sm">Monto actual : {meta.monto_actual}</span>{" "}
        </p>
      </div>

      <div className="flex justify-between mt-4 space-x-4">
        <button onClick={() => onAddAmount(meta.meta_id)} className="text-[#5B4034] hover:text-[#3F2C26] transition">
          <PlusCircle className="w-6 h-6" title="Agregar monto" />
        </button>
        <button onClick={() => onEdit(meta.meta_id)} className="text-[#5B4034] hover:text-[#3F2C26] transition">
          <Edit3 className="w-6 h-6" title="Editar meta" />
        </button>
        <button onClick={() => onDelete(meta.meta_id)} className="text-[#5B4034] hover:text-[#3F2C26] transition">
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
    monto_actual: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Acepta `string` o `number`
    monto_objetivo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Acepta `string` o `number`
  }).isRequired,
  onAddAmount: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
