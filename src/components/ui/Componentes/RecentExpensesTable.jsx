import PropTypes from "prop-types";
import { getIconForCategory } from "../../../utils/iconsUtils";

const RecentExpensesTable = ({ expenses }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</th>
          <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((gasto, index) => (
          <tr key={index} className="border-b hover:bg-gray-50">
            <td className="flex items-center px-4 py-0 space-x-2 text-gray-700 text-sm">
              <span>{getIconForCategory(gasto.nombre_categoria)}</span>
              <span>{gasto.nombre_categoria}</span>
            </td>
            <td className="px-4 py-0 text-gray-500 text-sm">{new Date(gasto.fecha).toLocaleDateString()}</td>
            <td className="px-4 py-0 text-gray-500 text-sm">{gasto.descripcion || "Sin descripción"}</td>
            <td className={`px-4 py-0 text-right font-semibold ${gasto.monto < 0 ? "text-red-500" : "text-red-500"}`}>
              {gasto.monto < 0 ? `-${gasto.monto}` : `-${gasto.monto}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

RecentExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      nombre_categoria: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
      monto: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RecentExpensesTable;
