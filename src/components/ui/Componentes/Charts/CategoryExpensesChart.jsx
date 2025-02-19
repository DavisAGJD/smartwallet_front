import PropTypes from "prop-types";
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Legend 
} from "recharts";

const CategoryExpensesChart = ({ data }) => {
  const itemsPerSlide = 4; // Número de categorías por slide
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = Math.ceil(data.length / itemsPerSlide);

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Extraer los datos del slide actual
  const startIndex = currentSlide * itemsPerSlide;
  const currentData = data.slice(startIndex, startIndex + itemsPerSlide);

  // Definición de gradientes
  const gradientColors = [
    { id: "gradient1", start: "#8b5cf6", end: "#6d28d9" },
    { id: "gradient2", start: "#3b82f6", end: "#2563eb" },
    { id: "gradient3", start: "#22c55e", end: "#16a34a" },
    { id: "gradient4", start: "#ef4444", end: "#b91c1c" },
  ];

  // Leyenda personalizada centrada con representación de gradientes (sólo de los datos actuales)
  const renderLegend = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
      <ul style={{ display: "flex", listStyleType: "none", padding: 0, gap: "15px" }}>
        {currentData.map((entry, index) => (
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
    <div>
      {/* Controles del carrusel */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          style={{
            padding: "5px 10px",
            background: "#ccc",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Prev
        </button>
        <span>
          Slide {currentSlide + 1} de {totalSlides}
        </span>
        <button
          onClick={handleNext}
          disabled={currentSlide >= totalSlides - 1}
          style={{
            padding: "5px 10px",
            background: "#ccc",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Next
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={currentData}>
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
          <Tooltip 
            formatter={(value) => [`$${value}`, "Monto"]} 
            labelFormatter={(label) => `Categoría: ${label}`} 
          />
          <Legend content={renderLegend} />
          <Bar dataKey="amount" name="Monto">
            {currentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#${gradientColors[index % gradientColors.length].id})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
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
