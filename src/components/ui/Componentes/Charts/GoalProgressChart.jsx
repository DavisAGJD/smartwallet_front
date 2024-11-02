import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PropTypes from "prop-types";

const GoalProgressChart = ({ goals }) => {
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);

  // Verificar si hay metas disponibles
  if (!goals || goals.length === 0) {
    return <p>No hay metas disponibles.</p>;
  }

  const currentGoal = goals[currentGoalIndex];
  const percentage = Math.min(
    (currentGoal.amountAchieved / currentGoal.targetAmount) * 100,
    100
  );

  const data = [
    { name: "Logrado", value: percentage },
    { name: "Restante", value: 100 - percentage },
  ];

  const nextGoal = () => {
    setCurrentGoalIndex((prevIndex) => (prevIndex + 1) % goals.length);
  };

  const prevGoal = () => {
    setCurrentGoalIndex(
      (prevIndex) => (prevIndex - 1 + goals.length) % goals.length
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>{currentGoal.name}</h3>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button onClick={prevGoal}>⬅️</button>
        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <defs>
              <linearGradient id="goalProgressGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#21AA58" stopOpacity={1} />
                <stop offset="63%" stopColor="#21AA58" stopOpacity={1} />
                <stop offset="100%" stopColor="#247D61" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill="url(#goalProgressGradient)" /> {/* Color verde degradado */}
              <Cell fill="#e5e7eb" /> {/* Color gris para el restante */}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          </PieChart>
        </ResponsiveContainer>
        <button onClick={nextGoal}>➡️</button>
      </div>
      <p>{percentage.toFixed(2)}% completado</p>
    </div>  
  );
};

GoalProgressChart.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      targetAmount: PropTypes.number.isRequired,
      amountAchieved: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GoalProgressChart;
