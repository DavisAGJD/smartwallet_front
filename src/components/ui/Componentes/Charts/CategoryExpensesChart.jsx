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
  Legend,
} from "recharts";

const CategoryExpensesChart = ({ data }) => {
  const itemsPerSlide = 4; // Número de categorías por slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cálculo de cuántos "slides" hay en total
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

  // Datos del slide actual
  const startIndex = currentSlide * itemsPerSlide;
  const currentData = data.slice(startIndex, startIndex + itemsPerSlide);

  // Gradientes de colores para las barras
  const gradientColors = [
    { id: "gradient1", start: "#8b5cf6", end: "#6d28d9" },
    { id: "gradient2", start: "#3b82f6", end: "#2563eb" },
    { id: "gradient3", start: "#22c55e", end: "#16a34a" },
    { id: "gradient4", start: "#ef4444", end: "#b91c1c" },
  ];

  // Leyenda personalizada (sólo para los datos visibles en el slide actual)
  const renderLegend = () => (
    <div className="flex justify-center items-center mt-2">
      <ul className="flex list-none p-0 gap-4">
        {currentData.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center">
            <svg width="14" height="14">
              <defs>
                <linearGradient
                  id={`legend-gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={gradientColors[index % gradientColors.length].start}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor={gradientColors[index % gradientColors.length].end}
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
              <rect
                width="14"
                height="14"
                fill={`url(#legend-gradient-${index})`}
              />
            </svg>
            <span className="ml-2 text-sm text-gray-700">{entry.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* Controles del carrusel */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-3 py-2 rounded text-white font-semibold transition-colors ${
            currentSlide === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          Prev
        </button>

        {/* Mostrar la paginación sólo si hay más de un slide */}
        {totalSlides > 1 && (
          <span className="text-gray-600 text-sm">
            Slide {currentSlide + 1} de {totalSlides}
          </span>
        )}

        <button
          onClick={handleNext}
          disabled={currentSlide >= totalSlides - 1}
          className={`px-3 py-2 rounded text-white font-semibold transition-colors ${
            currentSlide >= totalSlides - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer>
          <BarChart
            data={currentData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            {/* Definición de gradientes para cada barra */}
            <defs>
              {gradientColors.map((gradient) => (
                <linearGradient
                  key={gradient.id}
                  id={gradient.id}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={gradient.start} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={gradient.end} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>

            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
            <YAxis tick={{ fontSize: 12, fill: "#555" }} />
            <Tooltip
              formatter={(value) => [`$${value}`, "Monto"]}
              labelFormatter={(label) => `Categoría: ${label}`}
              contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
              itemStyle={{ color: "#374151" }}
              labelStyle={{ color: "#4b5563", fontWeight: "bold" }}
            />
            <Legend content={renderLegend} />
            <Bar dataKey="amount" name="Monto" radius={[4, 4, 0, 0]}>
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
