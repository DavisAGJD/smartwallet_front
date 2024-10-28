import PropTypes from "prop-types";
import { Button } from "../button";
import { Trash2 } from "lucide-react";

export default function CardReport({ titulo, descripcion, fecha_creacion, onDelete }) {
  const fecha = new Date(fecha_creacion);
  const opciones = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };
  const fechaFormateada = isNaN(fecha.getTime()) ? "Fecha no disponible" : fecha.toLocaleDateString('es-ES', opciones);

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-md flex flex-col justify-between mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
          <p className="text-gray-500 text-sm">{fechaFormateada}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-700 text-sm">{descripcion}</p>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={onDelete} variant="destructive" className="text-red-500 hover:text-red-700 transition">
          <Trash2 className="w-5 h-5" />
          Eliminar
        </Button>
      </div>
    </div>
  );
}

CardReport.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  fecha_creacion: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};
