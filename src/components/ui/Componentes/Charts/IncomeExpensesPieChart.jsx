import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import PropTypes from "prop-types";

const IncomeExpensesPieChart = ({ income, totalExpenses }) => {
  const data = [
    { name: "Ingresos", value: income, color: "url(#incomeGradient)" },
    { name: "Gastos", value: totalExpenses, color: "url(#expenseGradient)" },
  ];

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#21AA58" stopOpacity={1} />
              <stop offset="63%" stopColor="#21AA58" stopOpacity={1} />
              <stop offset="100%" stopColor="#247D61" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="61%" stopColor="#AA2123" stopOpacity={1} />
              <stop offset="100%" stopColor="#247D61" stopOpacity={1} />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString("en-IN")}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

IncomeExpensesPieChart.propTypes = {
  income: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default IncomeExpensesPieChart;
