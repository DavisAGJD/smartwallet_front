import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpensesDistributionChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}> {/* Aumenta el alto del contenedor */}
    <PieChart>
      {/* Definición de gradientes para cada sección */}
      <defs>
        <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="gradient3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="gradient4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#b91c1c" stopOpacity={1} />
        </linearGradient>
      </defs>

      {/* Configuración de la gráfica de pastel sin innerRadius */}
      <Pie 
        data={data} 
        dataKey="value" 
        nameKey="name" 
        cx="50%" 
        cy="50%" 
        outerRadius={150} // Aumenta el radio externo
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={`url(#gradient${(index % 4) + 1})`} // Aplica gradiente correspondiente
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

ExpensesDistributionChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ExpensesDistributionChart;
