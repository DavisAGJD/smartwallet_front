import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const CategoryExpensesChart = ({ data }) => {
  // Definición de gradientes
  const gradientColors = [
    { id: "gradient1", start: "#8b5cf6", end: "#6d28d9" },
    { id: "gradient2", start: "#3b82f6", end: "#2563eb" },
    { id: "gradient3", start: "#22c55e", end: "#16a34a" },
    { id: "gradient4", start: "#ef4444", end: "#b91c1c" },
  ];

  // Leyenda personalizada centrada con representación de gradientes
  const renderLegend = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
      <ul style={{ display: "flex", listStyleType: "none", padding: 0, gap: "15px" }}>
        {data.map((entry, index) => (
          <li key={`item-${index}`} style={{ display: "flex", alignItems: "center" }}>
            <svg width="14" height="14">
              <defs>
                <linearGradient id={`legend-gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={gradientColors[index % gradientColors.length].start} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={gradientColors[index % gradientColors.length].end} stopOpacity={1} />
                </linearGradient>
              </defs>
              <rect width="14" height="14" fill={`url(#legend-gradient-${index})`} />
            </svg>
            <span style={{ marginLeft: 5 }}>{entry.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        {/* Definición de gradientes para cada barra */}
        <defs>
          {gradientColors.map((gradient) => (
            <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gradient.start} stopOpacity={0.8} />
              <stop offset="100%" stopColor={gradient.end} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value}`, "Monto"]} labelFormatter={(label) => `Categoría: ${label}`} />
        <Legend content={renderLegend} /> {/* Usar la leyenda personalizada */}
        <Bar dataKey="amount" name="Monto" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#${gradientColors[index % gradientColors.length].id})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

CategoryExpensesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CategoryExpensesChart;
